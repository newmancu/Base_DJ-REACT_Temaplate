import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../../App'

import './style.sass'

export const Header = () => {

  const context = useContext(authContext)

  return (
    <header>
      <div className="container">
        <div className="title__wrapper">
          <h2 className="title">
            Todo
          </h2>
          {context.username && 
            <div className="user">
              <h3 className="title__username">{context.username}</h3>
              <Link className="title__logout" to='/front/login' onClick={e => context.logout()}>
                logout
              </Link>
            </div>
          }
        </div>
      </div>
    </header>
  )
}