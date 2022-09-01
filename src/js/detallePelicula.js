let fondoNetflix = document.getElementById('fondoNetflix');
let resumenPelicula = document.getElementById('resumenPelicula');
let textoPelicula = document.getElementById('textoPelicula');
let imagenPerfil = document.getElementById('imagenP');
let srcImagen = localStorage.getItem('imagen');
const logoNetflix = document.getElementById('logoNetflix');
let areaActores = document.getElementById('areaActores');
let listaActores = document.getElementById('listaActores');
let areaGeneros = document.getElementById('areaGeneros');
let listaGeneros = document.getElementById('listaGeneros');




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
console.log(idPelicula)
async function getMovie(){
    let url = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=${API_KEY}&language=es-US`;

    try{
        let response = await axios.get(url);
        return response.data;
    }catch (e){
        return [];
    }
}

async function getActors(){
    let url = `https://api.themoviedb.org/3/movie/${idPelicula}/credits?api_key=${API_KEY}&language=es-US`;

    try{
        let response = await axios.get(url);
        return response.data;
    }catch (e){
        return [];
    }
}

getMovie().then((movies) => {
    let imgMovie = `https://image.tmdb.org/t/p/w500${movies.backdrop_path}`;
    let elementoGeneros;

    textoPelicula.textContent = movies.title;
    resumenPelicula.textContent = movies.overview;
    fondoNetflix.style.backgroundImage = `url(${imgMovie}`;


    for(let i = 0; i < 7; i++){
        elementoGeneros = document.createElement('li');
        elementoGeneros.classList.add('nombreActor');
        elementoGeneros.id = i;
        elementoGeneros.innerHTML = `${movies.genres[i].name}`;
        listaGeneros.appendChild(elementoGeneros);
        
    }
});

getActors().then((actors) => {
    let elementoActores;
    for (let i = 0; i < 10; i++){
        elementoActores = document.createElement('li');
        elementoActores.classList.add('nombreActor');
        elementoActores.id = i;
        elementoActores.innerHTML = `${actors.cast[i].name}`;
        listaActores.appendChild(elementoActores);
        elementoActores.addEventListener('click', () =>{
            localStorage.setItem('idActor', actors.cast[i].id);
        })
    }
})
