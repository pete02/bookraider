
const axios=require('axios')
const { json } = require('express')
const {JSDOM}=require('jsdom')


async function findFullAudiobook(book){
    console.log(`book: ${book.name}`)
    console.log(`https://fulllengthaudiobook.com/?s=${book.Author.replaceAll(/ /g,"+")}+${book.name.toLowerCase().replaceAll("the ","").replaceAll(/ /g,"+")}`)
    const response=await axios.get(`https://fulllengthaudiobook.com/?s=${book.Author.replaceAll(/ /g,"+")}+${book.name.toLowerCase().replaceAll("the ","").replaceAll(/ /g,"+")}` ,{ headers: { Accept: 'application/json', 'Accept-Encoding': 'identity' }, params: { trophies: true }})
    console.log("full"+response.status)
    if(response.status==200){
        const { document }=new JSDOM(response.data).window
        let articles=document.querySelectorAll("article")
        let links=[]
        for(lin of articles){
            links.push({"name":lin.querySelector("h2").querySelector("a").innerHTML,"link":lin.querySelector("h2").querySelector("a").href})
        }
        console.log("full done")
        return links
    }else{
        let h=`error, status ${response.status}`
        return {h:"link"}
    }
    
}


async function findGoldenAudiobook(book){
    //main/*/*/article/header/h2/a[contains(@rel, 'bookmark')]
    console.log(`https://goldenaudiobooks.com/?s=${book.Author.replaceAll(/ /g,"+")}+${book.name.toLowerCase().replaceAll("the ","").replaceAll(/ /g,"+")}`)
    let response=await axios.get(`https://goldenaudiobooks.com/?s=${book.Author.replaceAll(/ /g,"+")}+${book.name.toLowerCase().replaceAll("the ","").replaceAll(/ /g,"+")}`, { headers: { Accept: 'application/json', 'Accept-Encoding': 'identity' }, params: { trophies: true }})
    console.log("golder:"+response.status)
    if(response.status==200){
        const { document }=new JSDOM(response.data).window
        let articles=document.querySelectorAll("article")
        let links=[]
        for(article of articles){
            links.push({"name":article.querySelector("a").title,"link":article.querySelector("a").href})
        }
        console.log("golden done")
        return links    
    }else{
        let h=`error, status ${response.status}`
        return {h:"link"}
    }
    
}

async function findBook(book){
    let [fullAudio,goldenAudio]=await Promise.all([findFullAudiobook(book),findGoldenAudiobook(book)])
    js={"full":fullAudio,"golden":goldenAudio}

    return js

}
module.exports=findBook