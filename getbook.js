const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs=require('fs');
const getGoogleBook = require('./getBookData');
const findBook=require('./getBookLinks')
const ID3Writer = require('browser-id3-writer')
const audio=require('./audio')

async function fetchBook(url){
    return fetch(url)

    
}


function setMeta(buff,bookData){
    let writer=new ID3Writer(buff)
    writer.setFrame('TALB',bookData.name).setFrame('TIT2',bookData.name).setFrame('TPE1',[bookData.Author])
    writer.addTag()
    tagged=Buffer.from(writer.arrayBuffer)
    return tagged
}

async function handleBook(book){
    console.log(book)
    let [bookData,booklist]=await Promise.all([getGoogleBook(book),findBook(book)]).catch(err=>console.log(err))
    if(booklist.length>0){
        bookData=bookData.data.items[0].volumeInfo
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