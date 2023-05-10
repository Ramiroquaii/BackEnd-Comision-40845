const products = [];

class productToMemory {

    getAllProduct = async () => {
        return products;
    };
    
    addSingleProduct = async (newProd) => {
        products.push(newProd);
        return newProd;
    };
    
    getProductId = async (id) => {
        const storedProd = products.find((prod) => prod.id === id);
        return storedProd;
    };
}

module.exports = { productToMemory };
