let icon = document.querySelector("#ponerse");
icon.addEventListener("click", mostrar);

nav = document.getElementById("nav");

let quitarlo = document.getElementById("quitarse");
quitarlo.addEventListener("click", tapar)

let items = document.querySelectorAll(".lin");
let whatsapp = document.getElementById("btn-w");
items.forEach((item) => {
    item.addEventListener("click", tapar);
})

function mostrar() {
    nav.style.left = "0px";
    icon.style.display = "none";
    quitarlo.style.display = "block";
    whatsapp.style.opacity = "0";
    whatsapp.style.zIndex = "-10";
}

function tapar() {
    nav.style.left = "-200%";
    icon.style.display = "block";
    quitarlo.style.display = "none";
    whatsapp.style.opacity = "1";
    whatsapp.style.zIndex = "99999";
}

function seleccionar(link) {
    var opciones = document.querySelectorAll('.correr');
    link.classList.add("activar");
    link = Array.from(opciones).find(ese => {
        for (const ese of opciones) {
            if (ese !== link) {
                ese.classList.remove('activar');
            }
        }
    })

}








const galeria = document.querySelector('.galeria');
const verMasBtn = document.querySelector('.vermas');
const cantidadInicial = 6; // Cantidad inicial de proyectos a mostrar
let mostrarTodos = false; // Variable para controlar si se muestran todos los proyectos

// Función para cargar proyectos
function cargarProyectos() {
    galeria.innerHTML = ''; // Limpiar galería antes de cargar proyectos

    // Iterar sobre todos los proyectos
    proyectos.forEach((proyecto, index) => {
        // Mostrar solo los primeros 'cantidadInicial' proyectos inicialmente
        if (!mostrarTodos && index >= cantidadInicial) return;

        const proyectoHTML = `
            <div class="proyecto">
                <div class="fotog">
                    <img src="${proyecto.imagen}" alt="${proyecto.nombre}">
                    <div class="overlay">
                        <h3 class="titulo">${proyecto.nombre}</h3>
                        <p class="subt">${proyecto.descripcion}</p>
                    </div>
                </div>
                <div class="botonesi">
                    <a href="${proyecto.codigo}" class="botonesia" target="_blank">Código <i class="fa-solid fa-code"></i></a>
                    <a href="${proyecto.demo}" class="botonesia" target="_blank">Demo <i class="fa-solid fa-eye"></i></a>
                </div>
            </div>
        `;
        // Agregar el proyecto al contenedor de la galería
        galeria.insertAdjacentHTML('beforeend', proyectoHTML);
    });

    // Actualizar texto del botón y manejar visibilidad de proyectos adicionales
    const textoVerMas = verMasBtn.querySelector('.texto-vermas');
    const iconoVerMas = verMasBtn.querySelector('.icono-vermas i');

    if (proyectos.length > cantidadInicial) {
        if (mostrarTodos) {
            textoVerMas.textContent = 'Ver menos';
            iconoVerMas.classList.remove('fa-eye');
            iconoVerMas.classList.add('fa-eye-slash');
        } else {
            textoVerMas.textContent = 'Ver más';
            iconoVerMas.classList.remove('fa-eye-slash');
            iconoVerMas.classList.add('fa-eye');
        }
        verMasBtn.style.display = 'block'; // Mostrar el botón solo si hay más proyectos para mostrar
    } else {
        verMasBtn.style.display = 'none'; // Ocultar el botón si no hay más proyectos para mostrar
    }
}

// Evento click para el botón "Ver más" / "Ver menos"
verMasBtn.addEventListener('click', function () {
    mostrarTodos = !mostrarTodos;
    cargarProyectos(); // Volver a cargar proyectos según el estado
});

// Cargar inicialmente los proyectos
cargarProyectos();







let slider = document.querySelector('.slider-contenedor');
let sliderInd = document.querySelectorAll('.slider-test');
let contador = 1;
let tamañoWidth = sliderInd[0].clientWidth;
let intervalo = 2500;

window.addEventListener("resize", function () {
    tamañoWidth = sliderInd[0].clientWidth;
})

setInterval(function tiempo() {
    slides()
}, intervalo);

function slides() {
    slider.style.transform = 'translate(' + (- tamañoWidth * contador) + 'px';

    slider.style.transition = 'transform 1s';

    contador++;

    if (contador === sliderInd.length) {
        contador = 0;
        setTimeout(function () {
            slider.style.transform = 'translate(0px)';
            slider.style.transition = 'transform 1s'
        }, intervalo)
    } else {

    }
}
function slides2() {
    slider.style.transform = 'translate(' + (+ tamañoWidth * contador) + 'px';

    slider.style.transition = 'transform 1s';

    contador--;

    if (contador === sliderInd.length) {
        contador = 0;
        setTimeout(function () {
            slider.style.transform = 'translate(0px)';
            slider.style.transition = 'transform 0s'
        }, intervalo)
    } else {

    }
}



const formulario = document.getElementById('my-form');

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('correo').value;
    const tema = document.getElementById('tema').value;
    const mensaje = document.getElementById('mensaje').value;

    const datos = {
        nombre: nombre,
        email: email,
        tema: tema,
        mensaje: mensaje
    };

    fetch('https://formspree.io/f/mvgppdba', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Enviado satisfactoriamente',
                    showConfirmButton: false,
                    timer: 1400
                })
                formulario.reset();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo algún problema al enviar, intente nuevamente',
                    showConfirmButton: false,
                    timer: 1400
                })
                formulario.reset();
            }
        })
        .catch(error => {
            console.error('Error al enviar el mensaje:', error);
            alert('Hubo un problema al enviar el mensaje');
        });
});







AOS.init();
