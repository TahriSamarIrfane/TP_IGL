import React, { useState } from 'react'


import robot from'../assets/images/robot.png';
import halfRobot from'../assets/images/halfRobot.png';



import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";

import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';

const MDP_oublie = () => {
  const { data } = useParams();
 
    const [showPassword, setShowPassword] = useState(false);
const [Password, setPassword] = useState('');
const [Email, setEmail] = useState('');
const [Code, setCode] = useState('');
const [ConfirmPassword, setConfirmPassword] = useState('');

 const email =localStorage.getItem('email');
const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleButton2 = (e) =>{
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
 const handleButton = (e) =>{
    const url = "http://localhost:8000/reset-password/";
    e.preventDefault();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: Email,
        reset_code: Code,
        new_password: Password,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
   
    }); 
 } 
 const compareResult = Password.localeCompare(ConfirmPassword);
 const areEqual = compareResult === 0;

  return (
    <div>
    <div className='flex items-center justify-center h-screen w-screen bg-gradient-to-r from-GLbleu via-GLpink to-orange-300 '>
        <div className='flex flex-col md:flex-row bg-white md:h-[80%] w-[80%] md:w-[60%] rounded-2xl shadow-lg '>
            {/* the left part */}
            <div className='relative  md:w-1/2  flex items-center justify-center  bg-gradient-to-b from-GDbleu via-GDpink to-GDyellow rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none md:rounded-bl-2xl'>
            
            <img className=' width-[900] mb-5 hidden md:block' src={robot} alt=""/>
            <img className=' width-[900] md:hidden' src={halfRobot} alt=""/>
              </div>
            {/* the right part */}
            <div className='relative flex flex-col justify-center md:w-2/3 px-3 md:px-10'>
               <p className='lg:text-3xl text-md font-bold text-center mb-2 md:mb-9'>Mot De Passe Oublié</p>
                <form >
                <form className='relative'>
                    <input  onChange={e => setEmail(data)} value={email} type='email' className='rounded-md w-full h-7 lg:h-full border-gray-300 '/>
                        <label className='absolute placeholder'>Email</label>
                </form>

                <form className='relative mt-5'>
                    <input onChange={e => setCode(e.target.value)}  value={Code} type='text' className='rounded-md w-full h-7 lg:h-full text-darkPink border-gray-300  '/>
                        <label className='absolute placeholder'>Code</label>  
                </form>
                <form className='relative mt-5'>
                    <input onChange={e => setPassword(e.target.value)} type="password" value={Password} className='rounded-md w-full h-7 lg:h-full border-gray-300  '/>
                        <label className='absolute placeholder'>Nouveau Mot de Passe</label>
                        <button type='button' onClick={togglePasswordVisibility}>
                        
                             </button>
                        
                        
                </form>
                <form className='relative mt-5'>
                    <input  onChange={e => setConfirmPassword(e.target.value)} type="password" value={ConfirmPassword} className='rounded-md w-full h-7 lg:h-full border-gray-300  '/>
                        <label className='absolute placeholder'>Confirmer Mot de Passe</label>
                        <button type='button' onClick={togglePasswordVisibility}>
                        
                             </button>
                        
                </form>

                {areEqual ? <button className='bg-darkPink  h-5 w-full lg:h-10 rounded-md mt-4' onClick={handleButton}>
                    <p className='text-white font-bold text-[90%] lg:text-lg'>Valider</p>
                </button> : <p>Mot de passe pas conforment</p>}
                <div className=' flex flex-row justify-center items-center space-x-2 '>
                    <p>Donner Email pour </p> 
                    <Link to="/SendCode" className=' mr-4 text-sd text-darkPink'  style={{ textDecoration: 'underline' }} >Renvoyer le code</Link>
                </div>
                
                </form>
               

            </div>

        </div>
    </div>
    
    </div>
  )
}

export default MDP_oublie