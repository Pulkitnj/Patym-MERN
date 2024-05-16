import React from 'react'
import Header from '../components/Header'
import Title from '../components/Title'

function SignUp() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className = "place-content-center shadow-xl rounded-md box-border h-5/6 w-1/4 p-4 m-4">
            <div className="">
                <Header title = "Sign Up"/>
                <Title text = "Enter your information to create an account" />
                
            </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
