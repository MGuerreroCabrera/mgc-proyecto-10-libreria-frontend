import { API_URLS } from "./config";


// Función que ejecuta los distintos fetch de la aplicación
export const fetchData = async (urlKey, options = {}, id = false) => {
    // Obtener la url del archivo config utilizando la key correspondiente
    let url = API_URLS[urlKey];

    // Si llega id sumar a la url (enviar puntuación libro)
    if(id){
        url = url + `/${id}`;
    }
    try {
        // Lanzar petición al servidor
        const response = await fetch(url, options);
        // Validar estado respuesta
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }
        // Pasar respuesta a formato json
        const data = await response.json();
        // Retornar datos obtenidos
        return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return;
    }
};