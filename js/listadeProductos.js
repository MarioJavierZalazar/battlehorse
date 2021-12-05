let listaDeProductos = document.getElementById('listaDeProductos');

class Product {
    constructor(id, name, price, stock, tag, picture) {
        this.id = id,
        this.name = name,
        this.price = price;
        this.stock = stock;
        this.tag = tag;
        this.picture = picture;
    }
    priceIva() { this.price *= 1.2 }
};
//Creando Objetos
const products = [
    new Product(1, 'Soviet Starter Army', 130, 5, ['warlord', 'modelos'], '../img/tinda/sovieticosStarted2.jpg'),
    new Product(2, 'Astra Militarum', 90, 10, ['games workshop', 'modelos'], '../img/tinda/cadiaStarted2.jpg'),
    new Product(3, 'Chaos Space Marines', 95, 10, ['games workshop', 'modelos'], '../img/tinda/chaosStaretd2.jpg'),
    new Product(4, 'Necrons: Warriors + Paints Set', 30, 10, ['games workshop', 'modelos', 'pintura'], '../img/tinda/citadel.jpg'),
    new Product(5, 'Stormcast Eternals Vindictors + Paints Set', 30, 10, ['games workshop', 'modelos', 'pintura'], '../img/tinda/citadel2.jpg'),
    new Product(6, 'Battlezone: Manufactorum Battlefield', 50, 5, ['games workshop', 'modelos'], '../img/tinda/battlefield.jpg'),
    new Product(7, 'The Walking Dead: All Out War', 65, 5, ['mantic', 'modelos'], '../img/tinda/thewalkingdeadStareted.jpeg'),
    new Product(8, 'Ratkin Army', 90, 7, ['mantic', 'modelos'], '../img/tinda/ratkingStarted2.jpg'),
    new Product(9, 'Rust, Stain & Streaking', 40, 15, ['vallejo', 'pintura'], '../img/tinda/vallejoPinturas.jpg')
];


for (const product of products) {
    let divProducto = document.createElement('div');
    divProducto.classList.add('card', 'col-4', 'm-3');
    divProducto.style.width = '18rem';
    divProducto.innerHTML = `<img src="${product.picture}" class="card-img-top img-fluid" loading="lazy" alt="${product.name}"><div class ="card-body"><h5 class ="card-title">${product.name}</h5><h5 class ="card-title subtitulo" style="min-height: 50px">$ ${product.price}</h5><button type ="button" class ="btn boton">Añadir al carrito</button></div>`;
    listaDeProductos.appendChild(divProducto);
}