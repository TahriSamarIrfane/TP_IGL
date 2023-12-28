import React, {useState} from 'react'
import background from "../assets/images/Page-admin.png"
import imageS from "../assets/images/Upload.png"
import imageL from "../assets/images/Loading.png"
import avatar from "../assets/images/Avatar.png"

import { MdOutlineDashboard } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
import { FaAddressBook } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { IoSearch } from "react-icons/io5";


const Admin = () =>  {
  const [nav, setNav] =useState(false);
  const [showItems, setShowItems] = useState(false);
  const [ImShift, setImShift] = useState(false)

  const handleListItemClick = () => {
    setShowItems(!showItems);
  };
  const handleImShift = () => {
    setImShift(!ImShift);
  };
  const handleNav = () =>{
    setNav(!nav)
  }
  return (
  <div className= ' bg-black w-ful h-full'>
    <div className='w-full h-full bg-no-repeat max-auto' style={{backgroundImage: `url(${background})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%' , height: '100vh'}}>
     <div className='flex flex-row justify-center items-center space-x-8 w-full h-full'> 

       {/*Barre des d'actions (Menu) */}
        <div className='w-[15%] rounded-sm h-[80%] mt-4 bg-white hidden lg:block '>
          <div className='flex flex-col justify-between items-center h-auto w-auto'>
              <div className='flex flex-row justify-center  py-1  mt-4 bg-darkPink rounded-md w-[80%]'>
               < MdOutlineDashboard className='mt-1 ' size={20} color='white'/>
               <p className=' text-2 text-white font-bold'>Dashboard</p>
              </div>
             <ul className=' flex-col mt-5 h-full w-full'>
                 <div className={!showItems ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink ' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-gray '}>
                    <FiUpload className='mt-1 ' size={17}/>
                    <li  className=' text-black'>Upload</li>  
                 </div>
                <div className={!showItems ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                 <FaAddressBook className='mt-1 ' size={17}/>
                  <li onClick={handleListItemClick} className='text-black'>Modérateurs</li>
                </div>
              
              </ul>
              {showItems && (
                            <ul>
                                  <div className={showItems ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                                    <MdOutlineAddBox className='mt-1 ' size={17}/>
                                    <li  className='text-black'>Nouveau</li>
                                 </div>
                                 <div className={showItems ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                                    <IoSearch className='mt-1 ' size={17}/>
                                    <li  className='text-black'>Chercher</li>
                                   </div>
                              
                            </ul>

                                 ) }
              <div className='flex flex-row mx-8 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer'>
                <LuLogOut className='mt-1 ' size={17}/>
                <p className=' text-black'>Déconnecter</p>
              </div>
          </div>
        </div> 

        {/*La fenêtre des actions et résultats*/}
       
       <div className='flex flex-col justify-center w-full h-[80%] space-y-2   lg:w-[60%]'>
         <div className='flex-row '>
          {/*Boutton Menu dans le cas mobile*/}
          <div onClick={handleNav} className='lg:hidden'>
          {nav ? <IoMenu color='white' size={25}/> : <IoMenu color='white' size={25}/> }
          </div>
          <h5 className='text-white font-bold text-2xl '>Dashboard</h5>
         </div>
          
          <div className="flex flex-col items-center justify-center bg-opacity-10 max-w-auto h-full w-[95%] mt-11 bg-white">
            <div className="flex flex-col justify-center items-center space-y-10 h-full w-full">
             <div className='flex-row  items-center w-[70%]'>
               <input
                type="url"
                className="py-2 w-[75%] rounded-l-xl"
                placeholder="Enter URL..."
                /> 

                
               <button onClick={handleImShift} style={{ position:'relative',fontSize: 'auto', overflow:'hidden' }} className='fixed py-2 w-[25%] bg-darkPink rounded-r-xl text-white text-size-auto '>Upload</button>
              </div>
              <img className='h-[60%]' src={!ImShift ? imageS : imageL } alt='/' />
            </div>
          </div>
        </div>
          
           {/*NavBar for a small frame */}
           
       
           <div className={!nav ? ' fixed left-0 top-20 w-[30%] h-full border-r border-gray-900 bg-white lg:hidden' : 'fixed left-[-100%]'}>
              <ul className=' flex-col pt-10 h-full w-full' style={{overflow: 'hidden'}}>
                 <div className={showItems ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink ':'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-grey'}>
                    <FiUpload className='mt-1 ' size={17}/>
                  <li className=' text-black'>Upload</li>
                </div>
                <div className={showItems ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer':'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink '}>
                 <FaAddressBook className='mt-1 ' size={17}/>
                  <li onClick={handleListItemClick} className='text-black'>Modérateurs</li>
                </div>
                {!showItems && (
                            <ul>
                                  <div className={!showItems ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                                    <MdOutlineAddBox className='mt-1 ' size={17}/>
                                    <li  className='text-black'>Nouveau</li>
                                 </div>
                                 <div className={!showItems ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                                    <IoSearch className='mt-1 ' size={17}/>
                                    <li  className='text-black'>Chercher</li>
                                   </div>
                              
                            </ul>
              )}
                <div className='flex flex-row mx-8 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer'>
                <LuLogOut className='mt-1 ' size={17}/>
                <p className=' text-black'>Déconnecter</p>
               </div>
              </ul>
              
              
            </div>
      
      </div> 

     {/*Image Profile top right corner*/}
      <div onClick={handleNav} style={{position: 'absolute',top: 15,right: 10, }}>
          <img className="h-10" src={avatar} alt='/'/>
          </div>
    </div>
     
 </div>
  
    
    
  )
}

export default Admin