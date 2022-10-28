const findBook=require('./getBookLinks')
const handleBook=require('./getbook')
const express=require('express')
const { response } = require('express')
const getGoogleBook = require('./getBookData')
const cors=require('cors')
const app=express()
const morgan=require('morgan')
const path=require('path')

const book={"name":"the scorch trials", "Author":"James Dashner"}



app.use(express.json())
app.use(cors())



morgan.token('body', req => {
    return JSON.stringify(req.body)
  })
  
  
app.use(morgan(':method :url :status - :response-time ms :body'))
  
app.use(express.static('build'))

app.post('/api/get',(req,res)=>{
    handleBook(req.body).then(response=>{
        res.send(response)
    })
})

app.post('/api/find',(req,res)=>{
    findBook(req.body).then(response=>{
        console.log(response)
        const lins=response
        getGoogleBook(req.body).then(resp=>{
            
            if(lins&&lins.length>0){
                if(resp.data.items[0].volumeInfo.imageLinks){
                    const json={"resp":response[0],"thumbnail":resp.data.items[0].volumeInfo.imageLinks.thumbnail}
                    
                    res.send(json)
                }else{
                    console.log(resp.data.items[0].volumeInfo)
                    res.send({"resp":response[0],"thumbnail":""})
                }
            }else res.send("not found")
        }).catch(err=>console.log(err))
    }).catch(err=>res.send("book not found"))
})




app.listen('3001','0.0.0.0',() => {
    console.log("started")
})