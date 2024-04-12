// Función que elimina el antiguo main en el caso de que exista
export const deleteOldMain = () => {
    const oldMain = document.querySelector("main");
    if(oldMain){
        oldMain.remove();
    }
}

// Función que valida si existe usuario registrado
export const validateUser = () => {
    
}