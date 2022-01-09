//seteo de grilla de productos
const grillaDePorductosUI = (lista) =>{
    $('#listaDeProductos').empty();
    for (const product of lista) {
        $('#listaDeProductos').append(`
        <div class="card col-3 m-3" width="18rem">
            <img src="${product.picture}" class="card-img-top img-fluid" loading="lazy" alt="${product.name}">
            <div class ="card-body">
                <h6 class ="card-title titulo">${product.name}</h6>
                <h5 class ="card-title" style="min-height: 50px">$ ${product.price}</h5>
                <button type ="button" id="${product.id}" class ="btn boton btnAddCarrito">Añadir al carrito</button>
            </div>
        </div>
        `);
    }
    //evento para cargar el carrito segun la seleccion de boton
    $('.btnAddCarrito').on('click',comprarProducto);
    $('.btnAddCarrito').on('click',warningTextAddProduct);
}

//Guardar elementos en el localStorage
const saveLocal = (key, value) => {
    localStorage.setItem(key, value)
};

//Seteo de cantidad de productos unicos en el carrito
const badgeSet = (cant) => {
    if (cant > 0){
        $('#badge').html(cant);
    } else {
        $('#badge').empty();
    }
}

//Seteo del carrito de compras
const buildCart = (array) => {
    badgeSet(array.length);
    $('#listaProductos').empty();
    $('#totalProductos').empty();
    for (const produtCart of array) {
        $('#listaProductos').append(`
        <tr>
        <td>${produtCart.name}</td>
        <td><button type="button" id="${produtCart.id}" class="btn btn-secondary btn-sm mx-2 btn-sub">-</button><input type="text" class="form-control-sm cantProducts" min="1" max="10" id="${produtCart.id}" aria-describedby="cantidadDeProductos" value=${produtCart.cant}><button type="button" id="${produtCart.id}" class="btn btn-secondary btn-sm mx-2 btn-add">+</button></td>
        <td>$${produtCart.total}</td>
        <td><button type="button" id="${produtCart.id}" class="btn btn-danger btn-sm mx-2 btn-delete">x</button></td>
        </tr>`);
    }
    $('.btn-delete').on('click', eliminarProducto);
    $('.btn-add').on('click', addCant);
    $('.btn-sub').on('click', subCant);
    totalCompra()
}

//cargando el total
const totalCompra = () => {
    $('#totalProductos').append(`<tr><th>Subtotal</th><th colspan =3 >$ ${subtotal}</th></tr>`);
};

//Mostrar aviso de producto añadido al  carrito 
const warningTextAddProduct = () => {
    $('#cartMensage').html('Se agrego el producto al carrito').addClass('alert-success').fadeIn(600).delay(600).fadeOut(600);
};


//Cargando el total
const FinalTotal = (price, unit) => {
    return price * unit;
};


//seteando productos en el carrito
const comprarProducto = (e) => {
    e.preventDefault();
    let idProducto = e.target.id;
    $('#btnsCarrito').removeClass('invisible')
    let selected = products.find(product => product.id == idProducto);
    if ((carrito.find(elemento => elemento.id == idProducto)) == undefined) {
        carrito.push(new CartProduct(selected.id, selected.name, selected.price, 1, selected.price))
        subtotal += FinalTotal(selected.price, 1)
    } else {
        let found = (carrito.findIndex(elemento => elemento.id == idProducto));
        carrito[found].agregarCantidad(1);
        carrito[found].priceTotal();
        subtotal += FinalTotal(carrito[found].price, 1)

    }
    buildCart(carrito);
    saveLocal('cartList', JSON.stringify(carrito));
};


// funcion para el change de los valores del carrito
const cambioDeCantidad = (e) => {
    console.log(e.target.value);
}



//vaciar el carrito
const vaciarCarrito = () => {
    $('#btnsCarrito').addClass('invisible');
    console.log(carrito.length);
    let carritoLength = carrito.length
    for (let i = 0; i < carritoLength; i++) {
        carrito.pop();
    }
    badgeSet(0);
    $('#totalProductos').empty();
    $('#totalProductos').append(`
        <tr><th colspan=3><spam class='subtitulo'>Su carrito esta vacio</spam></th></tr>
    `);
    $('#listaProductos').empty();
    localStorage.removeItem('cartList');
    subtotal = 0;
}


//Funcion para eliminar un producto del carrito
const eliminarProducto = (e) => {
    let productDeleted = carrito.findIndex(producto => producto.id == e.target.id);  
    console.log(carrito[productDeleted].total);
    subtotal = subtotal - carrito[productDeleted].total;
    totalCompra()
    carrito.splice(productDeleted,1);
    buildCart(carrito);
    if (carrito.length < 1){
        vaciarCarrito()
    }
    localStorage.setItem('cartList',JSON.stringify(carrito));
}
  //Funcion para agregar cantidad de un producto del carrito
  const addCant = (e) => {  
    let product = carrito.find(p => p.id == e.target.id);
    product.agregarCantidad(1)
    product.priceTotal();
    subtotal += FinalTotal(product.price, 1)
    buildCart(carrito);
    localStorage.setItem('cartList',JSON.stringify(carrito));  
  }
  //Funcion para restar cantidad de un producto del carrito
  const subCant = (e) => { 
    let product = carrito.find(p => p.id == e.target.id);
    if (product.cant > 1){
        product.agregarCantidad(-1)
        product.priceTotal();
        subtotal -= FinalTotal(product.price, 1)
        buildCart(carrito);
        localStorage.setItem('cartList',JSON.stringify(carrito));
    } else {
        console.log("eerorr");
        eliminarProducto(e);
    }
  }