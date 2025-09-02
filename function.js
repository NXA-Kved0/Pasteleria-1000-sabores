const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const fecnac = document.getElementById("fecnac");
const password = document.getElementById("password");
const codigopro = document.getElementById("codigopro");
const form = document.getElementById('formulario');
const errores = document.getElementById('errores');


const set = new Set();

nombre.addEventListener('keyup', function (e) {
    if (nombre.value.length == 0) {
        nombre.classList.add("error");
        set.add("<p>Completa el campo nombre.</p>");
    } else {
        nombre.classList.remove("error");
        set.delete("<p>Completa el campo nombre.</p>");
    }
});

email.addEventListener('keyup', function (e) {
    if (!email.value.includes("@")) {
        email.classList.add("error");
        set.add("<p>Añade un signo arroba (@).</p>");
    } else {
        email.classList.remove("error");
        set.delete("<p>Añade un signo arroba (@).</p>");
    }
});

fecnac.addEventListener('keyup', function (e) {
    const existingMessages = document.querySelectorAll('.age-message, .discount-message');
    existingMessages.forEach(msg => msg.remove());
    
    const edad = parseInt(fecnac.value);
    
    if (isNaN(edad)) {
        fecnac.classList.remove("error");
        return;
    }
    
    if (edad < 18) {
        fecnac.classList.add("error");
        mostrarMensaje("Edad mínima 18 años.", "error", "age-message");
    } else {
        fecnac.classList.remove("error");
        
        if (edad > 50) {
            mostrarMensaje("¡Felicidades! Tienes un cupón de 15% de descuento.", "success", "discount-message");
        }
    }
});

function mostrarMensaje(mensaje, tipo, clase) {
    const mensajeElement = document.createElement('p');
    mensajeElement.textContent = mensaje;
    mensajeElement.className = `${clase} ${tipo}-message`;
    mensajeElement.style.color = tipo === 'error' ? 'red' : 'green';
    mensajeElement.style.marginTop = '5px';
    mensajeElement.style.fontWeight = 'bold';
    

    fecnac.parentNode.appendChild(mensajeElement);
}


function setupFechaNacimiento() {

    
    const fechaInput = document.getElementById('fechaNacimiento');
    
    fechaInput.addEventListener('change', function() {

        const existingMessages = document.querySelectorAll('.age-message, .discount-message');
        existingMessages.forEach(msg => msg.remove());
        
        const fechaNacimiento = new Date(this.value);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        
        if (isNaN(edad)) {
            fechaInput.classList.remove("error");
            return;
        }
        
        if (edad < 18) {
            fechaInput.classList.add("error");
            mostrarMensajeFecha("Edad mínima 18 años.", "error", "age-message", fechaInput);
        } else {
            fechaInput.classList.remove("error");
            
            if (edad > 50) {
                mostrarMensajeFecha("¡Felicidades! Tienes un cupón de 15% de descuento.", "success", "discount-message", fechaInput);
            }
        }
    });
}



password.addEventListener('keyup', function (e) {
    if (password.value.length < 6) {
        password.classList.add("error");
        set.add("<p>La contraseña debe tener al menos 6 caracteres.</p>");
    } else {
        password.classList.remove("error");
        set.delete("<p>La contraseña debe tener al menos 6 caracteres.</p>");
    }
});


codigopro.addEventListener('keyup', function (e) {
    if (codigopro.value.length === 0) {
        codigopro.classList.add("error");
        set.add("<p>Agrega tu código promocional.</p>");
    } else {
        codigopro.classList.remove("error");
        set.delete("<p>Agrega tu código promocional.</p>");
    }
});

form.addEventListener('submit', function (e) {
    errores.innerHTML = "";

    document.querySelectorAll("input").forEach(element => {
        if (element.classList.contains("error")) {
            e.preventDefault();
            set.add("<p>Error, revisa los campos en rojo!.</p>");
        }
    });
    set.forEach(p => {
        errores.innerHTML += p;
    })
});