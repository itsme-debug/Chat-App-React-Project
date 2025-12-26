import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const Login = () => {

  const {user,handleUserLogin} = useAuth()
  const navigate = useNavigate()
  const [credentials,setCredentials] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  },[])

  const handleInput = (e) => {
    let name = e.target.name
    let value = e.target.value 

    setCredentials({...credentials,[name] : value})
   
  }

  return (
    <div className='auth--container'>
      <div className='form--wrapper'>
          <form onSubmit={(e) => {handleUserLogin(e,credentials)}}>
            <div className='field--wrapper'>
              <label >Email:</label>
              <input 
                    type="email"  
                    required
                    name='email'
                    placeholder='Enter Your Email'
                    value={credentials.email}
                    onChange={handleInput}
                    />
            </div>

            <div className='field--wrapper'>
              <label >Password:</label>
              <input 
                    type="password"  
                    required
                    name="password"
                    placeholder='Enter Your Password'
                    value={credentials.password}
                    onChange={handleInput}
                    />
            </div>
            <div >
              <input 
                    className="btn btn--lg btn--main"
                    type="submit"  
                    value='login'
                    />
            </div>

            <p>Dont Have An Account register  <Link to={"/register"}>here</Link></p>
          </form>
      </div>
    </div>
  )
}

export default Login
