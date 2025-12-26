import { useState } from "react"
import { useAuth } from "../Context/AuthContext"
import { Link } from "react-router-dom"


const Register = () => {

  const {handleRegister} = useAuth()

  const [credentials,setCredentials] = useState({
      name: '',
      email: '',
      password1: '',
      password2: '',
    })

    const handleInput = (e) => {
      let name = e.target.name
      let value = e.target.value 

      setCredentials({...credentials,[name] : value})
   
    }

  return (
    <div className='auth--container'>
      <div className='form--wrapper'>
          <form onSubmit={(e) => {handleRegister(e,credentials)}}>
            <div className='field--wrapper'>
              <label >name</label>
              <input 
                    type="text"  
                    required
                    name='name'
                    placeholder='Enter Your name'
                    value={credentials.name}
                    onChange={handleInput}
                    />
            </div>
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
                    name="password1"
                    placeholder='Enter Your Password'
                    value={credentials.password1}
                    onChange={handleInput}
                    />
            </div>
            <div className='field--wrapper'>
              <label >confirm Password:</label>
              <input 
                    type="password"  
                    required
                    name="password2"
                    placeholder='confirm Your Password'
                    value={credentials.password2}
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

            <p>Already Have An Account register  <Link to={"/login"}>here</Link></p>
          </form>
      </div>
    </div>
  )
}

export default Register
