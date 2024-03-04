import { Alert, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function VerifyEmail() {
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [verified, setVerified] = useState(false);
    console.log("token: ",token)
    console.log("email: ", email)
    const location = useLocation();
    useEffect(()=>{                                      // to change the searchterm based on the text entered in the URL 
        const urlParams = new URLSearchParams(location.search);
        const tokenFromUrl = urlParams.get('token');
        if(tokenFromUrl){
          setToken(tokenFromUrl);
        }
        const emailFromUrl = urlParams.get('email');
        if(emailFromUrl){
          setEmail(emailFromUrl);
        }
      }, []);

      useEffect(()=>{
        const verifyAdmin = async()=>{
            const res = await fetch(`/api/auth/verify?token=${token}&email=${email}`);
            const data = await res.json();
            console.log("data: ", data)
            if(res.ok){
               setVerified(true); 
            }
        };
        verifyAdmin();
      })
    
    return (
        <div className="min-h-screen flex  mt-52 justify-center">
            {verified ? (
                <>
                    <div className="max-w-full  mx-auto">
                    <Alert color="success">
                        <span>Your Account has been verified succesfully! Please Login</span>
                        <br />
                        <Button gradientDuoTone="purpleToPink" className="mx-auto mt-3 p-0" type="submit">
                            <Link to="/sign-in">
                                Sign In
                            </Link>
                        </Button>
                    </Alert>
                    </div>
                    
                </>
            ): (
                <h1>please verify first</h1>
            )
            }
            
        </div>
    )
}
