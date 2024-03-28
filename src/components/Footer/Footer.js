import "./Footer.css";

// Crear función que pinta el footer en el DOM
export const Footer = () => {
    // Traer elemento app 
    const app = document.querySelector("#app");
    // Comprobar si existía footer
    const oldFooter = document.querySelector("footer");
    if(oldFooter) {
        oldFooter.remove();
    }
    // Crear elemento HTML footer
    const footer = document.createElement("footer");
    // Crear el contenido del footer
    const p = document.createElement("p");
    p.textContent = "© MGC all rights reserved";
    p.classList.add("p-footer");
    // Inyectar contenido en el footer
    footer.append(p);
    // Inyectar footer en app
    app.append(footer);
};