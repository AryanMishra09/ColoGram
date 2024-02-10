/* eslint-disable no-unused-vars */
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";


export default function SignUp() {

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

    if(!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all details");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
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
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen mt-20">

      <div className="flex p-3 max-w-[60%] mx-auto flex-col md:flex-row md:items-center gap-8">

        {/* div for left side  */}
        <div className="flex-1">
          
          <Link to="/" className=' font-bold flex flex-row dark:text-white'>
            <h1 className="text-gray-500 dark:text-white text-4xl md:text-6xl font-normal md:font-bold">Colo</h1>
            <span className="text-gradient text-4xl md:text-6xl font-normal md:font-bold">Gram</span>
          </Link>

          <p className="text-md text-justify mt-5 text-dimWhite max-w-[80%]">
            This is a Blog Website. You can sign up with your email and password or with Google.
          </p>
        
        </div>


        {/* div for right side  */}
        <div className="flex-1">

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div>
              <Label value="Your Username"/>
              <TextInput 
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>

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
                placeholder="Password"
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
                ) : "Sign Up"
                  
              }
            </Button>

            <OAuth />

          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span> {' '}
            <Link to='/sign-in' className="text-blue-500 hover:underline">
              Sign In
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
