/* eslint-disable no-unused-vars */
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";


export default function SignIn() {
  const dispatch = useDispatch();

  const {loading, error} = useSelector((state) => state.user);

  const [formData, setFormData] = useState({})

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() })
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields."));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log( data);
      
      if(data.success === false){
        dispatch(signInFailure(data.message));
      }
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.messsage));
    }
  }

  return (
    <div className="min-h-screen mt-20">

      <div className="flex p-3 max-w-[60%] mx-auto flex-col md:flex-row md:items-center gap-8">

        {/* div for left side  */}
        <div className="flex-1">
          
          <Link to="/" className=' font-bold flex flex-row items-center dark:text-white'>
            <h1 className="text-gray-500 dark:text-white text-5xl md:text-6xl font-semibold md:font-bold">Colo</h1>
            <span className="text-gradient text-5xl md:text-6xl font-semibold md:font-bold">Gram</span>
          </Link>

          <p className="text-md text-justify text-dimWhite max-w-[80%] mt-5">
            This is a Announcement Website. You can sign in with your email and password or with Google.
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

            <OAuth />

          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Do not have an account?</span> {' '}
            <Link to='/sign-up' className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>

          {
            error && (
              <Alert className="mt-5" color="failure">
                {error}
              </Alert>
            )
          }

        </div>

      </div>

    </div>
  )
}
