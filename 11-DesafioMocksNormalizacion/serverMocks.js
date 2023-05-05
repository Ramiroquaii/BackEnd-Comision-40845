import express from 'express';

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Funcion de selecion aleatoria de un elemento de un array.
const pickRandomElementFromArray = (array) => array[Math.trunc(Math.random() * array.length)];

// GET route para consumir desde el front informacion aleatoria de prueba.
// Mock manual de datos autogenerados.
app.get('/mock', (req, res) => {
    const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana']
    const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
    const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']

    const results = Array.from({ length: 5 }).map(
        () => (
            {
            nombres: pickRandomElementFromArray(nombres),
            apellidos: pickRandomElementFromArray(apellidos),
            colores: pickRandomElementFromArray(colores),
            }
        )
    );

    res.json(results);
});


// FAKER module for generating raw an random data ****************************
import { faker } from '@faker-js/faker';

// Implementacion de FAKER para generar datos aleatorios.
function createRandomUser() {
    return {
        nombre: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        website: faker.internet.url(),
        image: faker.image.avatar(),
    };
}

function createRandomCompany() {
    return {
        companyName: faker.company.name(),
        coutry: faker.address.country(),
        location: faker.address.city(),
        companyEmployees: [],
    };
}

// GET route para consumir desde el front informacion aleatoria de prueba.
// Datos generados con el uso de la libreria FAKER.
app.get('/faker', (req, res) => {
    const users = Array.from({ length: 5 }).map(() => ( createRandomUser() ) );
    res.json(users);
});



// Paquete NORMALIZR implementacion ///////////////////////////////////////////
import { normalize, schema, denormalize } from 'normalizr';

const employee = new schema.Entity("employees", {}, {
    idAttribute: 'employeeId'
});

const company = new schema.Entity("companies", {}, {
    idAttribute: 'companyId',
    companyEmployees: [employee],
});

let employeesArray = [];
let companiesArray = [];

function initializeRandomData(){
    let id = 1;
    for(let i = 0; i < 25; i++){
        let employee = createRandomUser();
        employeesArray.push({employeeId: id, ...employee});
        id += 1;
    }

    id=1;
    for(let i = 0; i < 5; i++){
        let company = createRandomCompany();
        companiesArray.push({companyId: id, ...company});
        id += 1;
    }
}

function desordenar(unArray){
    var t = unArray.sort(function(a,b) {return (Math.random()-0.5)});
    return [...t];
}

function asignarEmpleados(){
    let offSetBegin = 0;
    let offSetEnd = 5;
    for(let i = 0; i < companiesArray.length; i++){
        let selectedEmployees = employeesArray.slice(offSetBegin,offSetEnd);
        companiesArray[i].companyEmployees = selectedEmployees;
        offSetBegin += 5;
        offSetEnd +=5;
    }
}

initializeRandomData();
employeesArray = desordenar(employeesArray);
asignarEmpleados();

let xyz = {companies: companiesArray, employees: employeesArray };

const normalizedData = normalize(companiesArray, company);

console.log(normalizedData);

app.get('/companies', (req, res) => {
    res.json(xyz);
});

// Iniciliza servidor en Puerto 3000
app.listen(3000, () => console.log('Server Mock in 3000'));
