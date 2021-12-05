//variables
let continueBuying;
let subtotal = 0;
let descCode;
let tablaCarrito = document.getElementById('tablaCarrito');
let tablaProductos = document.getElementById('listaProductos');

//arrays
const productList = [];
const cart = [];

//Fuciones
const desc = (value) => {
    total = subtotal
    return total *= value;
};
const saveLocal = (key, value) => {
    localStorage.setItem(key, value)
};

//creando plantilla de lista de productos
for (const product of products) {
    product.priceIva();
    productList.push(`ID: ${product.id} - ${product.name} $ ${product.price}`);
}

//Verificando si hay productos de manera local
if ('cartList' in localStorage) {
    const saveLocalProduct = JSON.parse(localStorage.getItem('cartList'));
    console.log(saveLocalProduct)
}



do {
    //El usuario selecciona el producto por ID
    let productSelected = parseInt(prompt(`Ingrese el producto a comprar, indicando su ID\n${productList.join('\n')}`));
    //validamos que el usuarios cargue un valor de ID valido y no un caracter
    while (productSelected < 1 || productSelected > products.length || /\D/.test(productSelected)) {
        productSelected = parseInt(prompt(`Ingreso un valor erroneo\nFavor de  seleccionar el producto a comprar, indicando su ID\n${productList.join('\n')}`));
    }
    cart.push((products.find(elemento => elemento.id === productSelected)));
    //preguntamos si quiere continuar cargando
    continueBuying = prompt('¿Desea agregar otro producto a su carrito?\nIndicar "Si" para cargar un nuevo producto o "No" para continuar con la compra').toLowerCase();
} while (continueBuying != "no");

let total = document.getElementById('tablaCarrito');

for (const produtCart of cart) {
    subtotal += produtCart.price;
    let trLista = document.createElement('tr');
    trLista.innerHTML = `<tr><td>${produtCart.name}</td><td>$${produtCart.price}</td></tr>`;
    tablaProductos.appendChild(trLista);
}

let tbodyTotal = document.createElement('tbody');
tbodyTotal.innerHTML = `<tr><th>Subtotal</th><th>$ ${subtotal}</th></tr>`;
total.appendChild(tbodyTotal);