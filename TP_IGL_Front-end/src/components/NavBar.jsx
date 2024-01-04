// Don't forget to add the logo when it's done!!

import React, { useState } from "react";
import { Link } from 'react-scroll';//for the elements above
import'../index.css';
//import icons
import { IoClose,IoList } from "react-icons/io5";
import email from '../assets/icons/@.png';
import profile from '../assets/images/profile.png';


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
    {link :"Blog",path:"blog"},
    {link :"FAQ",path:"faq"},
    {link :"Feedback",path:"feedback"},
    {link :"Contact",path:"contact"},
  ];
  
  return(
    <header className=' absolute w-full  top-0 right-0 left-0'>
    <nav className={`lg:px-52 ${isSticky ? "sticky top-0 left-0 right-0 bg-white duration-300":""}`}>

              {/*add the logooooooooooooooooooooooooo here lateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer */}
              <div className='lg:grid grid-cols-2 items-center absolute  left-6 top-2 hidden md:block'>        
         <img className='h-10  ' src={email} alt=""/>
         <h className='md:hidden lg:block font-bold text-gray-600 text-xl'>Surfey</h>       
        </div>

        <div className='items-center absolute  right-6 top-2 hidden md:block'>        
         <img className='h-14  ' src={profile} alt=""/>
        </div>

      <div className='flex justify-center items-center text-base gap-8 lg:custom-rounded  bg-black py-5 '>
      
        {/* To show items in large devices */}
      <ul className='md:flex space-x-12 hidden '>
        {
         /* we generate li by mapping the list ot items*/
        items.map(({link,path}) =><Link to={path} spy={true} smooth={true} 
        offset={-100} key={path} className='block text-base text-white hover:text-[#FBC5DB]
        font-Tahoma '>{link}</Link>)
         }
      </ul>
     
      {/*menu for mobile devices */}
      {/*ml-auto to make the icons on the right */}
      <div className=' md:hidden ml-auto px-7'>

        {/*add the logooooooooooooooooooooooooo here lateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer */}
      <div className='grid grid-cols-2 absolute left-3 '>        
         <img className='h-10  ' src={email} alt=""/> 
         <h className='md:hidden font-bold text-white text-xl top-2'>Surfey</h>       
      
        </div>

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

      <div className={`space-y-4 px-4 mt-16 py-7 bg-black ${
        isMenuOpen ? 'block fixed top-0 right-0 left-0' : 'hidden'
      } z-50`}>
      {
         /* we generate li by mapping the list ot items*/
        items.map(({link,path}) =><Link to={path} spy={true} smooth={true} 
        offset={-100} key={path} className='block text-base text-white hover:text-[#FBC5DB]
        font-Tahoma ml-4'>{link}</Link>)
         }
      </div>
    </nav>
    </header>
  );
};

export default NavBar
