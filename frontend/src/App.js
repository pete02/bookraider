import logo from './logo.svg';
import './App.css';
import 'axios'
import axios from 'axios';
import { useState } from 'react';


async function test(){
  console.log("run")
  let res=await axios.post("http://localhost:3001/api/find",{"name":"scorch trials","Author":""})
  return res.data
}

function App() {
  let [text,setText]=useState("Learn React")
  const handle=async ()=>{
    let res=await test()
    setText(JSON.stringify(res))
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button type="button" onClick={handle}>test</button>
        {text}
      </header>
    </div>
  );
}

export default App;
