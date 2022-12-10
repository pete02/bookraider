import { useState} from 'react'
import server from './services/find'
import Pic from './components/pic'
import Link from './components/link'
import transparent from './assets/lataus.png'



const App=()=> {
  const [name,setName]= useState("")
  const [writer,setWriter]=useState("")
  const [data,setData]=useState([transparent,"idle"])

  const handleName=(event)=>{
    setName(event.target.value)
  }
  const handleWriter=(event)=>{
    setWriter(event.target.value)
  }

  const handleFind=(event)=>{
    event.preventDefault()
    setData([transparent,"loading"])
    server.find({"name":name,"Author":writer}).then(res=>{
      console.log(res)
      if(res.data==="book not found"||res.data==="not found"){
        setData([transparent,"book not found"])
        console.log("book not found")
      }else{
      setData([res.data.thumbnail,res.data.resp])
    }
    }).catch(err=>console.log(err))
  }

  const handleGet=(event)=>{
    event.preventDefault()
    setData([data[0],"downloading"])
    console.log(`get ${JSON.stringify({"name":name,"Author":writer})}`)
    if(writer){
      server.get({"name":name,"Author":writer}).then(res=>setData([data[0],res.data]))
      .catch(err=>console.log(err))
    }else{
      server.get({"name":name,"Author":""}).then(res=>setData([data[0],res.data]))
      .catch(err=>console.log(err))
    }
  }
  return (
    <div className="App">
        <div>
          <img src={transparent} alt=""/>
        </div>
        <Pic pic={data[0]}/>
        <Link lin={data[1]}/>
        <div className='container'>
        <form className="form">
          <div>
          <input
          value={name}
          placeholder="name"
          onChange={handleName}
          /> <button onClick={handleFind}>find</button>
          </div>
          <div>
          <input
          value={writer}
          placeholder="writer"
          onChange={handleWriter}
          /> <button onClick={handleGet}>get</button>
          </div>
        </form>
         
          
        </div>
    </div>
  );
}

export default App;
