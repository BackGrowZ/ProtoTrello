import React from 'react'
import { Redirect } from 'react-router-dom'

const Logout = () => {
  localStorage.removeItem('jwt')
  localStorage.removeItem('owner')
  return <Redirect to='/' />
}

export default Logout
