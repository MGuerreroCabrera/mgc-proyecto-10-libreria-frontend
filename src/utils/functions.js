import { Main } from "../components/Main/Main";

// Función que elimina el antiguo main en el caso de que exista
export const deleteOldMain = () => {
    const oldMain = document.querySelector("main");
    if(oldMain){
        oldMain.remove();
    }
}

// Función que pone los estilos de campo requerido de un input que recibe por parámetro
const putError = (input, message) => {    
    input.value = "";
    input.className = "form-invalid-input";
    // Indicar que el campo es obligatorio
    input.placeholder = message;
    // Poner el foco en el campo
    input.focus();
}

export const validateForm = (...inputs) => {
    for (const inputId of inputs) {        
        const input = document.querySelector(`#${inputId}`);
        // Validar si llega el campo correo electrónico y validar que sea correcto
        if(inputId === "email") {
            const validatedEmail = isEmail(input.value);
            if(!validatedEmail) {
                putError(input, "! ⛔️ Correo inválido ¡");
                input.focus();
                return true;
            }
        }        

        if (input.value === "") {
            putError(input, "! 📣 Campo obligatorio ¡");
            input.focus();
            return true;
        } else {
            input.classList.remove("form-invalid-input");
            input.classList.add("form-input");
            input.placeholder = "";
        }
    }
}

export const failedRequest = () => {
    // Crear capa contenedora del error
    const divContainer = document.createElement("div");
    divContainer.classList.add("div-failed-request");
    // Crear párrafo con el error
    const p = document.createElement("p");
    p.classList.add("p-failed-request");
    p.textContent = "¡¡ Upsss !! Ha ocurrido un error en la petición. Actualiza la página por favor";
    // Inyectar párrafo en la capa contenedora del error
    divContainer.append(p);
    // Eliminar el main actual
    deleteOldMain();
    // Pintar el main de nuevo
    Main();
    // Inyectar la capa contenedora del error en el main
    const divMain = document.querySelector("#main");
    divMain.append(divContainer);

}

const isEmail = (email) => {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validEmail.test(email);
}
