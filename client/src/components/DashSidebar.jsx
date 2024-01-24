import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

export default function DashSidebar() {

    const location = useLocation();

    const [tab, setTab] = useState();

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search);
        const tabFromUrl = urlSearchParams.get('tab');
        if(tabFromUrl){
            setTab(tabFromUrl);
        }
    }, [ location.search ] );

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
                        >
                            Profile 
                        </Sidebar.Item>
                    </Link>
                    
                    <Sidebar.Item 
                        className='cursor-pointer' 
                        icon={HiArrowSmRight} 
                    >
                        Sign out 
                    </Sidebar.Item>
                
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
