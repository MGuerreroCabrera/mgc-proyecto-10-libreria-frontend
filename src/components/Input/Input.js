import "./Input.css";

// Crear la función que devuelve el componente input
export const Input = (inputName, inputType, placeholder, required = false) => {
    // Crear el elemento HTML input
    const input = document.createElement("input");
    // Asignarle los valores recibidos por parámetro
    input.id = inputName;
    input.name = inputName;
    input.type = inputType;
    if(required) {
        input.required = true;
        input.setCustomValidity("Por favor, rellena este campo.");
    }
    // Si recibimos placeholder asignárselo
    if(placeholder) {
        input.placeholder = placeholder;
    }
    // Asignar la clase
    input.classList.add("form-input");
    // Devolver el elmento input
    return input;    
};