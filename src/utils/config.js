// Variable (Objeto) que contiene las URLs de las peticiones a la API
export const API_URLS = {
    // URL para fetch libros
    books: "http://localhost:3000/api/v1/books",
    // URL para fetch users (Sirve para Register)
    users: "http://localhost:3000/api/v1/users/",
    // URL para añadir a favoritos
    favorites: `http://localhost:3000/api/v1/users/${localStorage.getItem("userId")}`,
    // URL para hacer login de usuario
    login: "http://localhost:3000/api/v1/users/login",    
};