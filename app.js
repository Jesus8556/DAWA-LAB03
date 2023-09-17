const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');

// Middleware para procesar datos del cuerpo de las solicitudes HTTP
app.use(bodyParser.urlencoded({ extended: true }));

// Directorio de archivos estáticos
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('cursos');
});

const preciosCursos = {
    Java: 1200,    // Precio para el curso Java
    PHP: 800,     // Precio para el curso PHP
    ".NET": 1500   // Precio para el curso .NET
  };

app.post('/detalles', (req, res) => {

    const curso = req.body.curso;
    const modules = req.body.modules || [];
    const pago = req.body.payment;

    const precio = preciosCursos[curso];

    const descuento = pago === "Efectivo" ? precio * 0.10 : 0;
    const precioFinal = precio - descuento;

    console.log("Curso seleccionado:", curso); //| Agregar esta línea
    res.render('detalles', { curso, modules, pago, precio, precioFinal,descuento });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});