import "./Input.css";

// Crear la función que devuelve el componente input
export const Input = (inputName, inputType, placeholder) => {
    // Crear elemento input con los datos recibidos por parámetro
    // Añadir un poco de fantasía para crear un campo input animado
    const inputContainer = document.createElement("div");
    inputContainer.className = "input-container";
    inputContainer.innerHTML = `
        <label class="label">
            <input type=${inputType} name=${inputName} id=${inputName} placeholder=" " class="input" />
            <span class="label__name">${placeholder}</span>
        </label>
    `;

    return inputContainer;
};