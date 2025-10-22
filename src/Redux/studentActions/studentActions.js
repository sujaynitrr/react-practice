export const addStudent =(student)=>{
    return{
        type:'ADD_STUDENT',
        payload:student
    }

}

export const deleteStudent = (id) => ({
  type: 'DELETE_STUDENT',
  payload: id,
});

export const editStudent = (student) => ({
  type: 'EDIT_STUDENT',
  payload: student,
});