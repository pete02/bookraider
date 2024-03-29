const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs=require('fs');
const getGoogleBook = require('./getBookData');
const ID3Writer = require('browser-id3-writer')
const audio=require('./audio')
const sharp =require( 'sharp')
const axios=require('axios')
var http = require('http'),                                                
 Stream = require('stream').Transform     
 const {JSDOM}=require('jsdom');                             
const { execPath } = require('process');


async function fetchBook(url){
    return fetch(url)

    
}


function setMeta(buff,bookData){
    try{
        let writer=new ID3Writer(buff)
        if(bookData.name&&bookData.name!==''){
            writer.setFrame('TALB',bookData.name).setFrame('TIT2',bookData.name)
        }
        if(bookData.title&&bookData.title!==''){
            writer.setFrame('TALB',bookData.title).setFrame('TIT2',bookData.title)
        }
        if(bookData.Author&&bookData.Author!==''){
            writer.setFrame('TALB',bookData.Author)
        }
        writer.addTag()
        tagged=Buffer.from(writer.arrayBuffer)
        return tagged
    }catch{
        console.log("error")
    }
    
}

async function getBookList(link){
    let list=[]
    let res= await axios.get(link ,{ headers: { Accept: 'application/json', 'Accept-Encoding': 'identity' }, params: { trophies: true }})
    if(res.status){
        const { document }=new JSDOM(res.data).window
        let nlist= document.querySelectorAll("a")
        
        for(n of nlist){
            list.push(n.getAttribute("href"))
        }
        console.log(list.length)
        
        list2=list.filter(a=>a.includes(link))
        
        for(lin of list2){
            let res= await axios.get(lin ,{ headers: { Accept: 'application/json', 'Accept-Encoding': 'identity' }, params: { trophies: true }})
            if(res.status){
                const { document }=new JSDOM(res.data).window
                let nlist= document.querySelectorAll("a")

                for(n of nlist){
                    list.push(n.getAttribute("href"))
                }
        }
        
        
        
        }
    }
    list=list.filter(a=>a.includes(".mp3"))
    return list
}

async function handleBook(book){
    let name=book.book.toLowerCase()
    if(name.includes("audiobook")){
        name=name.substring(0,name.indexOf("audiobook"))
    }
    if(name.includes("audibook")){
        name=name.substring(0,name.indexOf("audibook"))
    }
    if(name.includes("audio book")){
        name=name.substring(0,name.indexOf("audio book"))
    }
    console.log(name)
    let [booklist,bookData]=await Promise.all([getBookList(book.link),getGoogleBook(name)])
    console.log(booklist)
    console.log(bookData)
    if(booklist.length>0){
        bookData=JSON.parse(bookData).items[0].volumeInfo
        if(bookData.title&&bookData.title!==""){
            book.name=bookData.title
        }
        console.log(bookData)
        booklist=await Promise.all(booklist.map(a => {
            console.log(a)
            return fetchBook(a)
        })).catch(err=>console.log(err))
        let i=0
        console.log("fetched audios")
        console.log(bookData.authors[0])
        book.Author=bookData.authors[0]
        var dir = `/mp3/temp/${bookData.authors[0]}/${book.name}`;
        if (!fs.existsSync()){
            fs.mkdirSync(dir, { recursive: true });
        }
        var dir2 = `/mp3/ready/${bookData.authors[0]}/${book.name}/`;
        if (!fs.existsSync()){
            fs.mkdirSync(dir2, { recursive: true });
        }
        try{
            const res = await axios.get(bookData.imageLinks.thumbnail, { responseType: "arraybuffer" });
            await fs.promises.writeFile(`/${dir2}Cover.jpg`, res.data);
        }catch{
            console.log("couldn't create thumbnail")
        }
        

        booklist=await Promise.all(booklist.map(a=>a.buffer()))
        let list=[]
        booklist.forEach(element => {
            i+=1
            list.push(`${dir}/${i}.mp3`)
            fs.writeFileSync(`${dir}/${i}.mp3`,setMeta(element,book))
        });
        audio(list,book,bookData)
        return("book saved")
    }else{
        return("book not found")
    }

}

module.exports=handleBook