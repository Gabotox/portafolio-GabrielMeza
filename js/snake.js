const puntajeElemento = document.getElementById('num');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let direccion = 'derecha';
let proximaDireccion = 'derecha'; // Variable para almacenar la próxima dirección
let puntaje = 0;
let colisionDetectada = false; // Bandera para detectar si ya se mostró la alerta de colisión

// Dimensiones de los segmentos de la serpiente y de la comida
const SEGMENTO_SIZE = 10;
const COMIDA_SIZE = 10;

// Arreglo de segmentos de la serpiente
let snake = [
    { x: 100, y: 100 }, // Cabeza
    { x: 90, y: 100 },  // Segundo segmento
    { x: 80, y: 100 }   // Tercer segmento
];

let cabeza = snake[0];

// Posición inicial de la comida
let comida = { x: 0, y: 0 };

// Función para dibujar el área de juego inicial
function dibujarArea() {
    ctx.fillStyle = '#252A2E'; // Color de fondo
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ffffff'; // Color del borde
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Función para dibujar un segmento de la serpiente
function dibujarSegmento(x, y, cabeza) {
    if (cabeza) {
        ctx.fillStyle = '#FF0080'; // Color de la cabeza (por ejemplo, rojo)
    } else {
        ctx.fillStyle = '#FFFFFF'; // Color del cuerpo (por ejemplo, rosa)
    }
    ctx.fillRect(x, y, SEGMENTO_SIZE, SEGMENTO_SIZE);
    ctx.strokeStyle = '#000000'; // Color del borde
    ctx.strokeRect(x, y, SEGMENTO_SIZE, SEGMENTO_SIZE);
}

// Función para dibujar la comida
function dibujarComida() {
    ctx.fillStyle = '#B18A23'; // Color de la comida (por ejemplo, verde)
    ctx.fillRect(comida.x, comida.y, COMIDA_SIZE, COMIDA_SIZE);
}

// Función para generar una nueva posición aleatoria para la comida
function generarComida() {
    comida.x = Math.floor(Math.random() * (canvas.width / COMIDA_SIZE)) * COMIDA_SIZE;
    comida.y = Math.floor(Math.random() * (canvas.height / COMIDA_SIZE)) * COMIDA_SIZE;

    // Verificar que la nueva posición de la comida no esté en la serpiente
    while (snake.some(segmento => segmento.x === comida.x && segmento.y === comida.y)) {
        comida.x = Math.floor(Math.random() * (canvas.width / COMIDA_SIZE)) * COMIDA_SIZE;
        comida.y = Math.floor(Math.random() * (canvas.height / COMIDA_SIZE)) * COMIDA_SIZE;
    }
}

// Llamar a generarComida para inicializar la posición inicial de la comida
generarComida();

// Función para detectar colisión con la comida
function detectarColisionComida() {
    if (snake[0].x === comida.x && snake[0].y === comida.y) {
        return true;
    }
    return false;
}

// Función para detectar colisión de la serpiente consigo misma
function detectarColisionSerpiente() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Función para mover la serpiente
function moverSerpiente() {
    let cabeza = { x: snake[0].x, y: snake[0].y };

    // Actualizar la dirección de la serpiente según la próxima dirección almacenada
    direccion = proximaDireccion;

    if (direccion === 'derecha') {
        cabeza.x += SEGMENTO_SIZE;
        if (cabeza.x >= canvas.width) {
            cabeza.x = 0;
        }
    } else if (direccion === 'izquierda') {
        cabeza.x -= SEGMENTO_SIZE;
        if (cabeza.x < 0) {
            cabeza.x = canvas.width - SEGMENTO_SIZE;
        }
    } else if (direccion === 'arriba') {
        cabeza.y -= SEGMENTO_SIZE;
        if (cabeza.y < 0) {
            cabeza.y = canvas.height - SEGMENTO_SIZE;
        }
    } else if (direccion === 'abajo') {
        cabeza.y += SEGMENTO_SIZE;
        if (cabeza.y >= canvas.height) {
            cabeza.y = 0;
        }
    }

    // Verificar colisión con la serpiente misma
    if (detectarColisionSerpiente()) {
        // Mostrar la alerta solo si no se ha mostrado antes
        if (!colisionDetectada) {
            colisionDetectada = true; // Marcar que se ha mostrado la alerta
            Swal.fire({
                icon: "error",
                title: "Has perdido",
                text: "¿Quieres jugar de nuevo?",
                width: 'max-content',
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "No",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    reiniciarJuego();
                    colisionDetectada = false; // Reiniciar bandera para futuras colisiones
                }
            });
        }
        return; // Detener la ejecución adicional hasta que el usuario responda a la alerta
    }

    // Insertar nueva cabeza al principio del arreglo
    snake.unshift(cabeza);

    // Si la serpiente no come, eliminar el último segmento para mantener el tamaño
    if (!detectarColisionComida()) {
        snake.pop();
    } else {
        // Si la serpiente come, incrementar puntaje y generar nueva comida
        puntaje += 10;
        generarComida();
        actualizarPuntaje();
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    direccion = 'derecha';
    proximaDireccion = 'derecha'; // Reiniciar la dirección pendiente
    snake = [
        { x: 100, y: 100 }, // Cabeza
        { x: 90, y: 100 },  // Segundo segmento
        { x: 80, y: 100 }   // Tercer segmento
    ];
    puntaje = 0;
    generarComida();
    actualizarPuntaje();
}

// Función para actualizar y mostrar el puntaje
function actualizarPuntaje() {
    puntajeElemento.textContent = puntaje;
}

// Función principal para dibujar el juego
function dibujarJuego() {
    dibujarArea();
    dibujarComida();
    snake.forEach((segmento, index) => {
        if (index === 0) {
            dibujarSegmento(segmento.x, segmento.y, true); // Dibujar la cabeza
        } else {
            dibujarSegmento(segmento.x, segmento.y, false); // Dibujar los segmentos del cuerpo
        }
    });
}

// Evento para capturar las teclas presionadas
document.addEventListener('keydown', (event) => {
    // Almacenar la dirección deseada en proximaDireccion
    if (event.key === 'd' && direccion !== 'izquierda') {
        proximaDireccion = 'derecha';
    } else if (event.key === 'a' && direccion !== 'derecha') {
        proximaDireccion = 'izquierda';
    } else if (event.key === 'w' && direccion !== 'abajo') {
        proximaDireccion = 'arriba';
    } else if (event.key === 's' && direccion !== 'arriba') {
        proximaDireccion = 'abajo';
    }
});

//Juego desde celular
// Eventos para los botones de dirección
document.getElementById('btnArriba').addEventListener('click', () => {
    proximaDireccion = 'arriba';
});

document.getElementById('btnIzquierda').addEventListener('click', () => {
    proximaDireccion = 'izquierda';
});

document.getElementById('btnDerecha').addEventListener('click', () => {
    proximaDireccion = 'derecha';
});

document.getElementById('btnAbajo').addEventListener('click', () => {
    proximaDireccion = 'abajo';
});





// Llamar a setInterval para actualizar el juego y dibujarlo cada 100ms (10 FPS)
setInterval(() => {
    moverSerpiente();
    dibujarJuego();
}, 100);

// Iniciar el juego llamando a dibujarJuego por primera vez
dibujarJuego();
