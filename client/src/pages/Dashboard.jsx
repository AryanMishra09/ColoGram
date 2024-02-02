import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";


export default function Dashboard() {

  const location = useLocation();
  
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const tabFromUrl = urlSearchParams.get('tab');
    console.log(tabFromUrl);
    if(tabFromUrl) {
      setTab(tabFromUrl);
    }
  },[location.search] );

  return (
    
    <div className=" min-h-screen flex flex-col md:flex-row">

      {/* Sidebar  */}
      <div className="md:w-56">
        <DashSidebar />
      </div>

      {/* Profile  */}
      { tab === 'profile' && <DashProfile /> }

      {/* posts  */}
      { tab === 'posts' && <DashPosts /> }

      {/* users */}
      {tab === 'users' && <DashUsers />}

    </div>
  )
}
