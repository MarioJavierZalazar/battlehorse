/* ----- variables ----- */
let continueBuying;
let subtotal = 0;
let descCode;
let tablaCarrito = document.getElementById('tablaCarrito');
let tablaProductos = document.getElementById('listaProductos');
let total = document.getElementById('tablaCarrito');
let tbodyTotal = document.createElement('tbody');
let addCarritos = document.getElementsByClassName('btnAddCarrito');
let btnsCarrito = document.querySelectorAll('#btnsCarrito')[0];
let rangoPrecio = document.getElementsByName('rangoPrecio');

const fragment = document.createDocumentFragment();
const vaciarCarrito = document.querySelectorAll('#vaciarCarrito')[0];

/* ----- arrays ----- */
const carrito = [];




/* ----- Fuciones ----- */
//Dibujamos el carrito de compras
const buildCart = (cart) => {
    tablaProductos.innerHTML = "";
    for (const produtCart of cart) {
        subtotal += produtCart.total;
        let trLista = document.createElement('tr');
        trLista.innerHTML = `<tr><td>${produtCart.name}</td><td><input type="number" class="form-control-sm cantProducts" id="${produtCart.name}${produtCart.id}" aria-describedby="cantidadDeProductos" value=${produtCart.cant}></td><td>$${produtCart.total}</td></tr>`;
        fragment.appendChild(trLista);
        tablaProductos.appendChild(fragment);

        tbodyTotal.innerHTML = `<tr><th>Subtotal</th><th colspan =2 >$ ${subtotal}</th></tr>`;
        total.appendChild(tbodyTotal);
    }
}

const saveLocal = (key, value) => {
    localStorage.setItem(key, value)
};


/* ----- Logica ----- */

//cargamos la grilla de productos
grillaDePorductos(products);

//Verificando si hay productos de manera local y lo cargamos al carrito
if ('cartList' in localStorage) {
    let saveLocalProduct = JSON.parse(localStorage.getItem('cartList'));
    for (saveProdcut of saveLocalProduct) {
        carrito.push(new CartProduct(saveProdcut.id, saveProdcut.name, saveProdcut.price, saveProdcut.cant, saveProdcut.total));
        btnsCarrito.classList.remove('invisible');
        buildCart(carrito);
    }
}

//evento para cargar el carrito segun la seleccion de boton
for (const btn of addCarritos) {
    btn.addEventListener('click', () => {
        btnsCarrito.classList.remove('invisible');
        console.log(carrito);
        let selected = products.find(product => product.id == btn.id);
        if ((carrito.find(elemento => elemento.id == btn.id)) == undefined) {
            carrito.push(new CartProduct(selected.id, selected.name, selected.price, 1, selected.price))
        } else {
            let found = (carrito.findIndex(elemento => elemento.id == btn.id));
            carrito[found].cant += 1;
            carrito[found].priceTotal();
        }
        buildCart(carrito);
        saveLocal('cartList', JSON.stringify(carrito));
    })
}

//Guardamos en memoria el contenido del carrito
saveLocal('cartList', JSON.stringify(carrito));

//Evento para vaciar el carrito
vaciarCarrito.addEventListener('click', () => {
    btnsCarrito.classList.add('invisible');
    for (let i = 0; i < carrito.length; i++) {
        carrito.pop();
    }
    tbodyTotal.innerHTML = `<tr><th colspan=3><spam class='subtitulo'>Su carrito esta vacio</spam></th></tr>`;
    tablaProductos.innerHTML = "";
    localStorage.removeItem('cartList');
});

