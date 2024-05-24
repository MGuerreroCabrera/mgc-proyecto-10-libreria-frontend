// Crear variable para controla en qué ruta me encuentro
export let routeControl = "";

// Crear función que permita cambiar el valor de routeControl desde otros archivos.
export const saveRoute = (route) => {
    localStorage.setItem("route", route);
    routeControl = "";
    routeControl = route;
}