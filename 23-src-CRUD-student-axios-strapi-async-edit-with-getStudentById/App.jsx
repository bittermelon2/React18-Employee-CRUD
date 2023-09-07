import React, { useEffect, useState } from 'react'
import useFetch from './hooks/useFetch'
import StudentList from './components/StudentList/StudentList'
import StuContext from './store/studentContext'
import './App.css'


export default function App() {
 
  const {stuData, isLoading, error, fetchData}=useFetch()

  useEffect(()=>{
     fetchData(null, {
      method: 'get',
      url: 'students'
    })
  }, [])

  const loadData = ()=>{
    fetchData(null, {
      method: 'get',
      url: 'students'
    })
  }
  return (
    <StuContext.Provider value={{fetchData}}>
      <div>
        <button onClick={loadData}>Load Data</button>
        {!isLoading && !error && <StudentList stus={stuData}/> }
        { isLoading && <h2>Data is loading!</h2>}
        { error && <h2>{error}</h2>}
      </div>
    </StuContext.Provider>

  )
}
