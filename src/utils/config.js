const BASE_URL = "http://localhost:3000/api/v1";

// Variable (Objeto) que contiene las URLs de las peticiones a la API
export const API_URLS = {
    // URL para fetch libros
    books: `${BASE_URL}/books`,
    // URL para fetch users (Sirve para Register)
    users: `${BASE_URL}/users/`,
    // URL para añadir a favoritos
    favorites: `${BASE_URL}/users/${localStorage.getItem("userId")}`,
    // URL para hacer login de usuario
    login: `${BASE_URL}/login`
};