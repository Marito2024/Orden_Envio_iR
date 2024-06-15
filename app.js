// Archivo: app.js

// Asegúrate de cargar EmailJS cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', (event) => {
    // Inicializa EmailJS con tu User ID
    emailjs.init('ZRlCvvXOmRTtH721y'); // Reemplaza 'TU_USER_ID' con tu User ID de EmailJS

    // Selecciona el formulario por su ID para el envío de la orden
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

    // Manejador de la Calculadora de Costo de Envío
    document.getElementById('calcularCostoEnvio').addEventListener('click', function() {
        const codigoPostal = document.getElementById('codigoPostal').value.trim();

        // Lista de códigos postales considerados peligrosos
        const zonasPeligrosas = [
            '1613', '1620', '1636', '1667', '1669',// Ejemplos de códigos postales peligrosos
            // Agrega más códigos postales según sea necesario
        ];

        // Lista de códigos postales donde no se realizan envíos actualmente
        const zonasNoAtendidas = [
            '1610', '1645', '1706', '1665' // Ejemplos de códigos postales no atendidos
            // Agrega más códigos postales según sea necesario
        ];

        // Verifica si el código postal ingresado está en la lista de zonas peligrosas
        if (zonasPeligrosas.includes(codigoPostal)) {
            // Muestra el mensaje de zona peligrosa
            document.getElementById('costoEnvioResultado').innerHTML = `<p>No se realizan envíos a la zona con CP ${codigoPostal} debido a problemas de seguridad.</p>`;
            return;
        }

        // Verifica si el código postal ingresado está en la lista de zonas no atendidas
        if (zonasNoAtendidas.includes(codigoPostal)) {
            // Muestra el mensaje de zona no atendida
            document.getElementById('costoEnvioResultado').innerHTML = `<p>Actualmente no realizamos envíos a la zona con CP ${codigoPostal}. Por favor, verifica el código postal o contáctanos para más información.</p>`;
            return;
        }

        // Tabla de tarifas específicas por códigos postales de la Zona Norte del AMBA
        const tarifasEnvio = {
            '1602': 300, '1603': 300, '1605': 300, '1607': 300, // Vicente López
            '1642': 350, '1643': 350, '1644': 350,              // San Isidro
            '1646': 400, '1647': 400,                           // San Fernando
            '1648': 450, '1649': 450,                           // Tigre
            '1630': 500,                                        // Pilar
            '1625': 550,                                        // Escobar
            '1650': 2500,                                       // San Matin
            '1663': 350, '1664': 350, '1665': 350,              // San Miguel
            '1667': 450,                                        // Malvinas Argentinas
            
        };

        let costoEnvio = tarifasEnvio[codigoPostal];

        // Muestra el resultado del costo de envío
        const resultadoDiv = document.getElementById('costoEnvioResultado');
        if (costoEnvio !== undefined) {
            resultadoDiv.innerHTML = `<p>El costo de envío para el CP ${codigoPostal} es <strong>$${costoEnvio}</strong>.</p>`;
        } else {
            resultadoDiv.innerHTML = `<p>No hay tarifas disponibles para el CP ${codigoPostal}. Por favor, verifica el código postal.</p>`;
        }
    });
});
