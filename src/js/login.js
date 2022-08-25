var cuentas = [
    { id:1,nombre: 'Alejandro', correo: 'alejandro.ayala@coppel.com',clave: 'fuga123' },
    { id:2,nombre: 'Juan José', correo: 'juan.salasz@coppel.com',clave: 'fuga321' } 
  ];

  var jsonUsiarios = JSON.stringify(cuentas)
  localStorage.setItem('cuentas',jsonUsiarios  );
  var nombreUsuario = '';

  const correo = document.getElementById('correo');
  const password = document.getElementById('password');
  const btnIniciar = document.getElementById('btnIniciar');
  const alertaEspacio = document.getElementById('liveAlertPlaceholder');
  const logo = document.getElementById('logo');

  logo.addEventListener('click', (e) => {
    window.location="../../index.html"; 
  });

  if(btnIniciar){
    btnIniciar.addEventListener('click', (e) => {
      validarContra();
    });
  }
  if(password){
    password.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        validarContra();
      }
    });
  }

  function validarContra(){
    let correoValido = false;
    if(password.value == "")
    {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-danger alert-dismissible" role="alert">`,
        `   <div>Favor de ingresar una contraseña</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
      alertaEspacio.append(wrapper);
    }
    else{
      var allUsers = localStorage.getItem('cuentas');
      var arrUsers =  JSON.parse(allUsers);
      arrUsers.forEach(element => {
        if(element.correo == correo.value){
            correoValido = true;
          if(password.value == element.clave){
            nombreUsuario = element.nombre;
            console.log(nombreUsuario);
           localStorage.setItem('nombre',nombreUsuario);
           localStorage.setItem('correo',element.correo);
           localStorage.setItem('id',element.id);
    
            window.location="../../inicio.html"; 
  
          }
          else{
            const wrapper = document.createElement('div')
            wrapper.innerHTML = [
              `<div class="alert alert-danger alert-dismissible" role="alert">`,
              `   <div>contraseña incorrecta</div>`,
              '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
              '</div>'
            ].join('')
            alertaEspacio.append(wrapper);
          }
        }
      });
      if(correoValido == false){
        const wrapper = document.createElement('div')
            wrapper.innerHTML = [
              `<div class="alert alert-danger alert-dismissible" role="alert">`,
              `   <div>correo incorrecto</div>`,
              '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
              '</div>'
            ].join('')
            alertaEspacio.append(wrapper);
      }
    } 
  }