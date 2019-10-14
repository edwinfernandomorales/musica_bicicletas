function musica() {
  let artistas = ['coldplay', 'korn', 'slipknot'];
  let bandas = '';
  let nroArtistas = artistas.length;
  let contador = 0;
  for (let i = 0; i < nroArtistas; i++) {
    $.get(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artistas[i]}`, function(data) {
      bandas += `
      <li class="list-group-item text-center">
        <a href="#" class="banda" id="${data.artists[0].strArtist}">
          <img src="${data.artists[0].strArtistLogo}" class="rounded mx-auto img-thumbnail" width="300">
          ${data.artists[0].strArtist}
        </a>
      </li>`;

      if(contador === nroArtistas) {
        let ul = `
        <h2>Selecciona una banda para ver mas detalles</h2>
        <ul class="list-group list-group-horizontal-md">
          ${bandas}
        </ul>
        <br>
        <div class="jumbotron">
          <div class="text-center" id="detalles_banda"></div>
        </div>`;

        document.getElementById('musica').innerHTML = ul;

        let banda = document.getElementsByClassName('banda');
        for (var j = 0; j < banda.length; j++) {
          banda[j].addEventListener("click", function() {
            $.get(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${this.id}`, function(data) {
              let detalles_banda = `
              <div class="media">
                <div class="media-body">
                  <img src="${data.artists[0].strArtistBanner}" class="align-self-center mr-3" alt="${data.artists[0].strArtist}" width="700">
                  <br><br>
                  <h5 class="mt-0">${data.artists[0].strArtist}</h5>
                  <p class="mb-0">${data.artists[0].strBiographyES}</p>
                  <p class="mb-0">Estilo: ${data.artists[0].strStyle}</p>
                  <p class="mb-0"><a href="${data.artists[0].strFacebook}">Facebook</a></p>
                  <p class="mb-0"><a href="${data.artists[0].strTwitter}">Twitter</a></p>
                  <p><a href="${data.artists[0].strWebsite}">Website</a></p>
                </div>
              </div>`;

              document.querySelector('#detalles_banda').innerHTML = detalles_banda;
            });
          });
        }
      }
    });
    contador++;
  }
}
document.getElementById('musica-tab').addEventListener('click', musica);

function bicicletas() {
  $.get('http://api.citybik.es/v2/networks', function(data) {
    let nro_ciudades = data.networks.length;
    let listado = `
    <h2>Ciudades con bicicletas publicas en el mundo (${nro_ciudades})</h2>
    <div class="list-group">`;
    for (var i = 0; i < nro_ciudades; i++) {
      let empresas = ['-'];
      if(data.networks[i].company) {
        empresas = data.networks[i].company;
      }
      listado += `
      <a class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">Empresa(s): ${empresas}</h5>
          <small>Pais: ${data.networks[i].location.country}</small>
        </div>
        <small>Ciudad: ${data.networks[i].location.city}</small>
        <p class="mb-1">Ubicación</p>
        <small>Latitud: ${data.networks[i].location.latitude}</small>
        <br>
        <small>Longitud: ${data.networks[i].location.longitude}</small>
      </a>`;
    }
    listado += `</div>`;
    document.getElementById('bicicletas').innerHTML = listado;
  });
}
document.getElementById('bicicletas-tab').addEventListener('click', bicicletas);
