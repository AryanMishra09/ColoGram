import {Avatar, Button, Dropdown, Navbar, TextInput} from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice.js';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {

    const {currentUser} = useSelector((state) => state.user);
    // console.log("Header: ", currentUser);

    const { theme } = useSelector((state) => state.theme);
    
    const dispatch = useDispatch();

    const path = useLocation().pathname;

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
        <Navbar className='border-b-2' style={{ padding: '20px 80px' }} >

            <Link to="/" className='self-center whitespace-nowrap text-sm flex sm:text-xl font-semibold dark:text-white'>
                <h1 className="text-white text-4xl font-bold">Colo</h1>
                <span className="text-gradient text-4xl font-bold">Gram</span>
            </Link>

            <form >
                <TextInput
                    type='text'
                    placeholder='Search'
                    rightIcon={AiOutlineSearch} 
                    className='hidden lg:inline '
                />
            </form>

            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-6 md:order-2'>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
            {console.log('Toggle theme clicked')}
          {theme === 'light' ? <FaMoon /> : <FaSun /> }
        </Button>
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
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}