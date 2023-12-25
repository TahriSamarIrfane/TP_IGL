import React, { useState } from "react";
import { Link } from 'react-scroll';//for the elements above
import'../index.css';
//import icons
import { IoClose,IoList } from "react-icons/io5";

const NavBar =() =>{
  const [isMenuOpen,setIsMenuOpen] = useState(false);
  const [isSticky,setIsSticky] = useState(false);
  //ro change the menuIcon to close
  const changeMenu=() =>{
    setIsMenuOpen(!isMenuOpen);
  }

 /* to keep the bar ,but the problem is that once i 
 decommente i recive a white page
   useEffect (() => {
    const handleScroll =() =>{
      if(window.scrollY>100){
        setIsSticky(true);
      }
      else{
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll',handleScroll);
    return () =>{
      window.removeEventListener('scroll',handleScroll);
    }
  });
*/
  //navItems array
  const items = [
    {link :"Accueil",path:"accueil"},
    {link :"Apropos",path:"apropos"},
    {link :"Nos services",path:"nosServices"},
    {link :"Feedbacks",path:"feedbacks"},
    {link :"Contact",path:"contact"},
  ];
  
  return(
    <header className='w-full bg-white fixed top-0 right-0 left-0'>
    <nav className={`lg:px-52 ${isSticky ? "sticky top-0 left-0 right-0 bg-white duration-300":""}`}>

      <div className='flex justify-center items-center text-base gap-8 lg:custom-rounded bg-black py-5 '>
        {/* To show items in large devices */}
      <ul className='md:flex space-x-12 hidden '>
        {
         /* we generate li by mapping the list ot items*/
        items.map(({link,path}) =><Link to={path} spy={true} smooth={true} 
        offset={-100} key={path} className='block text-base text-white hover:
        font-Tahoma'>{link}</Link>)
         }
      </ul>
     
      {/*menu for mobile devices */}
      {/*ml-auto to make the icons on the right */}
      <div className='md:hidden ml-auto px-7'>
        <button
        onClick={changeMenu}
         className='text-white focus:outline-none focus:text-'>
          {
          isMenuOpen ? (<IoClose className='h-6 w-6'/>):(<IoList className='h-6 w-6 '/>)
          }
        </button>
      </div>

      </div>

      {/*NAv items for mobile devices */}
      <div className={`space-y-4 px-4 mt-16 py-7 bg-black
      ${isMenuOpen ? "block fixed top-0 right-0 left-0":"hidden"}`}>
      {
         /* we generate li by mapping the list ot items*/
        items.map(({link,path}) =><Link to={path} spy={true} smooth={true} 
        offset={-100} key={path} className='block text-base text-white hover:text-pink
        font-Tahoma ml-4'>{link}</Link>)
         }
      </div>
    </nav>
    </header>
  );
};

export default NavBar