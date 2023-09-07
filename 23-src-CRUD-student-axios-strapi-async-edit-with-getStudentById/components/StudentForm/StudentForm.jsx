import React, {useRef, useContext, useEffect, useState} from 'react'
import StuContext from '../../store/studentContext'
import useFetch from '../../hooks/useFetch'
import axios from 'axios'

export default function StudentForm(props) {
    console.log('studentForm, id', props.id, props.onCancel)
    console.log('studentForm, stuData', props.stuData)
    

    const [inputData, setInputData] = useState({
        name: props.stuData? props.stuData.attributes?.name:'',
        age: props.stuData? props.stuData.attributes?.age:'',
        gender: props.stuData? props.stuData.attributes?.gender:'male',
        address: props.stuData? props.stuData.attributes?.address:''
    })

    const nameRef = useRef();
    const ageRef = useRef();
    const sexRef = useRef();
    const addrRef = useRef();

    const ctx = useContext(StuContext)

    const {data, fetchData:updateStu, isLoading, error} = useFetch(ctx.fetchData)



    const onUpdate=()=>{
        console.log('>>>>onUpdate', props.id)
        const dataObj = {
            name: nameRef.current.value,
            age: ageRef.current.value,
            gender: sexRef.current.value,
            address: addrRef.current.value
        }
        updateStu(dataObj, {
            method: props.id?'put':'post',
            url: props.id?`students/${props.id}`: 'students'
            }, 
            ctx.fetchData)
/*
        axios({
            method:'post',
            url:'http://localhost:1337/api/students',
            data: { data: dataObj }
        }).then( res =>{
            // console.log(res.data.meta)
            ctx.fetchData()
 
         }, err=>{
             console.log('error', err)
         })
         */
/*
        axios.post('http://localhost:1337/api/students', {data: dataObj}).then( res =>{
           // console.log(res.data.meta)
           ctx.fetchData()

        }, err=>{
            console.log('error', err)
        })'*/
    }




    return (
        <tr>
            <td>
                <input type="text" ref={nameRef} defaultValue={props.stuData?.attributes?.name} />
            </td>
            <td>
                <input type="number" ref={ageRef} min="0" max="100" defaultValue={props.stuData?.attributes?.age} />
            </td>

            <select defaultValue={props.stuData?.attributes?.gender}  ref={sexRef} >
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <td>
                <input type="text"  defaultValue={props.stuData?.attributes?.address} ref={addrRef}/>
            </td>

            <td>
                <button onClick={onUpdate}>{props.id?'Update': 'Add'}</button>
                { props.id && <button onClick={props.onCancel}>Cancel</button>}
            </td>
            
        </tr>
    )
}
