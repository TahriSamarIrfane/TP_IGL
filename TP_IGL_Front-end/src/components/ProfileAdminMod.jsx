import React, { useState } from 'react'

import avatar from "../assets/images/images2.jpg"
import background from "../assets/images/Page-admin.png"
import logo from "../assets/images/Logo.png"
import { MdOutlinePersonOutline } from "react-icons/md";
import { LuKeyRound } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import { saveUser,getUser } from '../userStorage';
import { useNavigate } from 'react-router-dom';

const ProfileAdminMod = () => {
  
  const storedUser = getUser();
  const basicAuthCredentials = btoa(`${storedUser.Pseudo}:${storedUser.MotdePasse}`);
  const [ModifierInfo,setModifierInfo] = useState(true);
  const [ModifierPwd, setModifierPwd] = useState(false);
  const [ModifierPseudo, setModifierPseudo] = useState(false);
  const navigate = useNavigate();
  const handleModifierPseudo= () => {
    setModifierPseudo(!ModifierPseudo);
  };
  const handleModifierInfo= () => {
    setModifierInfo(true);
    setModifierPwd(false);
  };
  const handleModifierPwd= () => {
    setModifierPwd(true);
    setModifierInfo(false);
  };

  const handleLogout = () => {

    const basicAuthCredentials = btoa(`${storedUser.Pseudo}:${storedUser.MotdePasse}`);
    
    fetch("http://localhost:8000/logout/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${basicAuthCredentials}`,
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log('Logout Response:', data);
        navigate('/')
        // Handle successful response, e.g., redirect to login page
    })
    .catch((error) => {
        console.error('Logout failed:', error);
        // Handle errors, e.g., show an error message to the user
    });
};

  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    username:storedUser.Pseudo,
});

const handleChange = (e) => {
const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    console.log(formData); // Add this line
};


const [form, setForm] = useState({
  username:''
});

const handleChanges = (e) => {
const { name, value } = e.target;
  setFormData({ ...form, [name]: value });
  console.log(form); // Add this line
};

