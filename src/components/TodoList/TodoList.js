import React,{useState} from 'react';
const TodoList=()=>{
  const[todo,setTodo]=useState('');
  const[todoList,setTodoList]= useState([]);
  const[editId,setEditId]=useState(null);

  const addTodoHandler=()=>{
    const newTodo={
     id: Math.floor(Math.random() * 10),

      task:todo,
      isComplete:false
    }
    setTodoList([...todoList,newTodo]);
    setTodo('')
    console.log(todoList)

  }

  const deleteHandler=(id)=>{
    const filterData = todoList.filter((item)=>item.id!=id);
    setTodoList(filterData);

  }

  const completeHandler=(id)=>{
    const completeTask= todoList.map((item)=>item.id ===id?{...item,isComplete:!item.isComplete}:item);
    setTodoList(completeTask)

  }

  const editHandler=(id)=>{
    const editItem = todoList.find((item)=>item.id ===id);
    console.log(editItem);
    setTodo(editItem.task);
    setEditId(id);


  }



  return(
    <>
      <h5>Please add your todo</h5>
      <input placeholder="Please enter your todo" onChange={(e)=>setTodo(e.target.value)} value={todo}/>
      <button onClick={addTodoHandler}>Add</button>
      <ul>
        
          {todoList.map((todo)=>{
            return(
              <>
              <li style={{textDecoration:todo.isComplete?'underline':'none'}} key={todo.id} >
                {todo.task}
                <button onClick={()=>deleteHandler(todo.id)}>Delete</button>
                <button onClick={()=>completeHandler(todo.id)}>Complete</button>
                <button onClick={()=>editHandler(todo.id)}>Edit</button>

              </li>
              
              </>
            )
          })}
        
      </ul>
    </>
  )
}

export default TodoList;