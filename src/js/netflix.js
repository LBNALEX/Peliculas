let LogoNetflix = document.getElementById('logoNetflix');
let srcImagen = localStorage.getItem('imagen');
let imagenPerfil = document.getElementById('imagenP');

// if(srcImagen.length == 24){
//     let imgRecortada = srcImagen.slice(5,22)
//     imagenPerfil.src = `./../${imgRecortada}`;
// }else{
//     let imgRecortada = srcImagen.slice(5,21);
//     imagenPerfil= `./../${imgRecortada}`;
// }

// pelicula1.addEventListener('click', (e) => {
//     window.open('http://127.0.0.1:5500/detallePelicula/detallePelicula.html', "_self");
// })

// LogoNetflix.addEventListener('click', (e) => {
//     window.open('http://127.0.0.1:5500/inicio.html', "_self");
//     localStorage.removeItem('imagen');
// })

const fila1 = document.querySelector('.contenedor-carrusel1');
const fila2 = document.querySelector('.contenedor-carrusel2');
const fila3 = document.querySelector('.contenedor-carrusel3');

const flechaIzquierda = document.getElementById('flechaIzquierda');
const flechaDerecha = document.getElementById('flechaDerecha');
const flechaIzquierda2 = document.getElementById('flechaIzquierda2');
const flechaDerecha2 = document.getElementById('flechaDerecha2');
const flechaIzquierda3 = document.getElementById('flechaIzquierda3');
const flechaDerecha3 = document.getElementById('flechaDerecha3');

let API_KEY = "2dbc6cfb9f0b204e19642c36f4bd9762";
let moviesTopRanked = [];
let imagesTopRanked = [];

var pelis;
var pelis2;
var pelis3;
//Scroll
function scrollRight(){
    flechaDerecha.addEventListener('click', () =>{
        fila1.scrollLeft += fila1.offsetWidth;
        const indicadorActivo = document.querySelector('.indicadores .activo');
        if(indicadorActivo.nextSibling){
            indicadorActivo.nextSibling.classList.add('activo');
            indicadorActivo.classList.remove('activo');
        }
    });
}

function scrollLeft(){
    flechaIzquierda.addEventListener('click', () =>{
        fila1.scrollLeft -= fila1.offsetWidth;
        const indicadorActivo = document.querySelector('.indicadores .activo');
        if(indicadorActivo.previousSibling){
            indicadorActivo.previousSibling.classList.add('activo');
            indicadorActivo.classList.remove('activo');
        }
    });
}

function scrollRight2(){
    flechaDerecha2.addEventListener('click', () =>{
        fila2.scrollLeft += fila2.offsetWidth;
        const indicadorActivo = document.querySelector('.indicadores2 .activo2');
        if(indicadorActivo.nextSibling){
            indicadorActivo.nextSibling.classList.add('activo2');
            indicadorActivo.classList.remove('activo2');
        }
    });
}

function scrollLeft2(){
    flechaIzquierda2.addEventListener('click', () =>{
        fila2.scrollLeft -= fila2.offsetWidth;
        const indicadorActivo = document.querySelector('.indicadores2 .activo2');
        if(indicadorActivo.previousSibling){
            indicadorActivo.previousSibling.classList.add('activo2');
            indicadorActivo.classList.remove('activo2');
        }
    });
}

function scrollRight3(){
    flechaDerecha3.addEventListener('click', () =>{
        fila3.scrollLeft += fila3.offsetWidth;
        const indicadorActivo = document.querySelector('.indicadores3 .activo3');
        if(indicadorActivo.nextSibling){
            indicadorActivo.nextSibling.classList.add('activo3');
            indicadorActivo.classList.remove('activo3');
        }
    });
}

