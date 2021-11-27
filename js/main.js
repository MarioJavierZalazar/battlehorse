//variables
let continuarCargando;
let subtotal = 0;
let total = 0;
let codigoDescuento;

//arrays
const listaDeProductos = [];
const listaDelCarrito = [];
const carrito = [];

//Fuciones
const descuento = (valor) =>{
    total = subtotal
    return total *= valor;
}

//Objetos 
class Producto {
    constructor(id, nombre, valor) {
        this.id = id,
        this.nombre = nombre,
        this.precioPorUnidad = valor;
    }
    precioConIva(){this.precioPorUnidad *= 1.21}
};
//Creando Objetos
const productos = [
    new Producto(1,'Unidad tactica',7500),
    new Producto(2,'Unidad de mando',5000),
    new Producto(3,'Vehiculo',11000),
    new Producto(4,'Tablero de juego',8000),
    new Producto(5,'Set de dados',4500)
];

//creando plantilla de lista de productos
for (const producto of productos) {
    producto.precioConIva();
    listaDeProductos.push(`ID: ${producto.id} - ${producto.nombre} $ ${producto.precioPorUnidad}`);
}

do {
    //El usuario selecciona el producto por ID
    let productoSeleccionado = parseInt(prompt(`Ingrese el producto a comprar, indicando su ID\n${listaDeProductos.join('\n')}`));
    //validamos que el usuarios cargue un valor de ID valido y no un caracter
    while (productoSeleccionado < 1 || productoSeleccionado > productos.length || /\D/.test(productoSeleccionado)){
        productoSeleccionado = parseInt(prompt(`Ingreso un valor erroneo\nFavor de  seleccionar el producto a comprar, indicando su ID\n${listaDeProductos.join('\n')}`));
    }
    //Mostramos el producto seleccionado y preguntamos cuantas unidades desea.
    let nombreSeleccionado = productos.find(elemento => elemento.id === productoSeleccionado).nombre
    let cantidadDeProductos = parseInt(prompt(`Seleccionastes ${nombreSeleccionado}.\n¿Cuantas unidades desea comprar?`));
    for (let i = 0; i < cantidadDeProductos; i++) {
        carrito.push((productos.find(elemento => elemento.id === productoSeleccionado)));
    }
    //preguntamos si quiere continuar cargando
    continuarCargando = prompt('¿Desea agregar otro producto a su carrito?\nIndicar "Si" para cargar un nuevo producto o "No" para continuar con la compra').toLowerCase();
} while (continuarCargando != "no");


for (const elementoDelCarrito of carrito) {
    listaDelCarrito.push(`${elementoDelCarrito.nombre} $ ${elementoDelCarrito.precioPorUnidad}`);
    subtotal += elementoDelCarrito.precioPorUnidad;
}

//Solicitamos al usuario indicar un codigo de descuento
codigoDescuento = prompt('A continuacion podra ingresar alguno de los siguientes codigos de descuentos:\nFF2021\nAN2022').toUpperCase();

switch (codigoDescuento) {
    case 'FF2021':
        total = descuento(0.90);
        alert(`Su carrito se compone de\n${listaDelCarrito.join('\n')}\nEl subtotal es de $ ${subtotal}\nSe aplico un descuento del 10% por el codigo ${codigoDescuento}\ny su total es de $ ${total}\nPresione Aceptar para finalizar la compra`)
        break;
    case 'AN2022':
        total = descuento(0.80);
        alert(`Su carrito se compone de\n${listaDelCarrito.join('\n')}\nEl subtotal es de $ ${subtotal}\nSe aplico un descuento del 20% por el codigo ${codigoDescuento}\ny su total es de $ ${total}\nPresione Aceptar para finalizar la compra`)
        break;
    default:
        alert('No se aplicaron descuentos');
        alert(`Su carrito se compone de\n${listaDelCarrito.join('\n')}\nEl total es de $ ${subtotal}\nPresione Aceptar para finalizar la compra`)
        break;
}

alert('Muchas Gracias por su compra');



