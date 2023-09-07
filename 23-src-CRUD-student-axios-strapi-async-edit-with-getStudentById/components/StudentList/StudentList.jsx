import React from 'react'
import Student from '../Student/Student'
import StudentForm from '../StudentForm/StudentForm'

export default function StudentList(props) {
    //console.log(props.stus)
  return (
       <div>
        <h2 className="studentlistTitle">Student List</h2>
        <table className="center">
          <thead>
            <tr>
              <td>Name</td>
              <td>Sex</td>
              <td>Age</td>
              <td>Address</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {  props.stus.length>0 &&  props.stus.map( stu=>{
                return <Student key={stu.id} stu={stu}/>
            })}

            {  
              props.stus.length===0 &&  <tr>There is no students</tr>
            }
           
          </tbody>
          <tfoot>
            <StudentForm/>
          </tfoot>
        </table>
    </div>)
  
}
