import React, { useState } from 'react'
import robot from'../assets/images/robot.png';
import halfRobot from'../assets/images/halfRobot.png';


import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';




   
const SendCode = () => {
   
    const [Email, setEmail] = useState('');

    
     const handleButton = (e) =>{
        const url = "http://localhost:8000/request-password-reset/";
        e.preventDefault();
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: Email,
          }),
        })
        .then(response => response.json()) // This assumes the response is JSON
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error)); 
     } 
    

  return (
    <div>
    <div className='flex items-center justify-center h-screen w-screen bg-gradient-to-r from-GLbleu via-GLpink to-orange-300 '>
        <div className='flex flex-col md:flex-row bg-white md:h-[80%] w-[80%] md:w-[60%] rounded-2xl shadow-lg '>
            {/* the left part */}
            <div className='relative  md:w-1/2  flex items-center justify-center  bg-gradient-to-b from-GDbleu via-GDpink to-GDyellow rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none md:rounded-bl-2xl'>
            
            <img className=' width-[900] mb-5 hidden md:block' src={robot} alt=""/>
            <img className=' width-[900] md:hidden' src={halfRobot} alt=""/>
            <IoClose className='absolute text-white right-2 top-2 text-4xl md:hidden'/>
            </div>
            {/* the right part */}
            <div className='relative flex flex-col justify-center md:w-2/3 px-3 md:px-10'>
            <IoClose className='absolute text-grey text-2xl hidden md:block right-4 top-4'/>
                <p className='lg:text-2xl text-lg font-bold text-center mb-4 md:mb-9'>Vous avez oublié votre Mot de Passe ?</p>
                <p className='lg:text-md mb-3 text-center lg:mb-4 md:mb-9'>Un code de reinitialisation vous sera envoyé à ce mail {Email} </p>
                <form >
                <form className='relative'>
                    <input  onChange={e => setEmail(e.target.value)} value={Email} type='email' className='rounded-md w-full mb-3 border-gray-300 '/>
                        <label className='absolute placeholder'>Email</label>
                </form>

                <button className='bg-darkPink w-full h-8 mb-3 lg:h-10 rounded-md lg:mt-5' onClick={handleButton}>
                    <Link to="/MDP_oublie" className='text-white text-md font-bold lg:text-lg'>Envoyer Code</Link>
                </button>
                </form>
               

            </div>

        </div>
    </div>
    
    </div>
  )
}

export default SendCode