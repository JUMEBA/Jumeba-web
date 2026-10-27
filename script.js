// ========================================
// JUMEBA - JavaScript principal
// ========================================

console.log("¡Bienvenido a JUMEBA!");

document.addEventListener("DOMContentLoaded", () => {
    iniciarLightboxGaleria();
    iniciarLudoteca();
    iniciarOcultarEventoEspecial();
    iniciarTecladoGlobal();
});


// ========================================
// 1. VISOR AMPLIADO DE LA GALERÍA (LIGHTBOX)
// ========================================

function iniciarLightboxGaleria() {
    const fotos = Array.from(document.querySelectorAll(".galeria-foto"));
    const lightbox = document.getElementById("lightbox");

    // Si no existe la galería o el visor, no hacemos nada.
    if (!fotos.length || !lightbox) return;

    const imagenAmpliada = document.getElementById("lightboxImagen");
    const pieFoto = document.getElementById("lightboxPie");
    const botonCerrar = document.getElementById("lightboxCerrar");
    const botonAnterior = document.getElementById("lightboxAnterior");
    const botonSiguiente = document.getElementById("lightboxSiguiente");

    let indiceActual = 0;

    function mostrarFoto(indice) {
        indiceActual = (indice + fotos.length) % fotos.length;

        const enlace = fotos[indiceActual];
        const imagen = enlace.querySelector("img");
        const texto = enlace.querySelector("span");

        imagenAmpliada.src = imagen ? imagen.src : enlace.href;
        imagenAmpliada.alt = imagen ? imagen.alt : "Fotografía de JUMEBA";
        pieFoto.textContent = texto
            ? texto.textContent.trim()
            : imagenAmpliada.alt;

        lightbox.classList.add("activo");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function cerrarVisor() {
        lightbox.classList.remove("activo");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        imagenAmpliada.src = "";
    }

    function fotoAnterior() {
        mostrarFoto(indiceActual - 1);
    }

    function fotoSiguiente() {
        mostrarFoto(indiceActual + 1);
    }

    fotos.forEach((foto, indice) => {
        foto.addEventListener("click", (evento) => {
            evento.preventDefault();
            mostrarFoto(indice);
        });
    });

    botonCerrar.addEventListener("click", cerrarVisor);
    botonAnterior.addEventListener("click", fotoAnterior);
    botonSiguiente.addEventListener("click", fotoSiguiente);

    // Cerrar al pulsar sobre el fondo oscuro.
    lightbox.addEventListener("click", (evento) => {
        if (evento.target === lightbox) {
            cerrarVisor();
        }
    });

    // Exponer funciones para el manejador global de teclado.
    lightbox._cerrarVisor = cerrarVisor;
    lightbox._fotoAnterior = fotoAnterior;
    lightbox._fotoSiguiente = fotoSiguiente;
}


// ========================================
// 2. LUDOTECA
// ========================================

function iniciarLudoteca() {
    const juegos = [
        "ISLA CALAVERA",
        "RHYNO HERO",
        "GUARRO PIG",
        "DOBBLE",
        "GALEONES, CAÑONES Y DOBLONES",
        "PICNIC",
        "ONE KEY",
        "PERRITOS ¿DÓNDE ESTÁ ESE TRASERO?",
        "MESOZOOIC",
        "YUM YUM ISLAND",
        "¡ATENCIÓN! MONSTRUOS GLOTONES",
        "MARS ATTACKS (DADOS)",
        "SOSPECHOSOS INHABITUALES",
        "THE MIND",
        "SOCIAL TRAIN",
        "HOLI",
        "CARCATA",
        "EL REY DE LOS DADOS",
        "TAXI WILDLIFE",
        "ALADIN (Y LA CUEVA...)",
        "EL PALOMAR",
        "EL SUSURRO DE LAS HOJAS",
        "VEGGIES",
        "PYRAMID OF THE SUN",
        "OUCH",
        "MIAU, GUAU GALLETAS",
        "GÍRALO",
        "VIRUS (X3)",
        "THE ISLAND",
        "SWORDS OF FELLOWS",
        "POC",
        "LA CUCARACHA",
        "SAGALAND",
        "¡EH! ¿QUÉ HAY EN EL ARMARIO?",
        "TURBO TOWN",
        "SCOPE STALINGRAD",
        "DINO BONES",
        "PINTIA: PINTA, TIRA, ACIERTA",
        "ACADEMIA DE CUPCAKES",
        "COLOUR BRAIN",
        "MANDA HUEVOS",
        "CIRCUS",
        "GALAXIES: THE UFO PROJECT",
        "SMASH UP",
        "BURRITO THROUGH",
        "CARCASSONNE",
        "MAL TRAGO",
        "REGRESO AL FUTURO",
        "LOOPING",
        "Q-MEMORY",
        "FANTASMA BLITZ",
        "EL FRUTALITO",
        "KUNG PEREZO",
        "AVELLANAS AL CUBO",
        "RINO HERO MISSING MATCH",
        "LA COMILONA DE LOS MONSTRUOS",
        "COLT EXPRESS",
        "AVALON",
        "EL PORTERO BALDOMERO",
        "SANTORINI",
        "LA ISLA PROHIBIDA",
        "SABOTEUR",
        "SILENZE ZOMBIE CITY",
        "CIUDADELAS",
        "KING OF TOKIO",
        "EL SEÑOR DE LOS ANILLOS: BAZAS",
        "SHUTTERPOINT STAR WARS",
        "SIMILO: EL SEÑOR DE LOS ANILLOS",
        "BLOOD ON THE CLOCKTOWER"
    ];

    const listaJuegos = document.getElementById("lista-juegos");
    const buscador = document.getElementById("buscador-juegos");
    const contador = document.getElementById("contador-juegos");

    // Visor ampliado de las imágenes
    const visor = document.getElementById("visor-ludoteca");
    const visorImagen = document.getElementById("visor-ludoteca-imagen");
    const visorTitulo = document.getElementById("visor-ludoteca-titulo");
    const botonCerrarVisorLudoteca = document.querySelector(".visor-ludoteca-cerrar");

    // Si falta la estructura base, no hacemos nada.
    if (!listaJuegos || !buscador || !contador) return;

    function abrirVisor(imagen, titulo) {
        if (!visor || !visorImagen || !visorTitulo) return;

        visorImagen.src = imagen;
        visorImagen.alt = titulo;
        visorTitulo.textContent = titulo;
        visor.classList.add("activo");
        visor.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function cerrarVisorLudoteca() {
        if (!visor) return;

        visor.classList.remove("activo");
        visor.setAttribute("aria-hidden", "true");
        visorImagen.src = "";
        document.body.style.overflow = "";
    }

    // Abrir al pulsar cualquier imagen del catálogo
    listaJuegos.addEventListener("click", (evento) => {
        const imagen = evento.target.closest(".juego-tarjeta img");
        if (!imagen) return;

        const tarjeta = imagen.closest(".juego-tarjeta");
        const titulo = tarjeta.querySelector("h3").textContent;

        abrirVisor(imagen.src, titulo);
    });

    // Cerrar con el botón
    botonCerrarVisorLudoteca?.addEventListener("click", cerrarVisorLudoteca);

    // Cerrar al pulsar fuera de la imagen
    visor?.addEventListener("click", (evento) => {
        if (evento.target === visor) {
            cerrarVisorLudoteca();
        }
    });

    // Exponer funciones para el manejador global de teclado.
    if (visor) {
        visor._cerrarVisorLudoteca = cerrarVisorLudoteca;
    }

    // Renderizar juegos
    function mostrarJuegos(filtro = "") {
        const busqueda = filtro.trim().toLocaleLowerCase("es");

        const juegosFiltrados = juegos
            .map((nombre, indice) => ({
                nombre,
                numero: indice + 1
            }))
            .filter(juego =>
                juego.nombre.toLocaleLowerCase("es").includes(busqueda)
            );

        listaJuegos.innerHTML = "";

        contador.textContent =
            `${juegosFiltrados.length} de ${juegos.length} juegos`;

        if (juegosFiltrados.length === 0) {
            listaJuegos.innerHTML =
                '<p class="ludoteca-sin-resultados">No se ha encontrado ningún juego con ese nombre.</p>';
            return;
        }

        juegosFiltrados.forEach(juego => {
            const tarjeta = document.createElement("article");
            tarjeta.className = "juego-tarjeta";

            const contenedorImagen = document.createElement("div");
            contenedorImagen.className = "juego-imagen-contenedor";

            const imagen = document.createElement("img");
            imagen.src = `img/Ludoteca/${juego.numero}.jpg`;
            imagen.alt = juego.nombre;
            imagen.loading = "lazy";

            // Si la imagen no carga, evitamos el icono de "roto"
            imagen.onerror = () => {
                imagen.onerror = null;
                imagen.style.display = "none";
            };

            const numero = document.createElement("span");
            numero.className = "juego-numero";
            numero.textContent = `#${juego.numero}`;

            const titulo = document.createElement("h3");
            titulo.textContent = juego.nombre;

            contenedorImagen.appendChild(imagen);
            contenedorImagen.appendChild(numero);
            tarjeta.appendChild(contenedorImagen);
            tarjeta.appendChild(titulo);
            listaJuegos.appendChild(tarjeta);
        });
    }

    buscador.addEventListener("input", () => {
        mostrarJuegos(buscador.value);
    });

    mostrarJuegos();
}


// ========================================
// ========================================
// 3. OCULTAR EVENTOS ESPECIALES PASADOS
// ========================================

function iniciarOcultarEventoEspecial() {
    // Lista de eventos especiales con su fecha de fin.
    // Cada entrada busca el artículo por su título (h3) y tiene una fecha límite.
    // ⚠️ Formato de fecha: new Date(año, mes-1, día, hora, minuto, segundo)
    //    Mes: 0 = enero, 9 = octubre, 10 = noviembre...

    const eventosAEliminar = [
        {
            titulo: "Blood on the Clocktower",
            fechaFin: new Date(2026, 9, 9, 22, 0, 0)   // 9 oct 2026, 22:00
        },
        {
            titulo: "Charla-coloquio con Jesús Gordillo",
            fechaFin: new Date(2026, 9, 30, 23, 0, 0)   // 30 oct 2026, 23:00
        },
        {
            titulo: "Concurso de Halloween",
            fechaFin: new Date(2026, 10, 1, 0, 0, 0)   // 1 nov 2026, 00:00
        }
    ];

    const eventos = document.querySelectorAll(".evento-especial");

    eventos.forEach(evento => {
        const tituloEvento = evento.querySelector("h3")?.textContent.trim();
        if (!tituloEvento) return;

        const config = eventosAEliminar.find(
            e => e.titulo === tituloEvento
        );
        if (!config) return;

        const msHastaFin = config.fechaFin.getTime() - Date.now();

        if (msHastaFin <= 0) {
            // Ya ha pasado: lo ocultamos directamente
            evento.style.display = "none";
        } else {
            // Aún no ha pasado: programamos que se oculte justo al terminar
            setTimeout(() => {
                evento.style.display = "none";
            }, msHastaFin);
        }
    });
}
// ========================================
// 4. MANEJADOR GLOBAL DE TECLADO
// ========================================

function iniciarTecladoGlobal() {
    document.addEventListener("keydown", (evento) => {
        const lightbox = document.getElementById("lightbox");
        const visorLudoteca = document.getElementById("visor-ludoteca");

        // --- Lightbox de la galería ---
        if (lightbox?.classList.contains("activo")) {
            if (evento.key === "Escape") {
                lightbox._cerrarVisor?.();
            } else if (evento.key === "ArrowLeft") {
                lightbox._fotoAnterior?.();
            } else if (evento.key === "ArrowRight") {
                lightbox._fotoSiguiente?.();
            }
            return;
        }

        // --- Visor de la ludoteca ---
        if (visorLudoteca?.classList.contains("activo")) {
            if (evento.key === "Escape") {
                visorLudoteca._cerrarVisorLudoteca?.();
            }
        }
    });
}