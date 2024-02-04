
// export default SignUp;

import React, { useState, useContext } from 'react';
import robot from '../assets/images/robot.png';
import halfRobot from '../assets/images/halfRobot.png';
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import {  Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const apiUrl = "http://localhost:8000";  // Remplacez par l'URL de votre backend Django



const SignUp = () => {

    const navigate = useNavigate();

    const [jump, setjump] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [mess, setmess] = useState('');

    const [formData, setFormData] = useState({
        Pseudo: '',
        Email: '',
        MotdePasse1: '',
        MotdePasse2: '',
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    

    const handleChange = (e) => {
    const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData); // Add this line
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        fetch(`${apiUrl}/signup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 //'X-CSRFToken': getCSRFTokenFromCookies(),
            },
            body: JSON.stringify(formData),
        })
        .then((response) => {
         
           
            return response.json();     
        })
        .then((data) => {
           
            if (data.message == 'User created successfully!'){
                setjump(true)
                navigate('/user');
               
                 } 
                 setmess(data.error)

        })
        .catch((error) => {
            console.error('Signup failed:', error.message);
             
            // Handle errors
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
                <IoClose className='absolute text-grey text-2xl hidden md:block right-4 top-4'/>
                    <p className='text-3xl font-bold text-center mb-4 md:mb-9'>S'inscrire</p>
                    <form  className='relative'>
                    <input
                    type='text'
                    name='Pseudo'  // Make sure 'name' matches the property in formData
                    value={formData.Pseudo}
                    onChange={handleChange}
                    className='rounded-md w-full border-gray-300'
                    />
                    <label className='absolute placeholder'>Pseudo</label>
                    </form>

                    <form  className='relative mt-5'>
                    <input
                    type='text'
                    name='Email'  // Make sure 'name' matches the property in formData
                    value={formData.Email}
                    onChange={handleChange}
                    className='rounded-md w-full border-gray-300'
                    />
                            <label className='absolute placeholder'>Email</label>
                    </form>

      

                    <form  className='relative mt-5'>
                    <input type={showPassword ? 'text' : 'password'} 
                            name='MotdePasse1'  // Make sure 'name' matches the property in formData
                            value={formData.MotdePasse1}
                            onChange={handleChange}
                           className='rounded-md w-full border-gray-300 '/>
                            <label className='absolute placeholder'>Mot de Passe</label>
                            <button type='button' onClick={togglePasswordVisibility}>
                            {showPassword ? <IoEyeOffSharp className='showPasswordEye'/> : <IoEyeSharp   className='showPasswordEye' />}
                                 </button>
                            
                    </form>

                    <form   className='relative mt-5'>
                        <input type={showPassword ? 'text' : 'password'} 
                            name='MotdePasse2'  // Make sure 'name' matches the property in formData
                            value={formData.MotdePasse2}
                            onChange={handleChange}
                           className='rounded-md w-full border-gray-300 '/>
                            <label className='absolute placeholder'>Mot de Passe</label>
                            <button type='button' onClick={togglePasswordVisibility}>
                            {showPassword ? <IoEyeOffSharp className='showPasswordEye'/> : <IoEyeSharp   className='showPasswordEye' />}
                                 </button>
                            
                    </form>
                    <p className='text-darkPink'>{mess}</p>
                    <button onClick={handleSubmit} className='bg-darkPink w-full h-10 rounded-md mt-5'>
                   <a href="" className='text-white font-bold text-lg'>Créer Compte</a>
                        
                    </button>

                    <div className='mt-4 mb-7 md:mb-0 flex flex-row justify-center'>
                        <p className='text-center mr-1 text-grey text-sm'>Vous avez déjà un compte ?</p>
                        {/* <a href="#" className='text-[#5E6DF5] text-sm'>Se Connecter</a> */}
                        <Link to="/SignIn"><a href="" className='text-[#5E6DF5] text-sm '>Se Connecter</a></Link>
                    </div>
                    
                </div>

            </div>
        </div>
        
        </div>
    );
};

export default SignUp;
