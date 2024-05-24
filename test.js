<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Valoración de Libros</title>
</head>
<body>
    <div id="libros"></div>

    <script>
        // Función para convertir la valoración numérica a estrellas
        const obtenerEstrellas = (rating) => {
            const filledStars = Math.floor(rating);
            const halfStar = rating % 1 >= 0.5 ? 1 : 0;
            const emptyStars = 5 - filledStars - halfStar;

            return '⭐'.repeat(filledStars) + '🌟'.repeat(halfStar) + '✩'.repeat(emptyStars);
        };

        // Función para mostrar los libros en el DOM
        const mostrarLibros = (libros) => {
            const contenedorLibros = document.getElementById('libros');
            contenedorLibros.innerHTML = '';
            
            libros.forEach(libro => {
                const divLibro = document.createElement('div');
                divLibro.innerHTML = `
                    <h3>${libro.title}</h3>
                    <p>${obtenerEstrellas(libro.rating)}</p>
                    ${[1, 2, 3, 4, 5].map(star => `<span class="star" data-id="${libro._id}" data-rating="${star}">⭐</span>`).join('')}
                `;
                contenedorLibros.appendChild(divLibro);
            });

            document.querySelectorAll('.star').forEach(star => {
                star.addEventListener('click', (event) => {
                    const id = event.target.getAttribute('data-id');
                    const rating = parseInt(event.target.getAttribute('data-rating'));
                    enviarValoracion(id, rating);
                });
            });
        };

        // Función para enviar la valoración al servidor
        const enviarValoracion = (id, rating) => {
            fetch(`/libros/${id}/valorar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rating })
            })
            .then(response => response.json())
            .then(libroActualizado => {
                console.log('Libro actualizado:', libroActualizado);
                cargarLibros();  // Recargar los libros para actualizar la valoración en el DOM
            })
            .catch(error => console.error('Error al enviar la valoración:', error));
        };

        // Función para obtener los libros del servidor
        const cargarLibros = () => {
            fetch('/libros')
                .then(response => response.json())
                .then(libros => mostrarLibros(libros))
                .catch(error => console.error('Error al obtener los libros:', error));
        };

        // Cargar los libros cuando se carga la página
        document.addEventListener('DOMContentLoaded', cargarLibros);
    </script>
</body>
</html>
