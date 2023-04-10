const express = require('express')
const { ProductManager }  = require('./ProductManager.js')
const app = express()
const producto = new ProductManager('./Productos.json')

app.use(express.urlencoded({ extended: true }));


app.get('/products', async(request, response)=>{
    const prod = await producto.getProducts()
    const limit = request.query.limit
    if(!limit) return response.send(prod)
    response.send(prod.slice(0,limit))
})

app.get('/products/:pid', async(request, response)=>{
    const id = parseInt(request.params.pid)
    const prod = await producto.getProductById(id)
    if(!prod) return response.send({error: 'No se encuentra el producto'})
    response.send(prod)
})

app.listen(8050, () => {
    console.log('Escuchandpo el puerto 8050')})