import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux";

import { addTask } from "../../redux/reducers/reducer";
import './modal.css'
const Modal = ({ taskData, category, changeTable, setChangeTable, toggle, setToggle}) => {

  const [task, setTask] = useState('')

  useEffect(() => {
      changeTable !== "" && changeTable !== "adding"
      ? setTask(taskData[changeTable])
      : setTask({id: +new Date(), Name: "", Created: new Date(parseInt(+ new Date())).toLocaleDateString(), Category: "Task", Content: "",  Dates: ""})
  },[changeTable])

  const dispatch = useDispatch()

  const handleSubmit = (e, task) => {
    e.preventDefault()
    if (task.Name === '' || task.Content === '') {
      alert("Missing data")
    } else {
      dispatch(addTask(task));
      setChangeTable("");
      setToggle(!toggle);
    }

  }
  const handleChange = (e) => {
    setTask({...task, [e.target.name]: e.target.value})
  }
  return (
    <div className={(changeTable === '' ? "modal" : "modal active")}>
        <div className="modal__form">
          <input placeholder="Name" name="Name" maxLength="20" value={task.Name} onChange={(e) => {handleChange(e)}} className="modal__form__input" />
          <select name="Category" value={task.Category} onChange={(e) => {handleChange(e)}}>
            {category.map((cat)=>{
              return (
                <option key={cat} name={cat} >{cat}</option>
              )
            })}
          </select>
          <textarea name="Content" placeholder="Content" value={task.Content} className="modal__form__input" onChange={(e) => {handleChange(e)}}/>
          <div className="modal__form__buttonfield">
            <button type="button" onClick={(e) => {handleSubmit(e, task)}}>{changeTable !== '' && changeTable !== 'adding' ? "Save" : "Add"}</button>
            <button type="button" onClick={()=>{setChangeTable('')}} >Close</button>
          </div>
        </div>
    </div>
  );
}

export default Modal