import { useCallback } from "react"
import { useNavigate } from "react-router-dom"


export const useRequest = () => {

  const navigate = useNavigate()

  const request = useCallback(async (url, method, headers={}, body=null) => {
    const cur_headers = {
      'Content-Type' : 'application/json',
      ...headers
    }
    const data = body === null ? null : JSON.stringify(body)
    const res = await fetch(url, {
      method,
      'headers': cur_headers,
      'body': data
    })

    return res
  }, [])

  const makeLogIn = async (username, password) => {
    return await fetch(
      '/api/token/',
      {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({username, password})
      })
  }

  const logIn = useCallback(async (username, password) => {
    const res = await makeLogIn(username, password)
    if (!res.ok){
      if (window.localStorage.getItem('refresh')){
        const res2 = await fetch(
          '/api/token/refresh/',
          {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json',
            },
            body: JSON.stringify({'refresh': window.localStorage.getItem('refresh')})
          })
        if (res2.ok) {
          window.localStorage.setItem('access', (await res2.json())['access'])
          const re3 = await makeLogIn(username, password)
          return re3
        }
      } else return null
    }
    Object.entries(await res.json()).forEach(val => {window.localStorage.setItem(val[0], val[1])})
    return res
  }, [])

  const logout = useCallback(async (redirect='/front') => {
    window.localStorage.removeItem('refresh')
    window.localStorage.removeItem('access')
    navigate(redirect)
  },[navigate])

  const register = useCallback(async (username, password1, password2) => {
    const res = await fetch(
      '/api/user/register',
      {
        method:'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({username, password1, password2})
      })
    return res
  }, [])

  const requestWithAuth = useCallback(async (url, method, headers={}, body=null) => {
    const res = await request(url, method, 
      {
        ...headers,
        'Authorization': `Bearer ${window.localStorage.getItem('access')}`
      }, body)
    if (!res.ok){
      if (window.localStorage.getItem('refresh')){
        const res2 = await fetch(
          '/api/token/refresh/',
          {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json',
            },
            body: JSON.stringify({'refresh': window.localStorage.getItem('refresh')})
          })
        if (res2.ok) {
          window.localStorage.setItem('access', (await res2.json())['access'])
          const re3 = await request(url, method, 
            {
              ...headers,
              'Authorization': `Bearer ${window.localStorage.getItem('access')}`
            }, body)
          return re3
        }
      } else return null
    }
    return res

  }, [request])

  return {request, logIn, logout, register, requestWithAuth}
}