import { Footer, FooterDivider } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsTwitter, BsLinkedin, BsInstagram } from 'react-icons/bs';

export default function FooterComponent() {
  return (
    <Footer className="border border-t-8 border-teal-500" container>
     
        <div className="w-full max-w-7xl mx-auto ">

            <div className=" grid w-full justify-between sm:flex md:grid-cols-1 ">
                
                <div>
                
                    <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                        <span className='p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white '>
                            Tech
                        </span>
                        Blog
                    </Link>
                
                </div>

                <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                    <div>
                        <Footer.Title title="About" />
                        <Footer.LinkGroup col >
                            <Footer.Link 
                                href="https://github.com/AryanMishra09/Blog-Website"
                                target="_blank"
                                rel="noopner noreferrer"
                            >
                                Source Code
                            </Footer.Link>
                            <Footer.Link 
                                href="/about"
                                target="_blank"
                                rel="noopner noreferrer"
                            >
                                Tech Blog
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>  

                    <div>
                        <Footer.Title title="Follow Us" />
                        <Footer.LinkGroup col >
                            <Footer.Link 
                                href="https://github.com/AryanMishra09"
                                target="_blank"
                                rel="noopner noreferrer"
                            >
                                Github
                            </Footer.Link>
                            <Footer.Link 
                                href="https://www.linkedin.com/in/aryanmishra09/"
                                target="_blank"
                                rel="noopner noreferrer"
                            >
                                LinkedIn
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>  

                    <div>
                        <Footer.Title title="Legal" />
                        <Footer.LinkGroup col >
                            <Footer.Link 
                                href="#"
                                target="_blank"
                                rel="noopner noreferrer"
                            >
                                Privacy Policy
                            </Footer.Link>
                            <Footer.Link 
                                href="#"
                                target="_blank"
                                rel="noopner noreferrer"
                            >
                                Terms & Condition
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <FooterDivider />

            <div className="w-full sm:flex sm:items-center gap-4 sm:justify-center">
                
                <Footer.Copyright href="#" by="Aryan Mishra" year={new Date().getFullYear()}/>

                <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                    <Footer.Icon href="#" icon={BsFacebook}/>
                    <Footer.Icon href="#" icon={BsInstagram}/>
                    <Footer.Icon href="#" icon={BsTwitter}/>
                    <Footer.Icon href="#" icon={BsGithub}/>
                    <Footer.Icon href="#" icon={BsLinkedin}/>
                </div>
            </div>
        </div>
    </Footer>
  )
}
