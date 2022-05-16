import { useCallback, useState } from 'react'
import { useRequest } from '../../Hooks/useRequest'
import { TodoBox } from '../../Components/TodoBox/TodoBox'
import { useBoxes } from '../../Hooks/useBoxes'
import jwt_decode from 'jwt-decode'

import './IndexPage.sass'

export const IndexPage = () => {
  const {register, logIn, logout, requestWithAuth} = useRequest()
  const {getBoxes} = useBoxes()
  const [username, setUsername] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [boxName, setBoxName] = useState('')
  const [boxColor, setBoxColor] = useState('')
  const [p, setP] = useState('')
  const [boxes, setBoxes] = useState([])

  const createBox = useCallback(() => {
    const data = {
      color:boxColor,
      text:boxName, 
      // id: data.id
    }


    const token = jwt_decode(window.localStorage.getItem('access'))

    requestWithAuth('/api/box/', 'POST', {}, {
      author: token['user_id'],
      box_name: data.text,
      color: data.color
    })
    const cBox = <TodoBox data={data} key={boxes.length} />
    setBoxes([...boxes, cBox])

  }, [boxes, boxName, boxColor, requestWithAuth])
  
  const getTodo = useCallback(async () => {
    const res = await requestWithAuth('/api/taskbox', 'GET')
    const data = await res.json()
    console.log(data)
    return data
  }, [requestWithAuth])


  return (
    <>
    <div className="fields">
      <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
      <input type="password" value={password1} onChange={e => setPassword1(e.target.value)}/>
      <input type="password" value={password2} onChange={e => setPassword2(e.target.value)}/>
    </div>

    <div className="fields fields-btn">
      <button onClick={() => {logIn(username, password1)}}>login</button>    
      <button onClick={() => {register(username, password1, password2)}}>Regiset</button>    
      <button onClick={() => {logout()}}>logout</button>    
    </div>

    <div className="fields">
      <button onClick={async () => {setP(await getTodo())}}>Get Task Box</button>
    </div>
 
    <div className="fields">
      <div className="input">
        <p>Name</p>
        <input type="text" value={boxName} onChange={e => setBoxName(e.target.value)}/>
      </div>
      <div className="input">
        <p>Color</p>
        <input type="text" value={boxColor} onChange={e => setBoxColor(e.target.value)}/>
      </div>
      <div className="fields fields-btn">
        <button onClick={() => {createBox()}}>Create Box</button>
        <button onClick={async () => {setBoxes(await getBoxes())}}>Get Boxex</button>
      </div>
    </div>

    <div className="boxes fields">
      {boxes.map((val) => val)}
    </div>

    <p className="json">
      {JSON.stringify(p)}
    </p>

    </>
  )
}