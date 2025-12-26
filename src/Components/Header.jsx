import React from 'react'
import { LogOut } from 'react-feather'
import { useAuth } from '../Context/AuthContext'

const Header = () => {
    const {user,handleLogout} = useAuth()
  return (
    <div id='header--wrapper'>
      {user ? (
            <>
                welcome {user.name}
                <LogOut className='header--link' onClick={handleLogout} />
            </>
      ):(
            <button>Login</button>
      )}
    </div>
  )
}

export default Header
