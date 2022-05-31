
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {authContext} from '../../../App'
import './LoginPage.sass'

export const LoginPage = () => {

  const [username, setUseranem] = useState("")
  const [password, setPassword] = useState("")
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
          <span className="auth__label">Password</span>
          <input type="password" className="auth__input" 
            value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
      </div>

      <button className="auth__btn" onClick={async e => {
        const res = await context['login'](username, password)
        if (res.ok) {
          context['setUsername'](username)
          navigator('/front/todo')
        }
      }}>Login</button>
    </div>
  )
}