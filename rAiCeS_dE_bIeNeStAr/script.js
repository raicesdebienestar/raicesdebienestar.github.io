// Función para animar elementos al hacer scroll
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Ejecutar al hacer scroll
window.addEventListener("scroll", reveal);

// Ejecutar una vez al cargar para mostrar lo que ya está en pantalla
reveal();

// Efecto de suavizado en los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Envío del formulario sin salir de la página
const formContacto = document.getElementById('form-contacto');
const graciasForm = document.getElementById('gracias-form');

if (formContacto) {
    formContacto.addEventListener('submit', function (e) {
        e.preventDefault();

        const boton = formContacto.querySelector('button[type="submit"]');
        boton.disabled = true;
        boton.textContent = 'Enviando...';

        fetch(formContacto.action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(formContacto)
        })
        .then(function (respuesta) {
            if (!respuesta.ok) throw new Error('Error al enviar');
            formContacto.hidden = true;
            graciasForm.hidden = false;
            formContacto.reset();
        })
        .catch(function () {
            boton.disabled = false;
            boton.textContent = 'Enviar Mensaje';
            alert('Ups, no pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.');
        });
    });
}

// Resalta en el menú la sección donde está la persona
const secciones = document.querySelectorAll('section[id]');
const enlacesMenu = document.querySelectorAll('.nav-links a[href^="#"]');

function marcarMenuActivo() {
    const posicion = window.scrollY + 150; // compensa el alto del encabezado
    let actual = '';

    secciones.forEach(function (seccion) {
        if (posicion >= seccion.offsetTop) {
            actual = seccion.getAttribute('id');
        }
    });

    // Si llegó al final de la página, marcar la última sección (Escríbenos)
    const llegoAlFinal =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5;

    if (llegoAlFinal) {
        actual = secciones[secciones.length - 1].getAttribute('id');
    }

    enlacesMenu.forEach(function (enlace) {
        enlace.classList.toggle('active', enlace.getAttribute('href') === '#' + actual);
    });
}

window.addEventListener('scroll', marcarMenuActivo);
marcarMenuActivo();