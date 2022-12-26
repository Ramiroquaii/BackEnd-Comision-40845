const socket = io();

socket.on('messages', data => {
  let html = document.getElementById('chatContent').innerHTML;

  data.forEach(message => {
    html += `<li><em>${message.user}</em> [ ${message.time} ] says: ${message.text}</li>`
  });

  document.getElementById('chatContent').innerHTML = `${html}`;
});

socket.on('message-added', message => {
  let html = document.getElementById('chatContent').innerHTML;

  html += `<li><em>${message.user}</em> [ ${message.time} ] says: ${message.text}</li>`;

  document.getElementById('chatContent').innerHTML = `${html}`;
});

const sendMessage = (that) => {
  const message = {
    user: that.chatUsr.value,
    text: that.chatMsg.value
  };
  socket.emit('new-message', message);
};





socket.on('products', data => {
  let html = document.getElementById('productList').innerHTML;

  data.forEach(element => {
    html = `${html}
    <div class="table-line">
    <p class="nameTb">${element.name}</p>
    <p class="priceTd">$ ${element.price}</p>
    <img src="${element.image}" alt="${element.name}">
    </div>`;
  });

  document.getElementById('productList').innerHTML = `${html}`;
});

socket.on('product-added', message => {
  let html = document.getElementById('productList').innerHTML;

  html += `<div class="table-line">
  <p class="nameTb">${message.name}</p>
  <p class="priceTd">$ ${message.price}</p>
  <img src="${message.image}" alt="${message.name}">
  </div>`;
  
  document.getElementById('productList').innerHTML = `${html}`;
});

const sendProduct = (that) => {
  const message = {
    name: that.name.value,
    price: that.price.value,
    image: that.image.value
  };
  socket.emit('new-product', message);
};
