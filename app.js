// Archivo: app.js

// Asegúrate de cargar EmailJS cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', (event) => {
    // Inicializa EmailJS con tu User ID
    emailjs.init('ZRlCvvXOmRTtH721y'); // Reemplaza 'TU_USER_ID' con tu User ID de EmailJS

    // Selecciona el formulario por su ID
    document.getElementById('ordenForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

        // Extrae los datos del formulario
        const templateParams = {
            nombre: document.getElementById('nombre').value,
            direccion: document.getElementById('direccion').value,
            telefono: document.getElementById('telefono').value,
            email: document.getElementById('email').value,
            ordenNumero: Math.floor(Math.random() * 1000000) // Genera un número de orden aleatorio
        };

        // Envía los datos a EmailJS usando el Service ID y Template ID
        emailjs.send('service_2cv1mwo', 'template_ktla5ib', templateParams)
            .then((response) => {
                console.log('Correo enviado exitosamente!', response.status, response.text);
                // Resetea el formulario y muestra el mensaje de confirmación
                document.getElementById('ordenForm').reset();
                document.getElementById('ordenForm').style.display = 'none';
                document.getElementById('confirmacion').style.display = 'block';
            }, (error) => {
                console.error('Error al enviar el correo:', error);
            });
    });
});