const fetchUserData = async () => {
  try {
    const response = await fetch(`${apiUrl}/user/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${storedUser.MotdePasse}`, // Assuming MotdePasse is your authentication token
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const userData = await response.json();
    setUser(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

function getCSRFTokenFromCookies() {
  // Split cookies into an array
  const cookiesArray = document.cookie.split(';');

  // Loop through cookies to find the one containing the CSRF token
  for (let i = 0; i < cookiesArray.length; i++) {
    const cookie = cookiesArray[i].trim();

    // Check if the cookie starts with the name 'csrftoken'
    if (cookie.startsWith('csrftoken=')) {
      // Extract and return the CSRF token value
      return cookie.substring('csrftoken='.length, cookie.length);
    }
  }

  // Return null if CSRF token is not found
  return null;
}


const handleDeleteAccount = () => {
  
  const basicAuthCredentials = btoa(`${storedUser.Pseudo}:${storedUser.MotdePasse}`);
  const usernameToDelete = storedUser.Pseudo;  

  const csrfToken = getCSRFTokenFromCookies();
  console.log(storedUser.Pseudo);
  console.log(storedUser.MotdePasse);
  fetch("http://localhost:8000/delete-account/", {
    method: 'DELETE',
    headers: {

      'Content-Type': 'application/json',
      'Authorization': `Basic ${basicAuthCredentials}`,
      'X-CSRFToken': csrfToken,

    },
    body: JSON.stringify({ Pseudo: usernameToDelete, }),
  })

  .then((response) => {
    console.log('Server Response:', response);

    if (response.status === 204) {
      // Successful DELETE, handle accordingly
      console.log('Account deleted successfully');
      navigate('/')
      return;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  })
  .then((data) => {
    console.log('Delete Account Response:', data);
    // Handle successful response (if needed)
  })
  .catch((error) => {
    console.error('Delete Account failed:', error);
    // Handle errors
  });
};

  
  return (
    <div className='flex flex-col bg-gradient-to-r lg:h-screen h-full w-screen from-GLbleu via-GLpink to-orange-300   '> 

      
      <div className='flex flex-row p-2 justify-between mt-4 '>
          <div  className='flex flex-row  justify-start space-y-2 space-x-3'>
          <img  src={logo} style={{borderRadius:'50%', height:'40px',width:'40px',objectFit:'cover'}} alt='/'/>
          <h className='md:hidden lg:block  font-bold text-gray-600 text-xl'>Surfey</h>  
          </div>
         
        </div>
        <div className='flex justify-center w-full h-[76%] '>
        <div className=' rounded-2xl w-[80%] lg:h-full bg-white h-screen'>

        <div className='flex flex-row justify-center items-center h-full  '>
       
          <div className='flex flex-col justify-center items-center px-[1.4%] w-[40%]'>
            
           
            <div className=' flex flex-col w-full  '>
            <p className='lg:px-[13.8%] py-3 px-[12%] lg:text-3xl text-xl text-center font-bold  ' style={{ fontFamily:'tahoma' }}>Mon Profile</p>
    
                  <div className='flex p-4 justify-center  items-center '>
                    <img className='opacity-70 p-2 ' style={{borderRadius:'50%', height:'120px',width:'120px',objectFit:'cover'}}  src={avatar} alt='/'/>
                        <p className='lg:px-7 font-bold lg:text-xl px-3 text-black text-opacity-40 text-[80%]' style={{position:'absolute'}}>Modifier</p>
                        </div> 
                        </div>
                <ul className='flex flex-col'>
                 <div className='flex flex-row mx-8 mb-3 space-x-2 py-1'>
                    <MdOutlinePersonOutline className='mt-1  ' color='DF1477' size={20}/>
                    <li onClick={handleModifierInfo}  className={!ModifierInfo ? ' text-black border-b-2 hover:border-b-darkPink cursor-pointer lg:text-md text-10' :  'text-black border-b-2  lg:text-md text-10 border-b-darkPink'}>Informations Personnelles</li>  
                 </div>
                
                <div className='flex flex-row mx-8 mb-3 space-x-2 py-1'>
              <MdOutlineDeleteForever className='mt-1 ' color='DF1477' size={20} />
              <li onClick={()=>handleDeleteAccount()}  className=' text-black border-b-2 hover:border-b-darkPink cursor-pointer lg:text-md text-10'>Supprimer Compte</li>
               </div>
                <div className='flex flex-row mx-8 mb-3 space-x-2 py-1'>
                <Link to='/'><LuLogOut className='mt-1 ' color='DF1477' size={20}/></Link>
                <li onClick={()=>handleLogout()} className=' text-black border-b-2 hover:border-b-darkPink cursor-pointer lg:text-md text-10'>Se déconnecter</li>
              </div>
          
                </ul> 
            </div>
             
             
                <div className='flex flex-col space-y-2   h-[80%] border-l-grey border-opacity-35 border-l-2 px-[1%]  w-[50%]' >
                {/* /*******Modifier Informations********** */}
                  {ModifierInfo && (<div className='flex flex-col h-full space-y-6  px-[10%] '>
                  <div className='flex flex-row space-x-2 lg:px-[4%] py-3 px-[6%] text-center mt-5 '>
                    <MdOutlinePersonOutline className='mt-1  ' color='DF1477' size={36}/>
                    <p  className=' text-black mt-2 lg:text-2xl  text-100 '>Informations Personnelles</p>  
               
                  </div>
                    <div className='flex flex-col space-y-1 justify-start '>
                    <p >Pseudo</p>
                   <div className='border-2 p-2 rounded-md border-grey border-opacity-35'><p>{storedUser.Pseudo}</p></div>
                    </div>
                    <div className='flex flex-col space-y-1 justify-start '>
                    <p >Email</p>
                   <div className='border-2 p-2 rounded-md border-grey border-opacity-35'><p>{storedUser.Email}</p></div>
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

export default ProfileAdminMod