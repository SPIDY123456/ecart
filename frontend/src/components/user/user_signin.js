import React, { useState } from 'react'

function UserSign() {
    const[user,setuser]=useState({name:"",phone:"",password:""})

    const handleInputChange=(e)=>{
        setuser({...user,[e.target.name]:e.target.value})
      

    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(user.name ==="" && user.phone =="" && user.password ==="" ){
            alert("All fields are required")
        }
        console.log(user)
    }
  return (
    <div>
        <h1>Create Account</h1>
      <label>Username</label><br/>
      <input type='text'name='name' onChange={handleInputChange} res/><br/>
          <label>Mobule Number</label><br />
          <input type='text' name='phone' onChange={handleInputChange} /><br />
          <label>Password</label><br />
          <input type='password' name='password'  placeholder='At least 6 character' onChange={handleInputChange} /><br />
          <button type='submit' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default UserSign
