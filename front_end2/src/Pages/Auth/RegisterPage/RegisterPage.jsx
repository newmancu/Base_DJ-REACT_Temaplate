
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {authContext} from '../../../App'
import './RegisterPage.sass'

export const RegisterPage = () => {

  const [username, setUseranem] = useState("")
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")
  const context = useContext(authContext)
  const navigator = useNavigate()
  
  useEffect(() => {
    if (context.username !== null)
      navigator('/front/todo')
  }, [navigator, context])

  return (
    <div className="auth__form">
      <div className="auth__inputs">
        <div className="auth__input-container">
          <span className="auth__label">Username</span>
          <input type="text" className="auth__input" 
            value={username} onChange={e => setUseranem(e.target.value)}/>
        </div>

        <div className="auth__input-container">
          <span className="auth__label">Password1</span>
          <input type="password" className="auth__input" 
            value={password1} onChange={e => setPassword1(e.target.value)}/>
        </div>

        <div className="auth__input-container">
          <span className="auth__label">Password2</span>
          <input type="password" className="auth__input" 
            value={password2} onChange={e => setPassword2(e.target.value)}/>
        </div>
      </div>

      <button className="auth__btn" onClick={async e => {
        const res = await context['register'](username, password1, password2)
        if (res.ok) navigator('/front/login')
      }}>Register</button>
    </div>
  )
}