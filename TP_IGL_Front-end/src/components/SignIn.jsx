import React, { useState } from 'react';


import robot from'../assets/images/robot.png';
import halfRobot from'../assets/images/halfRobot.png';



import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';

const SignIn = () => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    return (
        <div>
        <div className='flex items-center justify-center h-screen w-screen bg-gradient-to-r from-GLbleu via-GLpink to-orange-300 '>
            <div className='flex flex-col md:flex-row bg-white md:h-[80%] w-[80%] md:w-[60%] rounded-2xl shadow-lg '>
                {/* the left part*/}
                <div className='relative  md:w-1/2  flex items-center justify-center  bg-gradient-to-b from-GDbleu via-GDpink to-GDyellow rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none md:rounded-bl-2xl'>
                
                <img className=' width-[900] mb-5 hidden md:block' src={robot} alt=""/>
                <img className=' width-[900] md:hidden' src={halfRobot} alt=""/>
                <IoClose className='absolute text-white right-2 top-2 text-4xl md:hidden'/>
                </div>
                {/* the right part*/ }
                <div className='relative flex flex-col justify-center md:w-2/3 px-3 md:px-10'>
                <IoClose className='absolute text-grey text-2xl hidden md:block right-4 top-4'/>
                    <p className='text-3xl font-bold text-center mb-4 md:mb-9'>Se Connecter</p>
                    <form className='relative'>
                        <input type='text' className='rounded-md w-full border-gray-300 '/>
                            <label className='absolute placeholder'>Pseudo</label>
                    </form>

                    <form className='relative mt-5'>
                        <input type={showPassword ? 'text' : 'password'} className='rounded-md w-full border-gray-300 '/>
                            <label className='absolute placeholder'>Mot de Passe</label>
                            <button type='button' onClick={togglePasswordVisibility}>
                            {showPassword ? <IoEyeOffSharp className='showPasswordEye'/> : <IoEyeSharp   className='showPasswordEye' />}
                                 </button>
                            
                    </form>


                    <button className='bg-darkPink w-full h-10 rounded-md mt-5'>
                        <Link to="/user" className='text-white font-bold text-lg'>Se Connecter</Link>

                    </button>

                    <div className='mt-5 mb-7 md:mb-0 flex flex-col items-center '>
                    <div className='flex flex-row'>
                    <p className='text-center mr-1 text-grey text-sm'>Vous n’avez pas de compte ?</p>
                    <Link to="/SignUp" className='text-[#5E6DF5] text-sm'>Créer Compte</Link>
                    </div>   
                    <a href="" className='text-lightGrey font-bold text-lg'>__________________________</a>
                    <a href="" className='text-[#5E6DF5] text-sm '>Mot de passe oublié ?</a>
                    </div>

                </div>

            </div>
        </div>
        
        </div>
    );
};

export default SignIn;