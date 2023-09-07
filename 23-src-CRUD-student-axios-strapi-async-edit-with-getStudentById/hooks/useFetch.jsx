import React, {useState} from 'react'
import axios from 'axios'

//reqObj,
export default function useFetch() {

    const [stuData, setStuData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async (data, reqObj, cb)=>{
        setIsLoading(true)
        setError(null)

        try{
            let res = await axios({
                method: reqObj?.method?reqObj.method: 'get',
                url: 'http://localhost:1337/api/' + reqObj.url,
                data: data? {data: data}: null
            })
            setStuData(res.data.data)
            setError(null)
            cb && cb(null, {
                method: 'get',
                url: 'students'
            })
        } catch( e ){
            setError(e.message)
        } finally {
            setIsLoading(false)
        }


    }
/*
    const fetchData = (data, reqObj, cb)=>{
        setIsLoading(true)
        setError(null)
        axios({
            method: reqObj?.method?reqObj.method: 'get',
            url: 'http://localhost:1337/api/' + reqObj.url,
            data: data? {data: data}: null
        }).then(res=>{
             const result = res.data.data;
            //  console.log(' result', result)
            setStuData(res.data.data)
            setIsLoading(false)
            setError(null)
            cb && cb(null, {
                method: 'get',
                url: 'students'
            })
    
        }, error=>{
            console.log('*******, error', error)
            setError(error.message)
            setIsLoading(false)
        })

    }
    */
    return {stuData, isLoading, error, fetchData}


}
