const express = require('express')
const prod = express()
const Joi = require('joi')
prod.use(express.json())
let categories = [
    {id:1, name:"fruitWaterDrinks"},
    {id:2, name:"baked"},
    {id:3, name:"milkProducts"}
]
let products = [
    {id:1, name:'Inyange', description:'drinking_juice', categoryID:1},
    {id:2, name:'urwibutso', description:'baked_doughs', categoryID:2},
    {id:3, name:'doughnuts', description:'baked_doughs', categoryID:2},
    {id:4, name:'Yoghurt', description:'transformed_milk', categoryID:3}
]
/* for products */
//get all products
prod.get('/api/products',(req,res)=>{
return  res.send(products)
})
//get product by id
prod.get('/api/products/:id',(req,res)=>{
let product = products.find(p => p.id == parseInt(req.params.id))
if(!product){
return res.status(401).send("product not found")
}
return res.send(product)
})
//add product
prod.post('/api/products',(req,res)=>{
    const schema = {
        name : Joi.string().min(4).max(30).required(),
        description: Joi.string().min(8).max(30).required(),
        categoryID: Joi.number().min(1).max(3).required()
    }
  const result = Joi.validate(req.body,schema)
  if(result.error){
      return res.status(401).send(result.error.details[0].message)
  }
  let product = {
      id:products.length+1,
      name: req.body.name,
    description: req.body.description,
      categoryID: req.body.categoryID
  }  
  products.push(product)
  return res.status(200).send(product)
  })
  //update product
 prod.put('/api/products',(req,res)=>{
    let product = products.find(c =>c.id === parseInt(req.body.id))
    if(!product){
     return res.status(404).send("product not found")
    }
    const schema = {
        id : Joi.number().required(),
        name : Joi.string().min(4).max(30).required(),
        description: Joi.string().min(8).max(30).required(),
        categoryID: Joi.number().min(1).max(3).required()
    }
    const result = Joi.validate(req.body,schema)
    if(result.error){
        return res.status(400).send(result.error.details[0].message)
    }
    product.name = req.body.name
    product.description = req.body.description
    product.categoryID = req.body.categoryID
    return res.status(201).send(product)
   })
   //delete product
   prod.delete('/api/products/:id',(req,res)=>{
    let product = products.find(p =>p.id === parseInt(req.params.id))
    if(!product) return res.status(404).send('product not found')
    const index  = products.indexOf(product);
    products.splice(index,1);
    res.send(products)
})
//select all oducts with the same category
prod.get('/api/products/categories/:categoryID',(req,res)=>{
    // res.setHeader('Content-Type', 'text/html');
for(let product of products){
    if(product.categoryID == req.params.categoryID){    
    console.log(product)
     res.write(JSON.stringify(product))
    }
}
res.end()
})
/*category */
//get all categories
prod.get('/api/categories',(req,res)=>{
    return  res.send(categories)
    })
    //get category by id
prod.get('/api/categories/:id',(req,res)=>{
let category = categories.find(c => c.id == parseInt(req.params.id))
if(!category){
 return res.status(401).send("category not found")
 }
return res.send(category)
})
//add category
prod.post('/api/categories',(req,res)=>{
    const schema = {
        name : Joi.string().min(4).max(30).required()
    }
  const result = Joi.validate(req.body,schema)
  if(result.error){
      return res.status(401).send(result.error.details[0].message)
  }
  let category = {
      id:products.length+1,
      name: req.body.name,
  }
  categories.push(category)
  return res.status(200).send(category)
  })
  //update category
 prod.put('/api/categories',(req,res)=>{
    let category = categories.find(c =>c.id === parseInt(req.body.id))
    if(!category){
     return res.status(404).send("category not found")
    }
    const schema = {
        id : Joi.number().required(),
        name : Joi.string().min(4).max(30).required()
    }
    const result = Joi.validate(req.body,schema)
    if(result.error){
        return res.status(400).send(result.error.details[0].message)
    }
    category.name = req.body.name
    return res.status(201).send(category)
   })
   //delete category
   prod.delete('/api/categories/:id',(req,res)=>{
    let category = categories.find(p =>p.id === parseInt(req.params.id))
    if(!category) return res.status(404).send('category not found')
    const index  = categories.indexOf(category);
    categories.splice(index,1);
    res.send(categories)
})
const port = 5000
prod.listen(port,function(){
    console.log(`Server running on port ${port}`)
})          