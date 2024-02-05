import React, { useState } from 'react'

import avatar from "../assets/images/images2.jpg"
import logo from "../assets/images/Logo.png"

import { MdOutlinePersonOutline } from "react-icons/md";
import { LuKeyRound } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';


const ProfileUser = () => {

  const [ModifierInfo,setModifierInfo] = useState(true);
  const [ModifierPwd, setModifierPwd] = useState(false);
  const [ModifierPseudo, setModifierPseudo] = useState(false);

  const handleModifierPseudo= () => {
    setModifierPseudo(!ModifierPseudo);
  };

  const handleModifierInfo= () => {
    setModifierInfo(!ModifierInfo);
    setModifierPwd(false);
  };
  const handleModifierPwd= () => {
    setModifierPwd(true);
    setModifierInfo(false);
  };
   
  return (
    <div className='flex flex-col bg-gradient-to-r lg:h-screen h-full w-screen from-GLbleu via-GLpink to-orange-300   '>
        <div className='flex flex-row p-2 justify-between mt-4 '>
          <div  className='flex flex-row  justify-start space-y-2 space-x-3'>
          <img  src={logo} style={{borderRadius:'50%', height:'40px',width:'40px',objectFit:'cover'}} alt='/'/>
          <h className='md:hidden lg:block  font-bold text-gray-600 text-xl'>Surfey</h>  
          </div>
         
        </div>
        <div className='flex justify-center w-full h-[75%] '>
        <div className=' border-2 border-grey w-[80%] lg:h-full bg-white h-screen'>

        <div className='flex flex-row justify-center items-center h-full  '>
       
          <div className='flex flex-col justify-center items-center px-[1.4%] w-[40%]'>
            
           
            <div className=' flex flex-col w-full  '>
            <p className='lg:px-[13.8%] py-3 px-[12%] lg:text-3xl text-xl text-center font-bold  ' style={{ fontFamily:'tahoma' }}>Mon Profile</p>
    
                  <div className='flex p-4 justify-center  items-center '>
                    <img className='opacity-70 p-2 ' style={{borderRadius:'50%', height:'120px',width:'120px',objectFit:'cover'}}  src={avatar} alt='/'/>
                        <p className='lg:px-7 font-bold lg:text-xl px-3 text-black text-opacity-80 text-[80%]' style={{position:'absolute'}}>Modifier</p>
                        </div> 
                        </div>
                <ul className='flex flex-col'>
                 <div className='flex flex-row mx-8 mb-3 space-x-2 py-1'>
                    <MdOutlinePersonOutline className='mt-1  ' color='DF1477' size={20}/>
                    <li onClick={handleModifierInfo}  className={!ModifierInfo ? ' text-black border-b-2 hover:border-b-darkPink cursor-pointer lg:text-md text-10' :  'text-black border-b-2  lg:text-md text-10 border-b-darkPink'}>Informations Personnelles</li>  
                 </div>
                <div className= 'flex flex-row mx-8 mb-3 space-x-2 py-1 '>
                 <LuKeyRound  className='mt-1  ' color='DF1477' size={20}/>
                  <li onClick={handleModifierPwd} className={!ModifierPwd ?'text-black border-b-2 hover:border-b-darkPink cursor-pointer lg:text-md text-10':'text-black border-b-2 border-b-darkPink lg:text-md text-10'} >Modifier Mot de Passe</li>
                </div>
                <div className='flex flex-row mx-8 mb-3 space-x-2 py-1'>
              <MdOutlineDeleteForever className='mt-1 ' color='DF1477' size={20} />
              <li className=' text-black border-b-2 hover:border-b-darkPink cursor-pointer lg:text-md text-10'>Supprimer Compte</li>
               </div>
                <div className='flex flex-row mx-8 mb-3 space-x-2 py-1'>
                <LuLogOut className='mt-1 ' color='DF1477' size={20}/>
                <li className=' text-black border-b-2 hover:border-b-darkPink cursor-pointer lg:text-md text-10'>Se déconnecter</li>
              </div>
          
                </ul> 
            </div>
             
             
                <div className='flex flex-col space-y-2   h-[80%] border-l-grey border-l-2 px-[1%]  w-[50%]' >
                {/* /*******Modifier Informations********** */}
                  {ModifierInfo && (<div className='flex flex-col h-full space-y-8  px-[10%] '>
                  <div className='flex flex-row space-x-2 lg:px-[4%] py-3 px-[6%] text-center mt-5 '>
                    <MdOutlinePersonOutline className='mt-1  ' color='DF1477' size={36}/>
                    <p  className=' text-black mt-2 lg:text-2xl  text-100 '>Informations Personnelles</p>  
               
                  </div>
                    <div className='flex flex-col space-y-2 justify-start '>
                    <p>Pseudo</p>
                    {ModifierPseudo &&(<div>
                    <input
                    type="text"
                    className="rounded-md w-full"
                    placeholder="Jacobi23"
                    /> </div> )}
                    {!ModifierPseudo && (<div className='border-2 p-2 rounded-md border-grey border-opacity-35'> <p on onClick={handleModifierPseudo}>Jacobi</p></div>
                  )}
                    
                    <p >Email</p>
                   <div className='border-2 p-2 rounded-md border-grey border-opacity-35'> <p>*******@esi.dz</p></div>
                    </div>
                    {ModifierPseudo &&( <div className='flex justify-end w-full '>
                    <button onClick={handleModifierPseudo} className='p-1 lg:px-6 px-2 bg-darkPink text-center text-white rounded-md '>Enregistrer</button>
                    </div>)}
                </div>
                  )}
                  {/* /*******Modifier Mot de Passe********** */}
                  {ModifierPwd && (
                  <div className='flex flex-col space-y-3  px-[10%] '>
                    <div className='flex flex-row space-x-2 lg:px-[4%] px-[7%] text-center '>
                    <LuKeyRound className='mt-1  ' color='DF1477' size={36}/>
                    <p  className=' text-black mt-2 lg:text-2xl text-[90%] '>Modifier Mot de Passe</p>  
               
                  </div>
                    <div className='flex flex-col space-y-2 justify-start '>
                    <p>Mot de passe actuel</p>
                    <div className='flex flex-col'>
                    <input
                    type="text"
                    className="rounded-md w-full "
                    placeholder="Jacobi23"
                    />
                    <p className='lg:text-[80%] text-[70%] text-blue-500'>Mot de passe oublié ?</p>
                    </div>
                    <p>Nouveau mot de passe</p>
                    <input
                    type="password"
                    className="rounded-md w-full"
                    placeholder="*****"
                 />
                    <p>Confirmer mot de passe</p>
                    <input
                    type="password"
                    className="rounded-md w-full"
                    placeholder="******"
                    />
                    </div>
                    <div className='flex justify-end w-full '>
                    <button className='p-1 lg:px-6 px-2 bg-darkPink text-center text-white rounded-md '>Enregistrer</button>
                    </div>
                </div>
                  )}
            </div>
            
        </div>
    </div>
    </div>
    </div>
  )
}

export default ProfileUser
