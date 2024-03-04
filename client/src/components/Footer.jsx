import { Footer, FooterDivider } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsTwitter, BsLinkedin, BsInstagram } from 'react-icons/bs';

export default function FooterComponent() {
  return (
    <Footer className="border border-t-8 border-teal-500" container>
     
        <div className="w-full max-w-7xl mx-auto ">

            <div className=" grid w-full justify-between sm:flex md:grid-cols-1 ">
                
                <div>
                
                    <Link to="/" className='self-center whitespace-nowrap flex text-lg sm:text-xl font-semibold dark:text-white'>
                        <h1 className="text-white text-2xl font-bold">Colo</h1>
                        <span className="text-gradient text-2xl font-bold">Gram</span>
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
                    <Footer.Icon href="https://www.instagram.com/aryan_mishra.9/" icon={BsInstagram}/>
                    <Footer.Icon href="https://twitter.com/AryanMi68765726" icon={BsTwitter}/>
                    <Footer.Icon href="https://github.com/AryanMishra09" icon={BsGithub}/>
                    <Footer.Icon href="https://www.linkedin.com/in/aryanmishra09/" icon={BsLinkedin}/>
                </div>
            </div>
        </div>
    </Footer>
  )
}
