
(document.getElementsByClassName("btnUsuarios"))[0].addEventListener("click", function(){getUsers()});
(document.getElementsByClassName("btnAdd"))[0].addEventListener("click", function(){addProduct()});

function getUsers(){
    fetch(`http://localhost:3000/faker`)
    .then((resultado) => {
        return resultado.json();
    })
    .then((json) => {
        let htmlString = "";
        json.forEach(element => {
            htmlString += `
            <div class="user">
            <h3>${element.nombre}</h3>
            <p>${element.email}</p>
            <p>${element.website}</p>
            <img src="${element.image}" alt="${element.image}">
            </div>
            `;
        });
        document.getElementById(`btnProd`).value = "RECARGAR";
        document.getElementById(`titulo`).innerHTML = "<h1>LISTADO DE USUARIOS</h1>";
        document.getElementById(`listProducts`).innerHTML = htmlString;
    })
    .catch((e) => {
        console.log(e);
    })
}

function getCarritos(){
    fetch(`http://localhost:8080/api/cart/`)
    .then((resultado) => {
        return resultado.json();
    })
    .then((json) => {
        let htmlString = "<h1>CARRITOS ACTIVOS</h1>";
        json.forEach(element => {
            htmlString += `
            <p>ID: ${element.id}</p>
            <p>Fecha: ${element.timestamp}</p>
            <p>En Carrito:</p>
            `;
            let inCart = element.productos;
            inCart.forEach(element => {
                htmlString += `
                <p>Nombre: ${element.name} ID: ${element.id}</p>
                <img src="${element.photo}" alt="${element.photo}"
                <p>Precio $ ${element.price} cantidad: ${element.stock}</p>
                `;
            });
        });
        document.getElementById(`listProducts`).innerHTML = htmlString;
    })
    .catch((e) => {
        console.log(e);
    })
}





/////////////////////////////////////////////////////////

function addProduct() {
    const form = document.getElementById('formAddPrd');

    form.elements['name'];
    form.elements['descrip'];
    form.elements['codigo'];
    form.elements['foto'];
    form.elements['price'];
    form.elements['stock'];

    fetch('http://localhost:8080/api/products', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ mail: 'pp@pp.com', password: '123' })
    })
    .then(res => res.json())
    .then(res=> {
        console.log(res);
    });
}