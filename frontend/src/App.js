import logo from './logo.svg';
import './App.css';
import 'axios'
import axios from 'axios';
import { useState } from 'react';


async function get(name,Author){
  
  console.log("run")
  let res=await axios.post("/api/find",{"name":name,"Author":Author})
  return res.data
}

function App() {
  let [fulldata,setFullData]=useState([])
  let [goldendata,setGoldetData]=useState([])
  let [text,setText]=useState("Learn React")
  let [name,setName]=useState("")
  let [book,SetBook]=useState("")
  let [author,setAthor]=useState("")
  let [state,setState]=useState("")


  const handle=async ()=>{
    setState("searching for books")
    setFullData([])
    setGoldetData([])
    let res=await get(name,author)
    setState("book found")
    SetBook(res["google"])
    setFullData(res["links"]["full"])
    setGoldetData(res["links"]["golden"])

  }


  const handleget=(link,name)=>{
    setState("getting book")
    axios.post("/api/get",{"link":link,"book":name}).then(res=>{
      setState(res.data)
    })
  }
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handle()
      console.log("pressed")
    }
  };

  const changename=(event)=>{
    setName(event.target.value)
  }
  const changeauth=(event)=>{
    setAthor(event.target.value)
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <table>
          <tbody>
            <tr>
              <td>
              {fulldata.map((i) => {
                if(fulldata.indexOf(i)===0){
                  return(
                    <div key={i.name+"fd1"}>
                      <div>fulllengthaudiobook</div>
                      <div key={i.name+"f"}>
                        <a key={i.link} href={i.link}>{i.name}</a>
                        <button key={i.name+"pf"} onClick={()=>{handleget(i.link,i.name)}}>get</button></div>
                    </div>
                  )
                }else{
                  return(
                  <div key={i.name+"f"}>
                    <a key={i.link} href={i.link}>{i.name}</a>
                    <button key={i.name+"pf"} onClick={()=>{handleget(i.link,i.name)}}>get</button>
                    </div>
                )
                }
              })}
            </td>
              {goldendata.map((i)=>{
                if(goldendata.indexOf(i)===0){
                  return(
                    <div>
                      <div>goldenaudiobooks</div>
                      <div key={i.name+"g"}>
                        <a key={i.link} href={i.link}>{i.name}</a>
                        <button key={i.name+"pf"} onClick={()=>{handleget(i.link,i.name)}}>get</button></div>
                    </div>
                  )
                }else{
                  return(<div key={i.name+"g"}>
                    <a href={i.link} key={i.link}>{i.name}</a>
                    <button key={i.name+"pf"} onClick={()=>{handleget(i.link,i.name)}}>get</button>
                    </div>)
                }
              })}
            </tr>
          </tbody>
        </table>
        
        <table>
          <tr>
            <td>
            <input value={name} placeholder={"book name"} onChange={changename} onKeyDown={handleKeyDown}/>
            </td>
            <td>
            <button type="button"onClick={handle}>find</button>
            </td>
          </tr>
            <tr>
              <td>
              <input value={author} placeholder={"author"} onChange={changeauth}/>
              </td>
            </tr>
        </table>
        <div>{state}</div>
      </header>
    </div>
  );
}

export default App;
