let API_KEY = '3f9e9869ff2588642c31ab92639da896';
let idActor = localStorage.getItem('idActor');
let nameActor = localStorage.getItem('nameActor');
let fotoActor = localStorage.getItem('fotoActor');
let listaPeliculas = document.getElementById('listaPeliculas');
let nombreActor = document.getElementById('nombreActor');
let perfilActor = document.getElementById('perfilActor');
let logo = document.getElementById('logo');

//regresar a los perfiles
logo.addEventListener('click', (e) => {
    window.open('http://127.0.0.1:5500/netflix.html', "_self");
    
});


//Obtener peliculas
async function getMovies(API_KEY){
    let moviesUrl =`https://api.themoviedb.org/3/person/${idActor}/movie_credits?api_key=${API_KEY}&language=es`;

    try {
        let response = await axios.get(moviesUrl);
        return response.data;
    } catch (e) {
        return [];
    }
}

getMovies(API_KEY).then((movies) => {
    let elemento;
    console.log(movies);
    for (let i = 0; i < 10; i++){
        elemento = document.createElement('li');
        elemento.classList.add('nombrePeli');
        elemento.id = i;
        elemento.innerHTML = `${movies.cast[i].title}`;
        listaPeliculas.appendChild(elemento);
        elemento.addEventListener('click', () =>{
            localStorage.setItem('idPelicula', movies.cast[i].id);
            window.location="../../detallePelicula.html"; 
        })
    }

    fillInfo();
});

function fillInfo(){
    nombreActor.innerHTML = nameActor;
    perfilActor.src = `https://image.tmdb.org/t/p/w500${fotoActor}`;
    perfilActor.alt = nameActor;
}