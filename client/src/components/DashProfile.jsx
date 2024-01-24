
import { useSelector } from "react-redux"
import { Button, TextInput } from 'flowbite-react';


export default function DashProfile() {

    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
        
            <h1 className="my-7 text-center font-semibold text-3xl uppercase">Profile</h1>

            <form className="flex flex-col gap-5 ">

                <div className="w-30 h-30 mt-10 self-center hover:cursor-pointer shadow-lg overflow-hidden rounded-full"> 
                    <img src={currentUser.profilePicture} alt="profile_pic" className="rounded-full w-full h-full border-8 border-[lightgray] object-cover" />
                </div>

                <TextInput 
                    type="text" 
                    id="username" 
                    placeholder="Username" 
                    defaultValue={currentUser.username} 
                />

                <TextInput 
                    type="email" 
                    id="email" 
                    placeholder="Email" 
                    defaultValue={currentUser.email} 
                />

                <TextInput 
                    type="password" 
                    id="password" 
                    placeholder="password" 
                />

                <Button type="submit" gradientDuoTone='purpleToBlue' outline>
                    Update
                </Button>

            </form>

            <div className="text-red-500 flex justify-between mt-5">
                <span className="cursor-pointer">Delete Account</span>
                <span className="cursor-pointer">Sign Out</span>
            </div>

        </div>
    )
}