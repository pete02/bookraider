const Pic=(props)=>{
    if(!props.pic||props.pic===""){
  
    }else{
      return <img className="pic" src={props.pic} alt=""/>
    }
  }
export default Pic