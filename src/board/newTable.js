import React, { useState} from "react";
import "./board.css";

const NewTable = (props)=>{
    const [displayform, setDisplayform] = useState(false) 
   
    return(displayform ?
          <FormNewTable {...props} setDisplayform={setDisplayform} />
          :
          <div className="newTable">
            <button onClick={(e) => setDisplayform(true) } className="openForm">Nueva tabla</button>
          </div>
          )
  }
  const FormNewTable= ({tables, setTables,boardTitle,setMessage, redirect, setDisplayform, createTable})=>{
    const [errorMsg, setErrorMesg] = useState('')
    const addNewTable = (e) => {
      e.preventDefault();
      let title=e.target.titleTable.value
      if (title) {
        setErrorMesg('')
        if (tables.filter((t) => t.titleTable === title).length > 0) {
          setErrorMesg("ya existe una tabla con ese nombre");
          return;
        }
        createTable(
          title,
          tables,
          setTables,
          boardTitle,
          setMessage,
          redirect
        );
        setDisplayform(false)
      }
      else{
        setErrorMesg("Tiene que ingresar un nombre primero")
      }
    }
    return<div className="newTable">
    <form onSubmit={addNewTable}>
      <label>Titulo</label><br/>
      <input name="titleTable" type="text" className= {errorMsg ?"error":''}/>
      <button title="Crear tabla" type="submit" >+</button>
      <button title="Cancelar" onClick={() =>  setDisplayform(false)} >x</button><br/>
      { errorMsg && <label className="errorNewTable">{errorMsg}</label>}
    </form>
  </div>
  }
  export default NewTable