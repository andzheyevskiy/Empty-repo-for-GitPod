let express = require('express');
let app = express();
let bodyParser = require("body-parser")

let datos = []



function returnIndex(entrada) {
    const index = `
    <!DOCTYPE html>
    <html lang="es">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>test</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        <style>
th,td:not(.lower){
    text-transform: capitalize;
}
</style>
    </head>
    
    <body>
        <table class="table">
            <thead>
                <tr class="table-primary">
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Telefono</th>
                    <th scope="col">Email</th>
                    <th scope="col">Nacimiento</th>
                    <th scope="col">Genero</th>
                    <th scope="col">Forma de contacto</th>
                    <th scope="col">Horario de contacto</th>
                </tr>
            </thead>
            <tbody>
            ${entrada.map(e => `
            <tr class="table-secondary">
            <td>${e.name}</td>
            <td>${e.surname}</td>
            <td>${e.phone}</td>
            <td class="lower">${e.email}</td>
            <td>${e.birth}</td>
            <td>${e.gender}</td>
            <td>${Array.isArray(e.contact) ? e.contact.map(x=>`${x}`) : `${e.contact || ""}`}</td>
            <td>${e.schedule}</td>
            </tr>
                `).join("")}
            </tbody>
        </table>
    <script src="./test.js"></script>
    </body>
    
    </html>
    `
    return index
}

app.use("/", bodyParser.urlencoded({ extended: false }))
app.post("/api/formulario", function (req, res) {
    const newData = {
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        email: req.body.email,
        birth: req.body.birth,
        gender: req.body.gender,
        contact: req.body.contact,
        schedule: req.body.schedule
    }
    datos.push(newData)
    const index = returnIndex(datos)
    res.send(index)
})

app.get("/api/formulario", function(req,res){
    const index =  returnIndex(datos)
    res.send(index)
})

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})