import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashSidebar() {

    const dispatch = useDispatch();

    const location = useLocation();

    const [tab, setTab] = useState();

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search);
        const tabFromUrl = urlSearchParams.get('tab');
        if(tabFromUrl){
            setTab(tabFromUrl);
        }
    }, [ location.search ] );

    const handleSignout = async () => {
        try {
          const res = await fetch('/api/user/signout', {
            method: 'POST',
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            dispatch(signoutSuccess());
          }
        } catch (error) {
          console.log(error.message);
        }
      };

    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup>

                    <Link to='/dashboard?tab=profile' >
                        <Sidebar.Item 
                            active={tab === 'profile'} 
                            label={"User"} 
                            labelColor='dark' 
                            icon={HiUser} 
                            as="div"
                        >
                            Profile 
                        </Sidebar.Item>
                    </Link>
                    
                    <Sidebar.Item
                        icon={HiArrowSmRight}
                        className='cursor-pointer'
                        onClick={handleSignout}
                    >
                        Sign out 
                    </Sidebar.Item>
                
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
