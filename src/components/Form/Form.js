import "./Form.css";

// Crear la función qeu devuelve un formulario
export const Form = (formName, textForm) => {
    // Crear elemento HTML form
    const form = document.createElement("form");
    // Crear la capa donde insertar el texto del formulario
    const textFormContainer = document.createElement("div");
    textFormContainer.classList.add("text-form-container");
    const pTextForm = document.createElement("p");
    pTextForm.textContent = textForm;
    pTextForm.classList.add("text-form");
    // Inyectar el texto en el formulario
    textFormContainer.append(pTextForm);
    form.append(textFormContainer);
    // Asignarle nombre e id
    form.id = formName;
    form.name = formName;
    // Asignarle la clase al formulario
    form.classList.add("form");
    // Devolver el formulario
    return form;
};