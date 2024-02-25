import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import {HiArrowCircleRight} from 'react-icons/hi';
import { useSelector } from 'react-redux';
import Slider from '../components/Slider';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {currentUser} = useSelector((state)=>state.user);
  // const { theme } = useSelector((state) => state.theme);
  console.log("Home: vurrent user: ", currentUser);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div 
      className='p-3 flex flex-col max-w-5xl mx-auto min-h-screen'
    >
      <div 
        className='flex flex-col gap-14 py-24 px-3 max-w-6xl justify-start '
      >
        <h1 
          className='flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-slate-700 dark:text-white ss:leading-[100px] leading-[75px] '
        >
          <span className='text-black-300'>Welcome to</span> {' '}
          Colo
          <span className='text-gradient'>Gram</span>
        </h1>
        <p className=' font-normal dark:text-dimWhite text-[18px] text-black leading-[29.8px] max-w-fit md:max-w-[70%]'>
          A one stop destination for all your college updates, insights and urgent notifications. <br /> Indulge in all the plethora of activities happening around the college & create your own <span className='text-gradient'>buzz....</span>
        </p>
        {/* <div className="absolute z-[0] w-[40%] h-[35%] bottom-0 pink__gradient" /> */}
        
              <div className="absolute z-[1] w-[10%] h-[50%] rounded-full white__gradient left-40 bottom-40" />
              <div className="absolute z-[0] w-[40%] h-[50%] top-20 right-0 bottom-20 blue__gradient" />
            
          
        
          
        <Link
          to='/search'
          className='text-sm sm:text-lg text-blue-500 gap-1 italic items-center flex font-poppins hover:underline'
        >
          View all announcements
          <HiArrowCircleRight />
        </Link>
      </div>

      <Slider />

      <div className='p-3 mt-16 rounded-tl-3xl rounded-br-3xl text-center bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col m-5 items-center gap-6'>
            <h2 className='text-3xl border-b mb-5 dark:border-gray-700 max-w-fit font-semibold text-center'>Recent Announcements</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all announcement
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
