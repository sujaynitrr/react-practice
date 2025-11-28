// import React,{useState} from 'react';
// const TodoList=()=>{
//   const[todo,setTodo]=useState('');
//   const[todoList,setTodoList]= useState([]);
//   const[editId,setEditId]=useState(null);

//   const addTodoHandler = () => {
//     if (!todo.trim()) return; // Don't add empty todos

//     if (editId !== null) {
//       // Edit existing todo
//       const updatedTodos = todoList.map(item => 
//         item.id === editId ? { ...item, task: todo } : item
//       );
//       setTodoList(updatedTodos);
//       setEditId(null);
//     } else {
//       // Add new todo
//       const newTodo = {
//         id: Date.now(), // Use timestamp for unique ID
//         task: todo,
//         isComplete: false
//       };
//       setTodoList([...todoList, newTodo]);
//     }
//     setTodo('');
//   }

//   const deleteHandler=(id)=>{
//     const filterData = todoList.filter((item)=>item.id!=id);
//     setTodoList(filterData);

//   }

//   const completeHandler=(id)=>{
//     const completeTask= todoList.map((item)=>item.id ===id?{...item,isComplete:!item.isComplete}:item);
//     setTodoList(completeTask)

//   }

//   const editHandler=(id)=>{
//     const editItem = todoList.find((item)=>item.id ===id);
//     console.log(editItem);
//     setTodo(editItem.task);
//     setEditId(id);


//   }



//   return(
//     <div>
//       <h5>Please add your todo</h5>
//       <input 
//         placeholder="Please enter your todo" 
//         onChange={(e) => setTodo(e.target.value)} 
//         value={todo}
//         data-testid="todo-input"
//       />
//       <button onClick={addTodoHandler}>Add</button>
//       <ul data-testid="todo-list">
//         {todoList.map((todoItem) => (
//           <li 
//             key={todoItem.id}
//             style={{textDecoration: todoItem.isComplete ? 'underline' : 'none'}}
//             data-testid={`todo-item-${todoItem.id}`}
//           >
//             {todoItem.task}
//             <button onClick={() => deleteHandler(todoItem.id)}>Delete</button>
//             <button onClick={() => completeHandler(todoItem.id)}>
//               {todoItem.isComplete ? 'Undo' : 'Complete'}
//             </button>
//             <button onClick={() => editHandler(todoItem.id)}>Edit</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default TodoList;
import React, { useState } from "react";
const TodoList =()=>{
  const[todo,setTodo]=useState('');
  const[todoList,setTodoList]=useState([]);
  const[isEdit,setIsEdit]=useState(false);
  const[editIndex,setEditIndex]=useState(null);

  const addTodos=()=>{
    if(editIndex!==null){
      const updatedTodo= todoList.map((todo)=>todo.id === editIndex ?{...todo,text:todo}:todo);
     setTodoList(updatedTodo);
      setEditIndex(null);
      setIsEdit(false);
      setTodo("");
      return; 


    }
    const task={
      text:todo,
      isComplete:false,
      id:parseInt(Math.random()*100)
    }
    setTodoList([...todoList,task]);
    setTodo('');

  }

  const deleteHandler=(id)=>{
    console.log(id);
    const deleteData= todoList.filter((data)=>data.id!=id);
    setTodoList(deleteData)

  }

  const completeHandler=(id)=>{
    const completedTask= todoList.map((task)=>task.id ===id ?{...task,isComplete:!task.isComplete}:{task});
    setTodoList(completedTask)

  }

  const editHandler=(id)=>{
    const editItem = todoList.find((item)=>item.id ===id);
    setTodo(editItem.text)
    setIsEdit(true);
    setEditIndex(id);

  }
  return(
    <>
      <input placeholder="Please add todo here" onChange={(e)=>setTodo(e.target.value)} value={todo}/>
      <button onClick={addTodos}>{isEdit?'Update':'Add'}</button>
      <h2>TodoList</h2>
      <ul>
        {
          todoList.map((todo)=>(
            <>
              <li key={todo.id} style={{ textDecoration: todo.isComplete ? "line-through" : "none" }}>
                {todo.text}
                <button onClick={()=>editHandler(todo.id)}>Edit</button>
                <button onClick={()=>deleteHandler(todo.id)}>Delete</button>
                <button onClick={()=>completeHandler(todo.id)}> Complete</button>

              </li>
              
            </>
            
              

            
          ))
        }

      </ul>
     
    </>
  )
}

export default TodoList;