function scrollLeft3(){
    flechaIzquierda3.addEventListener('click', () =>{
        fila3.scrollLeft -= fila3.offsetWidth;
        const indicadorActivo = document.querySelector('.indicadores3 .activo3');
        if(indicadorActivo.previousSibling){
            indicadorActivo.previousSibling.classList.add('activo3');
            indicadorActivo.classList.remove('activo3');
        }
    });
}
//hover
function hover(pelis){
    pelis.forEach((pelicula) =>{
        pelicula.addEventListener('mouseenter',(e) =>{
            const elemento = e.currentTarget;
            setTimeout(() =>{
                pelis.forEach(pelicula => pelicula.classList.remove('hover'));
                elemento.classList.add('hover');
            }, 300);
        });
    });
} 

function deshover(pelis){
    fila1.addEventListener('mouseleave',() =>{
        pelis.forEach(pelicula => pelicula.classList.remove('hover'));
    });
    fila2.addEventListener('mouseleave',() =>{
        pelis.forEach(pelicula => pelicula.classList.remove('hover'));
    });
    fila3.addEventListener('mouseleave',() =>{
        pelis.forEach(pelicula => pelicula.classList.remove('hover'));
    });
}
//paginacion
function pagination(pelis){
    console.log(pelis);
    const numeroPaginas = Math.ceil(pelis.length / 5);
    for(let i = 0; i<numeroPaginas;i++){
        const indicador1 = document.createElement('button');
        if(i === 0){
            indicador1.classList.add('activo');
        }
        document.querySelector('.indicadores').appendChild(indicador1);
        indicador1.addEventListener('click',(e) =>{
            fila1.scrollLeft = i * fila1.offsetWidth;
    
            document.querySelector('.indicadores .activo').classList.remove('activo');
            e.target.classList.add('activo');
        });
    }
}

function pagination2(pelis2){
    const numeroPaginas = Math.ceil(pelis2.length / 5);
    for(let i = 0; i<numeroPaginas;i++){
        const indicador1 = document.createElement('button');
        if(i === 0){
            indicador1.classList.add('activo2');
        }
        document.querySelector('.indicadores2').appendChild(indicador1);
        indicador1.addEventListener('click',(e) =>{
            fila2.scrollLeft = i * fila2.offsetWidth;
    
            document.querySelector('.indicadores2 .activo2').classList.remove('activo2');
            e.target.classList.add('activo2');
        });
    }
}

function pagination3(pelis3){
    const numeroPaginas = Math.ceil(pelis3.length / 5);
    for(let i = 0; i<numeroPaginas;i++){
        const indicador1 = document.createElement('button');
        if(i === 0){
            indicador1.classList.add('activo3');
        }
        document.querySelector('.indicadores3').appendChild(indicador1);
        indicador1.addEventListener('click',(e) =>{
            fila3.scrollLeft = i * fila3.offsetWidth;
    
            document.querySelector('.indicadores3 .activo3').classList.remove('activo3');
            e.target.classList.add('activo3');
        });
    }
}

//Obtener mejor rankeadas
async function getTopRanked(API_KEY){
    let moviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=es&page=1`;

    try {
        let response = await axios.get(moviesUrl);
        return response.data.results;
    } catch (e) {
        return [];
    }
}

getTopRanked(API_KEY).then((movies) => {
    let index = 0;
    for (let movie of movies) {
        moviesTopRanked[index] = movie.id;
        imagesTopRanked[index] = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

        index++;
    }
    console.log(moviesTopRanked);
    console.log(imagesTopRanked);

    fillImage(imagesTopRanked,moviesTopRanked,1,"Mejores películas");
});

async function getGenres(API_KEY){
    let genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es`;

    try {
        let response = await axios.get(genresUrl);
        return response.data.genres;
    } catch (e) {
        return [];
    }
}

