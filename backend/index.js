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

app.post('/api/get',async (req,res)=>{
    console.log(req.body)
    await handleBook(req.body).then(c=>{
        res.send(c)
    }).catch(
        res.send("error")
    )
})

app.post('/api/find',async (req,res)=>{
    let[find,google]=await Promise.all([findBook(req.body),getGoogleBook(req.body.Author+" "+req.body.name)])
    google=JSON.parse(google)
    try{
        google=google["items"][0]["volumeInfo"]
        google={"title":google["title"],"author":google["authors"][0],"thumbnail":google["imageLinks"]["smallThumbnail"]}
    }catch{
        google={"title":"not found"}
    }
    
    console.log(find)
    console.log(google)
    res.send({"links":find,"google":google})
})




app.listen('3001','0.0.0.0',() => {
    console.log("started")
})