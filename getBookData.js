const axios=require('axios')
const {JSDOM}=require('jsdom')
require('dotenv').config()


async function getBookData(book){
    const response=await axios.get(`https://bookscouter.com/search?query=${book.Author.replace(/ /g,"+")}+${book.name.replace(/ /g,"+")}`)
    const {document}=new JSDOM(response.data).window
    let l=[]
    var test= document.getElementsByClassName('BookContainer_b1a7u5jm')
    var arr = Array.prototype.slice.call( test )
    arr.map(a=>{
        let name=a.getElementsByClassName("BookTitle_b1xw0hok")[0].innerHTML
        if(name.includes("<span class")){
        }
        let author=a.getElementsByClassName("BookText_b1ofiyxa")[0].innerHTML
        let isbn=a.getElementsByClassName("BookText_b1ofiyxa")[2].innerHTML
        l=l.concat({"name":name,"Author":author, "ISBN":isbn})
    })
    if(l[0]){
        return(l[0].ISBN)
    }else return 
    
}

async function getGoogleBook(book){
    let l=await getBookData(book)
    const key=process.env.KEY
    if(l){
        return await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${l}&key=${key}`)
    }else{
        return "not found"
    }
}

const test=(respose)=>{
    getGoogleBook(respose).then(respose=>console.log(respose.data.items[0]))
}

module.exports=getGoogleBook