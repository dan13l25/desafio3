import express from "express"
import { ProductManager } from "./product.js"

const app = express()
const port = 8080

app.use(express.urlencoded({extended:true}))

const newProduct = new ProductManager();
const readNewProduct = newProduct.readProducts()

app.get("/products", async (req,res)=>{

    try {
        const limit = parseInt(req.query.limit);
        const products = await newProduct.readProducts();

        if (limit) {
            const limitedProducts = products.slice(0, limit);
            res.json({ products: limitedProducts });
        } else {
            res.json({ products });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error interno de servidor' });
    }
})

app.get("/products/:id", async (req,res)=>{
    const productId = parseInt(req.params.id)
    const everyProduct = await readNewProduct
    const productById = everyProduct.find(product => product.id == productId)
    res.send(productById)
})

app.listen(port, () =>{
    console.log("Servidor corriendo en el puerto", port)
})