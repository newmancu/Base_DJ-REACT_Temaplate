import { useCallback, useState } from "react"


export const useAuth = ({reg_url, log_url, ref_url}) => {

  const regUrl = useState(reg_url)[0]
  const logUrl = useState(log_url)[0]
  const refUrl = useState(ref_url)[0]

  const register = useCallback( async (username, password1, password2) => {
    return await fetch(regUrl, {
      method: "POST",
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify({username, password1, password2})
    })
  }, [regUrl])

  const login = useCallback( async (username, password) => {
    const res = await fetch(logUrl, {
      method: "POST",
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify({username, password})
    })
    Object.entries(await res.json()).forEach(it => {window.localStorage.setItem(...it)})
    return res
  }, [logUrl])

  const logout = () => {
    const tokens = ['refresh', 'access']
    tokens.forEach(val => {window.localStorage.removeItem(val)})
  }

  const logPost = useCallback( async (url, body) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${window.localStorage.getItem('access')}`
      },
      body: JSON.stringify(body)
    })
    if (res.status === 401) {
      const d = {}
      d["refresh"] = window.localStorage.getItem("refresh")
      const rres = await fetch(refUrl, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(d)
      })
      if (rres.ok){
        const data = await rres.json()
        Object.entries(data).forEach(it => {window.localStorage.setItem(...it)})
        const res2 = await fetch(url, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${window.localStorage.getItem('access')}`
          },
          body: JSON.stringify(body)
        })
        return res2
      }
      return null
    }
    return res
  }, [refUrl])

  return {register, login, logout, logPost}
}