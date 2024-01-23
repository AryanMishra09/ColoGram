import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from "../firebase";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from "../redux/user/userSlice";

export default function OAuth() {

    const auth = getAuth(app);                         //we imported the app to get to know who is requesting(for firebase)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });            //for setting that everytime we gwt to select from which id we have to login otherwise google will login with your first id you selected everytime.
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch("/api/auth/google", {                                 //for saving the user to the backend and getting the response
                method: "POST",
                headers: {"Content-Type" : 'application/json'},
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,                 //for the structure just console.log(resultFromGoogle)
                    email: resultFromGoogle.user.email,
                    googlePhotoUrl: resultFromGoogle.user.photoURL,
                }),
            }); 
            const data = await res.json();                         //getting the response in json format.
            if(res.ok){
                dispatch( signInSuccess(data) );
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Button type="button" gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}> 
        <AiFillGoogleCircle className="w-6 h-6 mr-2" />
        Continue with Google
    </Button>
  )
}