getGenres(API_KEY).then((genres) => {
    let index = 0;
    let genreObj= {};

    for (let genre of genres) {
        if(index == 0){
            genreObj.genero1 = genre;
        }else if(index == 1){
            genreObj.genero2 = genre;
        }
        else if(index ==2){
            genreObj.genero3 = genre;
        }
        else{
         break;
        }
        
        index++;
    }
    console.log(genreObj);

    //buscar peliculas por genero1 
    getMoviesByGenre(API_KEY,genreObj.genero1).then((movies) => {
        let index = 0;
        let movieGenre1 =[];
        let movieGenre1Img = [];
        for (let movie of movies) {
            movieGenre1[index] = movie.id;
            movieGenre1Img[index] = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
    
            index++;
        }
        console.log(movieGenre1);

    fillImage(movieGenre1Img,movieGenre1,2,genreObj.genero1.name);

    });

    //buscar peliculas por genero2 
    getMoviesByGenre(API_KEY,genreObj.genero2).then((movies) => {
        let index = 0;
        let movieGenre2 =[];
        let movieGenre2Img = [];
        for (let movie of movies) {
            movieGenre2[index] = movie.id;
            movieGenre2Img[index] = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
    
            index++;
        }
        console.log(movieGenre2);

    fillImage(movieGenre2Img,movieGenre2,3,genreObj.genero2.name);

    });

});

async function getMoviesByGenre(API_KEY,genre){
    let genreMovieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}`;

    try {
        let response = await axios.get(genreMovieUrl);
        return response.data.results;
    } catch (e) {
        return [];
    }
}

function fillImage(imagesFill,arrMovies,nCarousel,nameSection){

    let carousel;
    let divPeliculas;
    let ref;
    let newImage;
    console.log(nameSection);
    if(nCarousel === 1){
        carousel = document.getElementById('carousel1');
        const top = document.getElementById('top');
        top.innerHTML = nameSection;

        for (let i = 0; i < 15; i++) {
            divPeliculas = document.createElement('div');    
            divPeliculas.classList.add('pelicula1');  
            ref = document.createElement('a');
            divPeliculas.appendChild(ref);
            newImage = document.createElement('img');
            newImage.src =imagesFill[i];
            newImage.alt = "Imagen Peli-"+ arrMovies[i];
            newImage.id = arrMovies[i];
            divPeliculas.appendChild(newImage);
            carousel.appendChild(divPeliculas);
        }
        console.log(newImage.id);
        pelis = document.querySelectorAll('.pelicula1');
        hover(pelis);
        deshover(pelis);
        pagination(pelis);
        scrollLeft();
        scrollRight();
    }
    else if(nCarousel === 2){
        carousel = document.getElementById('carousel2');
        const genero1 = document.getElementById('genero1');
        genero1.innerHTML = nameSection;
        for (let i = 0; i < 15; i++) {
            divPeliculas = document.createElement('div');    
            divPeliculas.classList.add('pelicula2');  
            ref = document.createElement('a');
            divPeliculas.appendChild(ref);
            newImage = document.createElement('img');
            newImage.src =imagesFill[i];
            newImage.alt = "Imagen Peli-"+ arrMovies[i];
            newImage.id = arrMovies[i];
            divPeliculas.appendChild(newImage);
            carousel.appendChild(divPeliculas);
        }
        pelis2 = document.querySelectorAll('.pelicula2');
        hover(pelis2);
        deshover(pelis2);
        pagination2(pelis2);
        scrollLeft2();
        scrollRight2();
    }
    else if(nCarousel === 3){
        carousel = document.getElementById('carousel3');
        const genero2 = document.getElementById('genero2');
        genero2.innerHTML = nameSection;
        for (let i = 0; i < 15; i++) {
            divPeliculas = document.createElement('div');    
            divPeliculas.classList.add('pelicula3');  
            ref = document.createElement('a');
            divPeliculas.appendChild(ref);
            newImage = document.createElement('img');
            newImage.src =imagesFill[i];
            newImage.alt = "Imagen Peli-"+ arrMovies[i];
            newImage.id = arrMovies[i];
            divPeliculas.appendChild(newImage);
            carousel.appendChild(divPeliculas);
        }
        pelis3 = document.querySelectorAll('.pelicula3');
        hover(pelis3);
        deshover(pelis3);
        pagination3(pelis3);
        scrollLeft3();
        scrollRight3();
    }

}




