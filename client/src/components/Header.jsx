import {Avatar, Button, Dropdown, Navbar, TextInput} from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toogleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {

    const {currentUser} = useSelector((state) => state.user);

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

            <Button className='w-12 h-10 lg:hidden rounded-xl' color='gray' >
                <AiOutlineSearch/>
            </Button>

            <div className='flex gap-8 md:order-2'>
                <Button
                    className='w-12 h-10 hidden sm:inline'
                    color='gray'
                    pill
                    onClick={() => dispatch(toogleTheme())}
                    >
                    {theme === 'light' ?<FaMoon /> : <FaSun /> }
                </Button>

                { currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        className='rounded-lg shadow-2xl' 
                        label={ 
                            <Avatar  
                                alt='User' 
                                img={currentUser.profilePicture} rounded 
                            /> 
                        }
                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to='/dashboard?tab=profile'>
                            <Dropdown.Item>
                                Profile
                            </Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignout}>
                            Sign Out
                        </Dropdown.Item>
                    </Dropdown>
                ) : 
                (
                    <Link to='/sign-in'> 
                        <Button gradientDuoTone='purpleToBlue' outline pill>
                            Sign In 
                        </Button>
                    </Link>
                )}

                
                <Navbar.Toggle/>

            </div>

            <Navbar.Collapse>
                    
                    <Navbar.Link className='rounded-xl shadow-2xl' active={path === "/"} as={'div'}>
                        <Link to="/" >
                            Home
                        </Link>
                    </Navbar.Link>
                    
                    <Navbar.Link className='rounded-xl shadow-2xl' active={path === "/about"} as={'div'}>
                        <Link to="/about" >
                            About
                        </Link>
                    </Navbar.Link>
                    
                    <Navbar.Link className='rounded-xl shadow-2xl' active={path === "/projects"} as={'div'}>
                        <Link to="/projects" >
                            Projects
                        </Link>
                    </Navbar.Link>
                
                </Navbar.Collapse>

        </Navbar>
    )
}
