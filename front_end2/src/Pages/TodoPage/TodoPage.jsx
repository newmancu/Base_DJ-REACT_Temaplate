
import { useContext, useEffect } from 'react'
import {authContext} from '../../App'
import './TodoPage.sass'

const TodoTask = (props) => {
  return (
    <div className="task__container">
      <input type="text" className="task__text" />
    </div>
  )
}


const TodoBox = (props) => {
  return (
    <div className="taskbox__container">
      <input type="text" className="taskbox__text" />
      {props.tasks.map((val, idx) => <TodoTask key={`${props.idx}-${idx}`} value={val}/>)}
    </div>
  )
}


export const TodoPage = () => {

  const context = useContext(authContext)
  useEffect( () => {
    async function do2(){
      let res = await fetch('/api/taskbox',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.localStorage.getItem('access')}`
        }
      })
      if (res.status === 401){
        const rres = await fetch('/api/token/refresh/',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({'refresh': window.localStorage.getItem('refresh')})
        })
        if (rres.ok) {
          Object.entries(await rres.json()).forEach(val => window.localStorage.setItem(...val))
          res = await fetch('/api/taskbox',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${window.localStorage.getItem('access')}`
            }
          })
        }
      }
      console.log(await res.json())
    }
    do2()
  }, [])
  return (
    <>
    
    </>
  )
}