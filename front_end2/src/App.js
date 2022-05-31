import {MainWrapper, LoginPage, RegisterPage, TodoPage} from './Pages/index'
import { Routes, Route} from 'react-router-dom'
import jwt_decoder from 'jwt-decode'

import './index.sass'
import React, { useCallback, useState } from 'react'
import { useAuth } from './Hooks/useAuth'

export const authContext = React.createContext()



function App() {
  let d = window.localStorage.getItem('access')
  if (d !== null)
    d = jwt_decoder(d).username
  const [username, setUsername] = useState(d)
  const {register, login, logPost, logout} = useAuth({
    log_url: "/api/token/",
    reg_url: "/api/user/register",
    ref_url: "/api/token/refresh/"
  })

  const realLogout = useCallback(() => {
    logout()
    setUsername(null)
  }, [logout])

  return (
    <authContext.Provider value={{register, login, logPost, logout: realLogout, username, setUsername}}>

      <Routes>
        <Route path="/front" element={<MainWrapper />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="todo" element={<TodoPage />} />
        </Route>
      </Routes>

    </authContext.Provider>
  )
}

export default App;
