import http from "http"
import express from "express"
import { ProductManager } from "./product.js"

const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))

const newProduct = new ProductManager();
const readNewProduct = newProduct.readProducts()

console.log(await readNewProduct)

app.get("/products", (req,res)=>{

})