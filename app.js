import {promises as fs} from "fs"

class ProductManager {

    constructor() {
      this.path = "./productlist.json";
      this.products = []
    }
    static id= 0
  
    addProduct = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id += 1
    
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        };
        this.products.push(product)

        await fs.writeFile(this.path, JSON.stringify(this.products))

    }

    readProducts = async () => {
        try {
            let dataProduct = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(dataProduct);
        } catch (error) {
            console.error("Error al leer o parsear el archivo:", error.message);
            return [];
        }
    }

    getProduct = async () =>{
        let reply = await this.readProducts()
        return await console.log(reply)
    }

    getProductById = async (id) => {
        let getId = await this.readProducts();
        let filter = getId.find(product => product.id === id);
        console.log(filter);
    }
    
    deleteproductById = async (id) => {
        let erase = await this.readProducts();
        let productFiltered = erase.filter(products => products.id != id);
        await fs.writeFile(this.path, JSON.stringify(productFiltered));
        console.log("producto eliminado");
    }

    updateProduct = async ({ id, ...newProductData }) => {
        await this.deleteproductById(id);
        let oldProducts = await this.readProducts();
        let modifyProduct = [{ ...newProductData, id }, ...(oldProducts || [])]
        await fs.writeFile(this.path, JSON.stringify(modifyProduct))
    }
}

const newProduct = new ProductManager()

newProduct.addProduct("Batidora Peabody", "Batidora de pie con múltiples velocidades y accesorios intercambiables", 50700 , "Img", 13)
newProduct.addProduct("Lavadora samsung", "Lavadora de carga frontal con tecnología de ahorro de agua y energía", 130700 , "Img2", 24)
newProduct.addProduct("Heladera Whirlpool", "Refrigerador de dos puertas con dispensador de agua y hielo", 108470, "Img3", 6)
newProduct.addProduct("Aspiradora Dyson","Aspiradora sin bolsa con tecnología ciclónica para una potente succión", 76480, "Img4", 18)
newProduct.addProduct("Horno Microondas Panasonic", "Horno microondas con tecnología de cocción inteligente", 96500, "Img5",21)
newProduct.addProduct("Televisor Sony", "Televisor LED de 55 pulgadas", 130060, "Img6", 44)
newProduct.addProduct("Cafetera Nespresso", "Máquina de café con sistema de cápsulas para preparar café espresso", 68312, "Img7", 32)
newProduct.addProduct("Secadora LG", "Secadora de ropa con tecnología de secado rápido y eficiente", 88693, "Img8", 25)
newProduct.addProduct("Plancha de Vapor", "Plancha de vapor con tecnología antiadherente y sistema antigoteo", 64788, "Img9", 39)
newProduct.addProduct("Aire acondicionado Philco", "Aire acondicionado de alto rendimiento para el verano", 146351, "Img10", 58)



newProduct.addProduct()
newProduct.getProductById(2)