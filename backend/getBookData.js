const axios=require('axios')
const {JSDOM}=require('jsdom')
require('dotenv').config()


async function getBookData(book){
    const response=await axios.get(`https://bookscouter.com/search?query=${book.Author.replace(/ /g,"+")}+${book.name.replace(/ /g,"+")}`,{ headers: { Accept: 'application/json', 'Accept-Encoding': 'identity' }, params: { trophies: true }})
    const {document}=new JSDOM(response.data).window
    let l=[]
    var test= document.getElementsByClassName('BookContainer_b1a7u5jm')
    var arr = Array.prototype.slice.call( test )
    arr.map(a=>{
        let name=a.getElementsByClassName("BookTitle_b1xw0hok")[0].innerHTML
        if(name.includes("<span class")){
            name=name.split('">')[1]
            name=name.split('<')[0]
        }
        let author=a.getElementsByClassName("BookText_b1ofiyxa")[0].innerHTML
        let isbn=a.getElementsByClassName("BookText_b1ofiyxa")[2].innerHTML
        l=l.concat({"name":name,"Author":author, "ISBN":isbn})
    })
    if(l[0]){
        return(l[0])
    }else return 
    
}

async function getGoogleBook(book){
    let l=await getBookData(book)
    console.log(l)
    const key=process.env.KEY
    if(l){
        console.log(`https://www.googleapis.com/books/v1/volumes?q=isbn:${l.ISBN}&key=${key}`)
        let res= await (await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${l.ISBN}&key=${key}&langRestrict:en`)).text()
        if(JSON.parse(res)["totalItems"]==0){
            console.log(`https://www.googleapis.com/books/v1/volumes?q=intitle:${l.name}&inauthor=${l.author}&key=${key}&langRestrict:en`)
            res= await (await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${l.name}&inauthor=${l.author}&key=${key}&langRestrict:en`)).text()
        }
        return res
        
    }else{
        return "not found"
    }
}

const test=(respose)=>{
    getGoogleBook(respose).then(respose=>console.log(respose.data.items[0]))
}

module.exports=getGoogleBook