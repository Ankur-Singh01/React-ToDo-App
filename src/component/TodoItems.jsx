import React, { useState, useEffect } from "react";
import "./TodoItems.css";

//LocalStorage GetData
const getlocalItems = () => {
  let list = localStorage.getItem("lists");

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const TodoItems = () => {
  const [inputData, setInputData] = useState("");
  const [saveData, setSaveData] = useState(getlocalItems());
  const [toggleSubmit, settoggleSubmit] = useState(true);
  const [editedItem, setediteditem] = useState(null);


  const inputKeyDown = (event) => {
    if (event.keyCode === 13) addItem();
};


  const addItem = () => {
    if (!inputData) {
      alert("Please Enter Some Data");
    } else if (inputData && !toggleSubmit) {
      setSaveData(
        saveData.map((elem) => {
          if (elem.id === editedItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      settoggleSubmit(true);

      setInputData("");

      setediteditem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
        completed: false
      };
      setSaveData([...saveData, allInputData]);

      setInputData("");
    }
  };

//   const trim = ((e)=>{

//     const targetValue = e.target.value;
//     if (targetValue.replace(/\s/g, "").length <=0){
//     alert("White Spaces Not Allowed");
//     return false;
// }    
//     setInputData(targetValue);
//   })


// const trim = ((e)=>{

//     e.target.value = e.target.value.trim();
//     setInputData(e.target.value);
//   })


  // handle checkbox
  const handleCheckbox=(ID)=>{
    let todoArray=[];
    saveData.forEach((todo)=>{
      if(todo.id===ID){
        if(todo.completed===false){
          todo.completed=true;
        }
        else if(todo.completed===true){
          todo.completed=false;
        }
      }
      todoArray.push(todo);
      // console.log(todoArray);
      setSaveData(todoArray);
    })
  }

  //Edit Data

  const editItem = (id) => {
    let newEditItems = saveData.find((element) => {
      return element.id === id;
      
    });
    //console.log(newEditItems);

    settoggleSubmit(false);

    setInputData(newEditItems.name);

    setediteditem(id);
  };

  ///Delete Data

  const deleteItem = (index) => {
    const finalData = saveData.filter((valueI) => {
      return index !== valueI.id;
    });

    setSaveData(finalData);
  };

  //Clear All
  const allClear = () => {
    setSaveData([]);
  };

  //LocalStorage SetData
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(saveData));
  }, [saveData]);

  return (
    <>
      <div className="container">
        <header>
          <h1>To-Do List</h1>
          <div id="new-task-form">
            <input
              id="new-task-input"
              type="text"
              onKeyDown={inputKeyDown}
              placeholder="Enter Your List...."
              value={inputData}
              //onChange={trim}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleSubmit ? (
              <button id="new-task-submit" onClick={addItem}>
                Add Task
              </button>
            ) : (
              <button id="new-task-submit" onClick={addItem}>
                Update Task
              </button>
            )}
          </div>
        </header>

        {saveData.map((itemData) => {
          return (
            <div className="main" key={itemData.id}>
              <div className="task-list">
                <div id="tasks">
                    
                  <div className="task">
                  <input type='checkbox' className="checkBox" checked={itemData.completed}
                        onChange={()=>handleCheckbox(itemData.id)}/>
<div className="content">
                        <span
                      style={itemData.completed===true?{textDecoration:'line-through'}:{textDecoration:'none'}}><h3 className="text" >{itemData.name}</h3> </span> 
                      </div>

                    {/* <div className="content">
                      <h3 className="text" >{itemData.name}</h3>
                    </div> */}
                    <div className="actions">
                        
                      <button
                        className="edit"
                        onClick={() => {
                          editItem(itemData.id);
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        className="delete"
                        onClick={() => {
                          deleteItem(itemData.id);
                        }}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {
          <button id="new-task-submit" onClick={allClear}>
            ClearData
          </button>
        }
      </div>
    </>
  );
};

export default TodoItems;
