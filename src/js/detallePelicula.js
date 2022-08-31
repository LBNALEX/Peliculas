let fondoNetflix = document.getElementById('fondoNetflix');
let resumenPelicula = document.getElementById('resumenPelicula');
let textoPelicula = document.getElementById('textoPelicula');
let imagenPerfil = document.getElementById('imagenP');
let srcImagen = localStorage.getItem('imagen');
const logoNetflix = document.getElementById('logoNetflix');

logoNetflix.addEventListener('click', (e) => {
    window.location="../../netflix.html"; 
  });

if(srcImagen.length == 24){
    let imgRecortada = srcImagen.slice(5,22)
    imagenPerfil.src = `./../${imgRecortada}`;
}else{
    let imgRecortada = srcImagen.slice(5,21);
    imagenPerfil.src = `./../${imgRecortada}`;
}

let API_KEY = '3f9e9869ff2588642c31ab92639da896';

let idPelicula = localStorage.getItem('idPelicula');
async function getMovie(){
    let url = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=${API_KEY}&language=es-US`;

    // let url = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
    try{
        let response = await axios.get(url);
        return response.data;
    }catch (e){
        return [];
    }
}

getMovie().then((movies) => {
    //"backdrop_path": "/jqFjgNnxpXIXWuPsyfqmcLXRo9p.jpg",
    let imgMovie = `https://image.tmdb.org/t/p/w500${movies.backdrop_path}`;
    /*
    "genres": [
        {
            "id": 80,
            "name": "Crimen"
        },
        {
            "id": 53,
            "name": "Suspense"
        }
    ], 
    */
    //genero 1
    // console.log(movies.genres[0].name)
    // background-image:  url(`${imgMovie}`);
    textoPelicula.textContent = movies.original_title;
    resumenPelicula.textContent = movies.overview;
    fondoNetflix.style.backgroundImage = `url(${imgMovie}`;
});