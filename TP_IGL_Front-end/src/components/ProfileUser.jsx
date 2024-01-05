import React, { useState } from 'react'

import avatar from "../assets/images/images2.jpg"

import { MdOutlinePersonOutline } from "react-icons/md";
import { LuKeyRound } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineKeyboardBackspace } from "react-icons/md";


const ProfileUser = () => {

  const [ModifierInfo,setModifierInfo] = useState(true);
  const [ModifierPwd, setModifierPwd] = useState(false);


  const handleModifierInfo= () => {
    setModifierInfo(!ModifierInfo);
    setModifierPwd(false);
  };
  const handleModifierPwd= () => {
    setModifierPwd(true);
    setModifierInfo(false);
  };

  return (
    <div className='flex flex-col w-full h-full  '>
        <div className='flex flex-row p-2 justify-between mt-4 '>
          <div  className='flex flex-row justify-start space-y-2'>
          <img  src={avatar} style={{borderRadius:'50%', height:'40px',width:'40px',objectFit:'cover'}} alt='/'/>
          <p>Surfey</p>
          </div>
          <div  className='flex flex-row justify-end'>
          <img  src={avatar} style={{borderRadius:'50%', height:'40px',width:'40px',objectFit:'cover'}}  alt='/'/>
          </div>
        </div>
        {/*Go Back Arrow*/}
        <div className='  mt-2  lg:px-9 '><MdOutlineKeyboardBackspace size={40} /></div>
        {/*My Profile heading*/}
        <div className='flex justify-center items-center '>
            <div className=' flex flex-row w-[80%]  '>
                 <p className='lg:px-[6.8%] px-[6.5%] lg:text-3xl  text-xl text-center font-bold ' style={{ fontFamily:'tahoma' }}>Mon Profile</p>
       
                  {ModifierInfo && (<div className='flex flex-row space-x-2 lg:px-[17%] px-[16%] ml- '>
                    <MdOutlinePersonOutline className='mt-1  ' color='DF1477' size={36}/>
                    <p  className=' text-black mt-2 lg:text-2xl text-100 '>Informations Personnelles</p>  
               
                  </div>
                  )}
                  {ModifierPwd && (<div className='flex flex-row space-x-2 lg:px-[17%] px-[16%] ml- '>
                    <LuKeyRound className='mt-1  ' color='DF1477' size={36}/>
                    <p  className=' text-black mt-2 lg:text-2xl text-100 '>Modifier Mot de Passe</p>  
               
                  </div>
                  )}
                
            </div></div>
            

        <div className='flex flex-row justify-center items-center mt-[-2%]  h-[80%] '>
       
            <div className='flex flex-col justify-center items-center border-r-black border-r-7   px-[1.4%] w-[40%]'>
             
                  <div className='flex p-4 justify-center items-center '>
                    <img className='opacity-70' style={{borderRadius:'50%', height:'120px',width:'120px',objectFit:'cover'}}  src={avatar} alt='/'/>
                        <p className='lg:px-7 font-bold lg:text-xl px-3 text-black text-opacity-80 text-[80%]' style={{position:'absolute'}}>Modifier</p>
                        </div> 
                   <p className='lg:text-4xl text-xl'>Jacobi</p>
                <ul className='flex flex-col p-3'>
                 <div className='flex flex-row mx-8 mb-6 space-x-2 py-1'>
                    <MdOutlinePersonOutline className='mt-1  ' color='DF1477' size={20}/>
                    <li onClick={handleModifierInfo}  className={!ModifierInfo ? ' text-black border-b-2 hover:border-b-darkPink cursor-pointer lg:text-xl text-10' :  'text-black border-b-2  lg:text-xl text-10 border-b-darkPink'}>Informations Personnelles</li>  
                 </div>
                <div className= 'flex flex-row mx-8 mb-6 space-x-2 py-1 '>
                 <LuKeyRound  className='mt-1  ' color='DF1477' size={20}/>
                  <li onClick={handleModifierPwd} className={!ModifierPwd ?'text-black border-b-2 hover:border-b-darkPink cursor-pointer lg:text-xl text-10':'text-black border-b-2 border-b-darkPink lg:text-xl text-10'} >Modifier Mot de Passe</li>
                </div>
                <div className='flex flex-row mx-8 mb-6 space-x-2 py-1'>
                <LuLogOut className='mt-1 ' color='DF1477' size={20}/>
                <li className=' text-black border-b-2 hover:border-b-darkPink cursor-pointer lg:text-xl text-10'>Déconnecter</li>
              </div>
               </ul> 
            </div>
             
             
                <div className='flex flex-col space-y-2 border-l-black border-l-4 bg-black  px-[1%] py-9 w-[55%]' >
                  
                  {ModifierInfo && (<div className='flex flex-col space-y-8  px-[10%] '>
                    <div className='flex flex-col space-y-2 justify-start '>
                    <p>Nom</p>
                    <input
                    type="text"
                    className="rounded-md w-[80%] "
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
                    <button className='p-1 lg:px-6 px-2 bg-darkPink text-center text-white rounded-md '>Enregistrer</button>
                    </div>
                </div>
                  )}
                  {ModifierPwd && (<div className='flex flex-col space-y-8  px-[10%] '>
                    <div className='flex flex-col space-y-2 justify-start '>
                    <p>Mot de passe actuel</p>
                    <div className='flex flex-col'>
                    <input
                    type="text"
                    className="rounded-md w-[80%] "
                    placeholder="Jacobi23"
                    />
                    <p className='lg:text-[80%] text-[70%] text-blue-500'>Mot de passe oublié ?</p>
                    </div>
                    <p>Nouveau mot de passe</p>
                    <input
                    type="password"
                    className="rounded-md w-[80%]"
                    placeholder="*****"
                 />
                    <p>Confirmer mot de passe</p>
                    <input
                    type="password"
                    className="rounded-md w-[80%]"
                    placeholder="******"
                    />
                    </div>
                    <div className='flex justify-end w-[80%] '>
                    <button className='p-1 lg:px-6 px-2 bg-darkPink text-center text-white rounded-md '>Enregistrer</button>
                    </div>
                </div>
                  )}
            </div>
            
        </div>
    </div>
  )
}

export default ProfileUser