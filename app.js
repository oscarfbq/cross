const productos = [

{
id:1,
nombre:"Urban Black",
precio:799,
imagen:"img/camisa-negra.png"
},

{
id:2,
nombre:"Luxury White",
precio:899,
imagen:"img/camisa-blanca.png"
},

{
id:3,
nombre:"Emerald Premium",
precio:999,
imagen:"img/camisa-verde.png"
}

];

let carrito = [];

const contenedor =
document.getElementById("contenedorProductos");

productos.forEach(producto=>{

contenedor.innerHTML += `

<div class="producto">

<img
src="${producto.imagen}"
alt="${producto.nombre}">

<h3>
${producto.nombre}
</h3>

<p>
$${producto.precio}
</p>

<select id="talla-${producto.id}">

<option value="CH">
CH
</option>

<option value="M">
M
</option>

<option value="G">
G
</option>

<option value="XL">
XL
</option>

</select>

<button
onclick="agregarCarrito(${producto.id})">

Agregar al carrito

</button>

</div>

`;

});

function agregarCarrito(id){

const producto =
productos.find(
p=>p.id===id
);

const talla =
document.getElementById(
`talla-${id}`
).value;

carrito.push({

nombre:producto.nombre,
precio:producto.precio,
talla:talla,
cantidad:1

});

actualizarCarrito();

}

function actualizarCarrito(){

const lista =
document.getElementById(
"listaCarrito"
);

lista.innerHTML="";

let total=0;

carrito.forEach(item=>{

total += item.precio;

lista.innerHTML += `

<div class="item">

<strong>
${item.nombre}
</strong>

<br>

Talla:
${item.talla}

<br>

$${item.precio}

</div>

`;

});

document.getElementById(
"total"
).innerText =
"$" + total;

}

function comprarWhatsApp(){

if(carrito.length===0){

alert(
"Tu carrito está vacío"
);

return;

}

let total=0;

let mensaje =
"Hola, quiero comprar:%0A%0A";

carrito.forEach(item=>{

mensaje +=
`🛍️ ${item.nombre}%0A`;

mensaje +=
`Talla: ${item.talla}%0A`;

mensaje +=
`Cantidad: ${item.cantidad}%0A`;

mensaje +=
`Precio: $${item.precio}%0A%0A`;

total += item.precio;

});

mensaje +=
`💰 Total: $${total}`;

window.open(

`https://wa.me/524613267745?text=${mensaje}`,

"_blank"

);

}
