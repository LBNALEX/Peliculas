let imagenPerfil = document.getElementById('imagenP');
let LogoNetflix = document.getElementById('LogoNetflix');
let srcImagen = localStorage.getItem('imagen');




if(srcImagen.length == 24){
    let imgRecortada = srcImagen.slice(5,22)
    imagenPerfil.src = `${imgRecortada}`;
}else{
    let imgRecortada = srcImagen.slice(5,21)
    imagenPerfil.src = `${imgRecortada}`;
}




LogoNetflix.addEventListener('click', (e) => {
    window.open('http://127.0.0.1:5500/inicio.html', "_self");
    localStorage.removeItem('imagen');
})