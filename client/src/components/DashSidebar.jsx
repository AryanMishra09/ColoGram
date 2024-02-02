import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DashSidebar() {

    const dispatch = useDispatch();

    const location = useLocation();

    const [tab, setTab] = useState();

    const {currentUser} = useSelector((state)=>state.user);

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
                <Sidebar.ItemGroup className="flex flex-col gap-1">

                    <Link to='/dashboard?tab=profile' >
                        <Sidebar.Item 
                            active={tab === 'profile'} 
                            label={currentUser.isAdmin ? "Admin" : "User"} 
                            labelColor='dark' 
                            icon={HiUser} 
                            as="div"
                        >
                            Profile 
                        </Sidebar.Item>
                    </Link>
                    
                    {currentUser.isAdmin && (
                        <Link to='/dashboard?tab=posts'>
                            <Sidebar.Item
                                active={tab === 'posts'}
                                icon={HiDocumentText}
                                as='div'
                            >
                                Posts
                            </Sidebar.Item>
                        </Link>
                    )}

                    {currentUser.isAdmin && (
                        <Link to='/dashboard?tab=users'>
                            <Sidebar.Item
                                active={tab === 'posts'}
                                icon={HiOutlineUserGroup}
                                as='div'
                            >
                                Users
                            </Sidebar.Item>
                        </Link>
                    )}
                    
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
