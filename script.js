
// JUMEBA - JavaScript principal

console.log("¡Bienvenido a JUMEBA!");

// ========================================
// VISOR AMPLIADO DE LA GALERÍA (LIGHTBOX)
// ========================================

document.addEventListener("DOMContentLoaded", () => {
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

    // Controles de teclado.
    document.addEventListener("keydown", (evento) => {
        if (!lightbox.classList.contains("activo")) return;

        if (evento.key === "Escape") {
            cerrarVisor();
        } else if (evento.key === "ArrowLeft") {
            fotoAnterior();
        } else if (evento.key === "ArrowRight") {
            fotoSiguiente();
        }
    });
});

// =========================
// LUDOTECA JUMEBA
// =========================

document.addEventListener("DOMContentLoaded", () => {
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
        "SIMILO: EL SEÑOR DE LOS ANILLOS"
    ];

    const listaJuegos = document.getElementById("lista-juegos");
    const buscador = document.getElementById("buscador-juegos");
    const contador = document.getElementById("contador-juegos");

    if (!listaJuegos || !buscador || !contador) return;

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
});