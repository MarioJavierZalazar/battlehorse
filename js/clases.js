class Product {
    constructor(id, name, price, tag, picture) {
        this.id = id,
        this.name = name,
        this.price = price;
        this.tag = tag;
        this.picture = picture;
    }
    priceIva() { this.price *= 1.2 }
};

class CartProduct {
    constructor(id,name,price,cant,total){
        this.id = id;
        this.name = name;
        this.price = price;
        this.cant = cant;
        this.total = total;
    }

    priceTotal(){this.total = this.cant * this.price};
    agregarCantidad(valor){this.cant += valor};
};

