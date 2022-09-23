//requiriendo modulos
const fetch = require('node-fetch');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
var crypto = require("crypto");

//rectura de archivo dates.json
const json_dates = fs.readFileSync('src/dates.json', 'utf-8');
//convierte a objeto para utilizar los datos
let dates = JSON.parse(json_dates);

//crear la consulta sql para insertar los datos
async function createDb(req, res) {
    let consult = `INSERT INTO dates(id, name, username, email, street, suite, city, zipcode, lat, lgn, phone, website, nameCompany, catchPhrase, bs) VALUES `;
    //consumo api rest
    await fetch('http://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => {
            //recorre los elementos del api, separa los datos y construye la consulta
            data.forEach((element, i, arr) => {
                if (i < (arr.length - 1)) {
                    consult += `(${element.id}, '${element.name}', '${element.username}', '${element.email}', ` +
                        `'${element.address.street}', '${element.address.suite}', '${element.address.city}', ` +
                        `'${element.address.zipcode}', '${element.address.geo.lat}', ` +
                        `'${element.address.geo.lng}', '${element.phone}', '${element.website}', ` +
                        `'${element.company.name}', '${element.company.catchPhrase}', ` +
                        `'${element.company.bs}'), `;

                } else {
                    consult += `(${element.id}, '${element.name}', '${element.username}', '${element.email}', ` +
                        `'${element.address.street}', '${element.address.suite}', '${element.address.city}', ` +
                        `'${element.address.zipcode}', '${element.address.geo.lat}', ` +
                        `'${element.address.geo.lng}', '${element.phone}', '${element.website}', ` +
                        `'${element.company.name}', '${element.company.catchPhrase}', ` +
                        `'${element.company.bs}')`;
                }
            });


            //inserta la consulta sql
            create(req, res, consult);
            //notifica la insercion de los datos en db
            res.send(`
            <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
            <title>CRUD</title>
            </head>
            <body><div class="content p-2"><h5>loaded Database. <a href="/">Back</a></h5></div></body>
            </html>`)

        }).catch(err => console.log(err));

}

//permite instertar los valores en db sin que se repitan
function create(req, res, consult) {

    req.getConnection((err, conn) => {

        conn.query('SELECT * FROM dates', (err, rows) => {
            if (err) { res.json(err); }
            if (rows.length > 0) {
            } else {
                conn.query(consult, (err, rows) => {
                    if (err) { res.json(err); }
                });
            }
        })
    });
}

//captura la inf por POST y guarda los datos en un archivo .json con su respectivo formato 
function saveJson(req, res) {
    const { nombre, correo, ciudad, company } = req.body;
    //obtiene una url segun el correo registrado en Gravatar
    let iconUrl = getGravatar(correo);
    //verifica que no queden campos vacios
    if (!nombre || !correo || !ciudad || !company) {
        res.status(400).send("complete todos los campos");
        return;
    }
    //define el nuevo objeto a insertar en el .json, con id unico
    var newdates = {
        icon: iconUrl,
        id: uuidv4(),
        nombre,
        correo,
        ciudad,
        company
    };
    //agrega el objeto con los datos
    dates.push(newdates);
    //convierte los datos a formato json
    const json_dates = JSON.stringify(dates);
    //escribe los datos en el archivo dates.json
    fs.writeFileSync('src/dates.json', json_dates, 'utf-8');
    res.redirect('/')

}

//retorna la direccion a un Gravatar segun el email
function getGravatar(email) {

    var hash = crypto.createHash('md5').update(email).digest("hex");
    let imgUrl = "https://www.gravatar.com/avatar/" + hash + ".jpg";
    return imgUrl;
}

//renderiza la pagina principal mostrando la info guardada en json
function loadJson(req, res) {
    res.render('index.ejs', { dates: dates })

}

//identifica por metodo GET el registro a borrar, sobreescribe el .json excluyendo la info del id obtenido  
function deleteJson(req, res) {
    dates = dates.filter(date => date.id != req.params.id);
    const json_dates = JSON.stringify(dates);
    fs.writeFileSync('src/dates.json', json_dates, 'utf-8');
    res.redirect('/')
}

//carga el formulario con los datos a editar
function editJson(req, res) {
    let id = req.params.id;
    dates.forEach((date, i, arr) => {
        if (date.id === id) {
            res.render('edit.ejs', { data: arr[i] })
            arr.find;
        }
    })


}

//actualiza a dates.json modificando los valores segun el id capturado 
function updateJson(req, res) {
    let id = req.params.id;
    const { nombre, correo, ciudad, company } = req.body;
    dates.forEach((date, i, arr) => {
        if (date.id === id) {
            date.nombre = nombre;
            date.correo = correo;
            date.ciudad = ciudad;
            date.company = company;
            arr.find;
        }
    })

    const json_dates = JSON.stringify(dates);
    fs.writeFileSync('src/dates.json', json_dates, 'utf-8');
    res.redirect('/');

}

//exporta los metodos
module.exports = {
    createDb: createDb,
    saveJson: saveJson,
    loadJson: loadJson,
    deleteJson: deleteJson,
    editJson: editJson,
    updateJson: updateJson
}