import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { summary, getTasks } from "../../redux/reducers/reducer";
import Table from "../../components/table/table";
import Modal from "../../components/modal/modal";
import "./main.css";

const Main = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState('')
  const [toggle, setToggle] = useState(false);
  const [changeTable, setChangeTable] = useState("");

  useEffect(() => {
    setLoading(true)
    dispatch(summary())
    dispatch(getTasks())
    setLoading(false)
  }, [toggle]);

  const { taskData, taskDataArchive, taskDataSummary, category } = useSelector(
    (store) => store.reducer
  );
  const tables = [
    ["notes", taskData],
    ["archive", taskDataArchive],
    ["summary", taskDataSummary],
  ];
  return (
    <>
    {(loading) ? (<div>Loading...</div>):<div>
      <Modal
        taskData={taskData}
        category={category}
        changeTable={changeTable}
        setChangeTable={setChangeTable}
        toggle={toggle}
        setToggle={setToggle}
      />
      <div className="worksheet">
        {tables.map((table) => {
          return Object.keys(table[1]).length > 0 ? (
            <div key={table[0]}>
              <Table
                type={table[0]}
                table={table[1]}
                toggle={toggle}
                setToggle={setToggle}
                changeTable={changeTable}
                setChangeTable={setChangeTable}
              />
            </div>
          ) : (
            <div key={`${table[0]} field`}>
            <div className="nodata" key={`${table[0]} nodata`}>No Data in {table[0]}</div>
             {table[0]==='notes'&&
              <div key={`${table[0]} buttondiv`} className="tableAddButton">
               <button key={`${table[0]} button`} name="Add" onClick={() => {setChangeTable('adding')}}> + Add task</button>
               </div>}
            </div>
          );
        })}
      </div>
      </div>}
    </>
  );
};

export default Main;
