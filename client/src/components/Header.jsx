import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
// import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
// import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';


export default function Header() {

    const {currentUser} = useSelector((state) => state.user);

    // const { theme } = useSelector((state) => state.theme);
    const [searchTerm, setSearchTerm] = useState('');
    // console.log(searchTerm);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const path = useLocation().pathname;

    useEffect(()=>{
      setSearchTerm('');                                          // to change the searchterm based on the text entered in the URL 
      const urlParams = new URLSearchParams(location.search);
      const searchtermFromUrl = urlParams.get('searchTerm');
      if(searchtermFromUrl){
        setSearchTerm(searchtermFromUrl);
      }
    }, [location.search])

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
  
    const handleSubmit = (e) => {                             //update the URL with the new search term
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    };

    return (
        <Navbar className='border-b-2 px-10 py-4 md:px-[5%]' >

            <Link to="/" className='self-center whitespace-nowrap text-sm flex sm:text-xl font-semibold dark:text-white'>
                <h1 className="text-gray-500 dark:text-white text-3xl md:text-4xl font-normal md:font-bold">Colo</h1>
                <span className="text-gradient text-3xl md:text-4xl font-normal md:font-bold">Gram</span>
            </Link>

            <form onSubmit={handleSubmit} >
                <TextInput
                    type='text'
                    placeholder='Search'
                    rightIcon={AiOutlineSearch} 
                    className='hidden lg:inline '
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>

            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-6 md:order-2 mt-4 sm:mt-0'>
        {/* <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
            {console.log('Toggle theme clicked')}
          {theme === 'light' ? <FaMoon /> : <FaSun /> }
        </Button> */}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded className='h-10 w-16 object-cover' />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse >
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/search'} as={'div'}>
          <Link to='/search'>Announcements</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}