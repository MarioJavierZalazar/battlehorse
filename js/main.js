/* ----- Logica ----- */

//cargamos la grilla de productos
if (document.getElementById('precio-todo').checked){
    $.get('../data/productos.json', (respuesta, estado) => {
        if (estado == 'success') {
            for (const product of respuesta){
                products.push(new Product(product.id,product.name,product.price,product.tag,product.picture))
            }
            for (const product of products) {
                product.priceIva();
            }
            grillaDePorductosUI(products);
        } else {
            console.log('Error en la carga de datos');
        };
    })
}else {
    console.log('Error');
}
//Verificando si hay productos de manera local y lo cargamos al carrito
$(document).ready(() => {
    if ('cartList' in localStorage) {
        let saveLocalProduct = JSON.parse(localStorage.getItem('cartList'));
        for (saveProdcut of saveLocalProduct) {
            carrito.push(new CartProduct(saveProdcut.id, saveProdcut.name, saveProdcut.price, saveProdcut.cant, saveProdcut.total));
            $('#btnsCarrito').removeClass('invisible')
            subtotal += (saveProdcut.price * saveProdcut.cant);
            buildCart(carrito);
        }
        badgeSet(carrito.length);
    }
});

//filtro por precio
for (const elemento of $('input[name="rangoPrecio"]')){
    elemento.addEventListener('change', () => {
       if (elemento.checked){
           if (elemento.value == 0){
               grillaDePorductosUI(products);
           };
           if (elemento.value == 50){
               const encontrado = products.filter(price => price.price < 51);
               grillaDePorductosUI(encontrado);
           };
           if (elemento.value == 100){
               const encontrado = products.filter(price => price.price > 50 && price.price < 101);
               grillaDePorductosUI(encontrado);
           };
           if (elemento.value == 99){
               const encontrado = products.filter(price => price.price > 100);
               grillaDePorductosUI(encontrado);
           };
       }
    })
}

//Evento para vaciar el carrito
$('#vaciarCarrito').on('click', vaciarCarrito);




