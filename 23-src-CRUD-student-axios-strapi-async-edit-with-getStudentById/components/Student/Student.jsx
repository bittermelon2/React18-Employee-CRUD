import React, {useContext, useEffect, useState} from 'react'
import StudentForm from '../StudentForm/StudentForm'
import useFetch from '../../hooks/useFetch'
import StuContext from '../../store/studentContext'
import axios from 'axios'

export default function Student(props) {
    const [stuInfo, setStuInfo] = useState({
        id:'',
        name:'',
        age:'',
        gender:'',
        address: ''
    })


    //console.log(props.stu)
    const [isEdit, setIsEdit] = useState(false)
    const {id, attributes: {name, age, gender, address}} = props.stu
    const ctx = useContext(StuContext)


    useEffect(()=>{
        // console.log('useEffect in Student: ', name, age, gender, address)
        setStuInfo({id, name, age, gender, address})
    },[])


    
    const { fetchData:delStu} = useFetch();

    //????
    const {stuData, fetchData:getStuById} = useFetch()




    if(stuData?.name){
        console.log('stuData name', stuData.name)
    }
    // rowData={
    //     name:'',
    //     age:'',
    //     gender:'',
    //     address: ''
    // }

    const onDelete = ()=>{
        console.log('student id', props.id)
        delStu(null, {
                method:'delete',
                url:`students/${stuInfo.id}`
            },
            ctx.fetchData
        )

        // axios({
        //     method:'delete',
        //     url:`http://localhost:1337/api/students/${id}`
        // }).then( res =>{
        //     // console.log(res.data.meta)
        //     ctx.fetchData()
 
        //  }, err=>{
        //      console.log('error', err)
        //  })
        
    }

    const onEdit = ()=>{
        setIsEdit(true)
        console.log('^^^^^^^^^^^^getStuById', id)

        getStuById(null, {
                method: 'get',
                url: `students/${stuInfo.id}`
            }
        )
    }

    const onCancel =()=>{
        setIsEdit(false)
    }

    return (
      <>
        {
            !isEdit && (
                <tr>
                <td>{stuInfo.id}  {stuInfo.name}</td>
                <td>{stuInfo.age}</td>
                <td>{stuInfo.gender}</td>
                <td>{stuInfo.address}</td>
                <td>
                    <button onClick={onEdit}>Edit</button> 
                    <button onClick={onDelete}>Del</button>
                </td>
                </tr>
            )
        }

        { isEdit && <StudentForm id={id} stuData={stuData} onCancel={onCancel}/>}
      </>
    )
}
