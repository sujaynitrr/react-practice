const initialState = {
  loading: false,
  students: [],
  error: null,
};

const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';




const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUDENT:
      return { ...state, students: [action.payload, ...state.students] };

    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter((stu) => stu.id !== action.payload),
      };

    case EDIT_STUDENT:
      return {
        ...state,
        students: state.students.map((stu) =>
          stu.id === action.payload.id ? action.payload : stu
        ),
      };

    default:
      return state;
  }
};

export default studentReducer;
