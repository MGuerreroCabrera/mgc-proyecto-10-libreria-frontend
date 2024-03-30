import "./Form.css";

// Crear la función qeu devuelve un formulario
export const Form = (formName) => {
    // Crear elemento HTML form
    const form = document.createElement("form");
    // Asignarle nombre e id
    form.id = formName;
    form.name = formName;
    // Asignarle la clase al formulario
    form.classList.add("form");
    // Devolver el formulario
    return form;
};