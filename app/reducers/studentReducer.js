import axios from 'axios';

// ACTIONS

const GET_STUDENTS = 'GET_STUDENTS';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const ADD_STUDENT = 'ADD_STUDENT';
const REMOVE_STUDENTS_FROM_CAMPUS = 'REMOVE_STUDENTS_FROM_CAMPUS';

// ACTION CREATORS

export const getStudents = (students) => {
  return {
    type: GET_STUDENTS,
    students: students,
  }
}

export const updateStudent = (student) => {
  return {
    type: UPDATE_STUDENT,
    student: student,
  }
}

export const removeStudent = (studentId) => {
  return {
    type: REMOVE_STUDENT,
    studentId: studentId,
  }
}

export const addStudent = (student) => {
  return {
    type: ADD_STUDENT,
    student: student,
  }
}

export const removeStudentsFromCampus = (campusId) => {
  return {
    type: REMOVE_STUDENTS_FROM_CAMPUS,
    campusId
  }
}

// REDUCERS

const studentReducer = function(students = [], action) {
  const newStudents = students.slice();

  switch (action.type) {

    case GET_STUDENTS:
      return action.students;

    case UPDATE_STUDENT:
      const indexToModify = newStudents.findIndex(student => {
        return student.id === action.student.id
      })

      newStudents[indexToModify] = action.student
      return newStudents;

    case REMOVE_STUDENT:
      const indexToDelete = newStudents.findIndex(student => {
        return student.id === action.studentId
      })
      return newStudents.slice(0, indexToDelete).concat(newStudents.slice(indexToDelete + 1))

    case ADD_STUDENT:
      return [...newStudents, action.student];

    case REMOVE_STUDENTS_FROM_CAMPUS:
      return newStudents.filter(student => student.campusId !== action.campusId)

    default:
      return students
  }

};

// THUNKS

export const fetchStudents = () => dispatch => {
    axios.get('/api/students')
    .then(res => res.data)
    .then(students => {
      dispatch(getStudents(students))
    })

}

export const putStudent = ({studentName, campusId, studentId}) => dispatch => {
    return axios.put(`/api/students/${studentId}`, {name: studentName, campusId: campusId})
    .then(res => res.data)
    .then(student => {
      dispatch(updateStudent(student))
    })
    .catch(console.error)

}

export const deleteStudent = (studentId) => dispatch => {
    return axios.delete(`/api/students/${studentId}`)
    .then(res => res.data)
    .then(studentId => {
      dispatch(removeStudent(studentId))
    })
    .catch(console.error)

}

export const postStudent = ({studentName, campusId, campusName}) => dispatch => {
    return axios.post('/api/students', {name: studentName, campusId, campusName})
    .then(res => res.data)
    .then(student => {
      dispatch(addStudent(student))
    })
    .catch(console.error)

}



export default studentReducer;
