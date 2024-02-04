

// export default SignIn;

import React, { useState } from 'react';
import robot from'../assets/images/robot.png';
import halfRobot from'../assets/images/halfRobot.png';
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import { useUser } from '../UserContext';
import { saveUser } from '../userStorage';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const apiUrl = "http://localhost:8000";

const SignIn = () => {
    
    const navigate = useNavigate();
    const [jump, setjump] = useState(false);
    const [jumpM, setjumpM] = useState(false);
    const [jumpA, setjumpA] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [mess, setmess] = useState('');

    const [formData, setFormData] = useState({
        Pseudo: '',
        MotdePasse: '',
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleClick = (e) => {
        handleSubmit(e)
      
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${apiUrl}/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => {
           
            return response.json();
        })
        .then((data) => {
        const userData = {
                Pseudo: formData.Pseudo,
                MotdePasse: formData.MotdePasse,
                Email: data.email,
        };
         saveUser(userData);

        if (data.message === 'Authentification réussie'){
            setjump(true)
            navigate('/user');
        } else{
        if ( data.message === 'Authentification en tant que modérateur réussie') {
            setjumpM(true)
            navigate('/modérateur');
        } else{
        if(userData.Pseudo==='SurfeyAdmin' && userData.MotdePasse==='admin'){ 
            setjumpA(true)
            navigate('/admin');
        }else {
            setmess("Nom d'utilisateur ou mot de passe incorrect")}}}
          
        })
        .catch((error) => {
            console.error('Login failed:', error);
        });  
    }; 

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
                <IoClose  className='absolute text-grey text-2xl hidden md:block right-4 top-4'/>
                    <p className='text-3xl font-bold text-center mb-4 md:mb-9'>Se Connecter</p>
                    <form >
                    <form className='relative'>
                        <input type='text' 
                           name='Pseudo'  // Make sure 'name' matches the property in formData
                           value={formData.Pseudo}
                           onChange={handleChange}
                           className='rounded-md w-full border-gray-300 '/>
                            <label className='absolute placeholder'>Pseudo</label>
                    </form>

                    <form className='relative mt-5'>
                        <input type={showPassword ? 'text' : 'password'} 
                         name='MotdePasse'  // Make sure 'name' matches the property in formData
                         value={formData.MotdePasse}
                         onChange={handleChange}
                         className='rounded-md w-full border-gray-300 '/>
                            <label className='absolute placeholder'>Mot de Passe</label>
                            <button  type='button' onClick={togglePasswordVisibility}>
                            {showPassword ? <IoEyeOffSharp className='showPasswordEye'/> : <IoEyeSharp   className='showPasswordEye' />}
                                 </button>
                            
                    </form>

                    <p className='text-darkPink'>{mess}</p>
                    <button id='login' onClick={handleClick} className='bg-darkPink w-full h-10 rounded-md mt-5'>
                      <a href="" className='text-white font-bold text-lg'>Se Connecter</a>
                   </button>
                    </form>
                    <div className='mt-5 mb-7 md:mb-0 flex flex-col items-center '>
                    <div className='flex flex-row'>
                    <p className='text-center mr-1 text-grey text-sm'>Vous n'avez pas un compte?</p>
                    {/* <p className='text-[#5E6DF5] text-sm'>S'inscrire</p> */}
                    <Link to="/SignUp"><a href="" className='text-[#5E6DF5] text-sm '>S'inscrire</a></Link>
                    </div>   
                    <a href="" className='text-lightGrey font-bold text-lg'>__________________________</a>
                    <Link to="/SendCode"><a href="" className='text-[#5E6DF5] text-sm '>Mot de passe Oublié ?</a></Link>
                    </div>

                </div>

            </div>
        </div>
        
        </div>
    );
};

export default SignIn;