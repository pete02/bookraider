
const axios=require('axios')
const {JSDOM}=require('jsdom')


async function findFullAudiobook(book){
    console.log(`book${book.name}`)
    console.log(book.name.toLowerCase().replaceAll("the ","").replaceAll(/ /g,"+"))
    const response=await axios.get(`https://fulllengthaudiobooks.com/?s=${book.Author.replaceAll(/ /g,"+")}+${book.name.toLowerCase().replaceAll("the ","").replaceAll(/ /g,"+")}`)
    const { document }=new JSDOM(response.data).window
    let l=document.querySelectorAll("a")
    let arr=Array.prototype.slice.call( l )
    arr=arr.filter(a=>a.innerHTML.toLowerCase().replaceAll("%20","").replaceAll("-","").includes(book.name.toLowerCase().replaceAll("the ","").replaceAll(" ",""))&&a.innerHTML.toLowerCase().includes("mp3"))
    arr=arr.map(a=>a.innerHTML)
    let mp3arr=arr.map(a=>a.split("/")[a.split("/").length-1])
    arr=arr.filter((a,i)=> mp3arr.indexOf(a.split("/")[a.split("/").length-1])==i)
    return arr
}


async function findGoldenAudiobook(book){
    console.log(`https://goldenaudiobooks.com/?s=${book.Author.replaceAll(/ /g,"+")}+${book.name.toLowerCase().replaceAll("the ","").replaceAll(/ /g,"+")}`)
    let response=await axios.get(`https://goldenaudiobooks.com/?s=${book.Author.replaceAll(/ /g,"+")}+${book.name.toLowerCase().replaceAll("the ","").replaceAll(/ /g,"+")}`)
    let document=new JSDOM(response.data).window
    let l=document.document.querySelectorAll("a")
    let arr=Array.prototype.slice.call( l )
    arr=arr.filter(a=>a.href.toLowerCase().replaceAll(/ /g,"").replaceAll(/-/g,"").includes(book.name.toLowerCase().replaceAll("the ","").replaceAll(" ","")))
    console.log(arr)
    if(arr[0]!='about:blank#content'&& arr[0]){
        response=await axios.get(arr[0])
        document= new JSDOM(response.data).window
        l=document.document.querySelectorAll("a")
        arr=Array.prototype.slice.call( l )
        arr=arr.map(a=>a.innerHTML)
        arr=arr.filter(a=>a.includes('.mp3'))
        return arr
    }
    else return []
}

async function findBook(book){
    let arr=await findFullAudiobook(book)

    if(arr.length<1){
        arr=await findGoldenAudiobook(book)
    }
    return arr

}
module.exports=findBook