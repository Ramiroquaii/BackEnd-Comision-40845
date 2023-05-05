
(document.getElementsByClassName("btnProductos"))[0].addEventListener("click", function(){getProductos()});
(document.getElementsByClassName("btnCarritos"))[0].addEventListener("click", function(){getCarritos()});
(document.getElementsByClassName("btnAdd"))[0].addEventListener("click", function(){addProduct()});

function getProductos(){
    fetch(`http://localhost:8080/api/products/`)
    .then((resultado) => {
        return resultado.json();
    })
    .then((json) => {
        let htmlString = "<h1>LISTADO DE PRODUCTOS</h1>";
        json.forEach(element => {
            htmlString += `
            <p>ID: ${element.id}</p>
            <h3>${element.name}</h3>
            <p>${element.descripcion}</p>
            <p>Codigo: ${element.code}</p>
            <img src="${element.photo}" alt="${element.photo}"
            <p>Precio: $${element.price}</p>
            <p>Stock: ${element.stock}</p>
            `;
        });
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