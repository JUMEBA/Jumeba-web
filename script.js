
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