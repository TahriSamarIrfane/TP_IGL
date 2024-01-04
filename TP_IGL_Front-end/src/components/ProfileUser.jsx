import React from 'react'

import avatar from "../assets/images/Avatar.png"

import { MdOutlinePersonOutline } from "react-icons/md";
import { LuKeyRound } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineKeyboardBackspace } from "react-icons/md";


const ProfileUser = () => {
    const textOverlayStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        /* Add other styles as needed */
      };
  return (
    <div className='flex flex-col w-full h-full  '>
        <div className='flex flex-row p-2 justify-between mt-4 '>
          <div  className='flex flex-row justify-start space-y-2'>
          <img className="h-10" src={avatar} alt='/'/>
          <p>Surfey</p>
          </div>
          <div  className='flex flex-row justify-end'>
          <img className="h-10" src={avatar} alt='/'/>
          </div>
        </div>
        {/*Go Back Arrow*/}
        <div className='  mt-2  lg:px-9 '><MdOutlineKeyboardBackspace size={40} /></div>
        {/*My Profile heading*/}
        <div className='flex justify-center items-center '>
            <div className=' flex flex-row  w-full  '>
                 <p className='px-4 font-bold lg:px-[14%]' style={{fontSize:'5vh', fontFamily:'tahoma' }}>Mon Profile</p>
               
                <div className='flex flex-row px-5 space-x-2 lg:px-[5%]  '>
                    <MdOutlinePersonOutline className='mt-1  ' color='DF1477' size={36}/>
                    <p  className=' text-black' style={{fontSize:'5vh' }}>Informations Personnelles</p>  
                </div>
            </div></div>
            

        <div className='flex flex-row justify-center items-center mt-[-2%]  h-[80%] '>
       
            <div className='flex flex-col justify-center items-center  h-full w-[40%]'>
             
                 
                    <img className='opacity-95' style={{ height: '20vh',width: 'auto' }} src={avatar} alt='/'/>
                    <div style={{position: 'absolute',top:'44vw',right:'75vw'}} className='w-[6.5%]'>
                        <p className='font-bold' style={{fontSize:'3vh' }}>Modifier</p>
                    </div>
                   <p style={{fontSize:30 }}>Emily</p>
                <ul className='flex flex-col'>
                 <div className='flex flex-row mx-8 mb-6 space-x-2 py-1'>
                    <MdOutlinePersonOutline className='mt-1  ' color='DF1477' size={20}/>
                    <li  className=' text-black border-b-2 hover:border-b-darkPink cursor-pointer' style={{fontSize:19 }}>Informations Personnelles</li>  
                 </div>
                <div className= 'flex flex-row mx-8 mb-6 space-x-2 py-1 '>
                 <LuKeyRound  className='mt-1  ' color='DF1477' size={20}/>
                  <li  className='text-black border-b-2 hover:border-b-darkPink cursor-pointer' style={{fontSize:19 }}>Modifier Mot de Passe</li>
                </div>
                <div className='flex flex-row mx-8 mb-6 space-x-2 py-1'>
                <LuLogOut className='mt-1 ' color='DF1477' size={20}/>
                <li className=' text-black border-b-2 hover:border-b-darkPink cursor-pointer' style={{fontSize:19 }}>Déconnecter</li>
              </div>
               </ul> 
            </div>
             
             <div className="vertical-line w-[6%]"></div>
             
                <div className='flex flex-col space-y-2  w-[50%] ' >
                  
                  <div className='flex flex-col space-y-8  '>
                    <div className='flex flex-col space-y-2  '>
                    <p>Nom</p>
                    <input
                    type="text"
                    className="rounded-md w-[80%]"
                    placeholder="Jacobi"
                    />
                    <p>Pseudo</p>
                    <input
                    type="text"
                    className="rounded-md w-[80%]"
                    placeholder="Jacobi23"
                 />
                    <p>Email</p>
                    <input
                    type="email"
                    className="rounded-md w-[80%]"
                    placeholder="Jacobi@"
                    />
                    </div>
                    <div className='flex justify-end w-[80%] '>
                    <button className='p-1 px-6  bg-darkPink text-center text-white rounded-md '>Enregistrer</button>
                    </div>
                </div>
                
            </div>
            
        </div>
    </div>
  )
}

export default ProfileUser