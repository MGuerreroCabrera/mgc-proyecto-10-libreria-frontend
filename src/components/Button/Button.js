import "./Button.css";

// Crear la función que devuelve el botón
export const Button = (textButton) => {
    // Crear el elemento HTML button
    const button = document.createElement("button");
    // Asignar el texto del botón
    button.textContent = textButton;
    // Asignar la clase del boton
    button.classList.add("general-button");
    // Devolver el elemento
    return button;
};
