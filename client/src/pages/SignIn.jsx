/* eslint-disable no-unused-vars */
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SignIn() {

  const [formData, setFormData] = useState({})

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() })
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formData.email || !formData.password) {
      return setErrorMessage("Please fill out all details");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log( data);
      
      if(data.success === false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen mt-20">

      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">

        {/* div for left side  */}
        <div className="flex-1">
          
          <Link to="/" className='text-4xl font-bold dark:text-white'>
            <span className='p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white '>
              Tech
            </span>
              Blog
          </Link>

          <p className="text-sm mt-5">
            This is a Blog Website. You can sign in with your email and password or with Google.
          </p>
        
        </div>


        {/* div for right side  */}
        <div className="flex-1">

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div>
              <Label value="Your Email"/>
              <TextInput 
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="Your Password"/>
              <TextInput 
                type="password"
                placeholder="***********"
                id="password"
                onChange={handleChange}
              />
            </div>

            <Button gradientDuoTone={'purpleToPink'} type="submit" disabled={loading}>
              {
                loading? (
                  <>
                    <Spinner size='sm' />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : "Sign In"
                  
              }
            </Button>

          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Do not have an account?</span> {' '}
            <Link to='/sign-up' className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>

          {
            errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )
          }

        </div>

      </div>

    </div>
  )
}
