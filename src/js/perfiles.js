const logo = document.getElementById('logo');
let perfil1 = document.getElementById('p1');
let perfil2 = document.getElementById('p2');
let perfil3 = document.getElementById('p3');
let perfil4 = document.getElementById('p4');
let perfil5 = document.getElementById('p5');




perfil1.style.backgroundImage = `url("src/img/bicho.png")`;
perfil2.style.backgroundImage = `url("src/img/rigo.png")`;
perfil3.style.backgroundImage = `url("src/img/koky.png")`;
perfil4.style.backgroundImage = `url("src/img/alex.png")`;
perfil5.style.backgroundImage = `url("src/img/niños.png")`;




  logo.addEventListener('click', (e) => {
    
    window.open('http://127.0.0.1:5500/index.html', "_self");

    // onclick="location.href='netflix.html'"
  });

  perfil1.addEventListener('click', (e) => {
    localStorage.setItem('imagen', perfil1.style.backgroundImage);
    window.open('http://127.0.0.1:5500/netflix.html', "_self");
  })

  perfil2.addEventListener('click', (e) => {
    localStorage.setItem('imagen', perfil2.style.backgroundImage);
    window.open('http://127.0.0.1:5500/netflix.html', "_self");
  })

  perfil3.addEventListener('click', (e) => {
    localStorage.setItem('imagen', perfil3.style.backgroundImage);
    window.open('http://127.0.0.1:5500/netflix.html', "_self");
  })

  perfil4.addEventListener('click', (e) => {
    localStorage.setItem('imagen', perfil4.style.backgroundImage);
    window.open('http://127.0.0.1:5500/netflix.html', "_self");
  })

  perfil5.addEventListener('click', (e) => {
    localStorage.setItem('imagen', perfil5.style.backgroundImage);
    window.open('http://127.0.0.1:5500/netflix.html', "_self");
  })


  
