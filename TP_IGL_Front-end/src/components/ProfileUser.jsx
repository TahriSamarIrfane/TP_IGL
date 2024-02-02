import React, { useState } from 'react'

import avatar from "../assets/images/images2.jpg"
import logo from "../assets/images/Logo.png"

import { MdOutlinePersonOutline } from "react-icons/md";
import { LuKeyRound } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { saveUser,getUser } from '../userStorage.jsx';
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';



const apiUrl = "http://localhost:8000";  // Remplacez par l'URL de votre backend Django

const ProfileUser = () => {

  const storedUser = getUser();

  const [ModifierInfo,setModifierInfo] = useState(true);
  const [ModifierPwd, setModifierPwd] = useState(false);
  const [ModifierPseudo, setModifierPseudo] = useState(false);
  const basicAuthCredentials = btoa(`${storedUser.Pseudo}:${storedUser.MotdePasse}`);

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


  const handleLogout = (e) => {
    e.preventDefault();
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


const handleSubmit = (e) => {
  
    e.preventDefault();
    console.log(storedUser.Pseudo);
    console.log(storedUser.MotdePasse);
    const basicAuthCredentials = btoa(`${storedUser.Pseudo}:${storedUser.MotdePasse}`);
    fetch("http://localhost:8000/change-password/", { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${basicAuthCredentials}`,
        },
        body: JSON.stringify(formData),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then((data) => {
        console.log('Server Response:', data);
        // Handle successful response
    setFormData({
         old_password: '',
         new_password: '',
        });    
    })
    .catch((error) => {
        console.error('failed:', error);
        if (error.response) {
          // If the response is available, log its text
          error.response.text().then((text) => console.log('Response Text:', text));
      } else {
          // If there is no response, log a general error message
          console.log('No response received.');
      }
    });
    
};

const [form, setForm] = useState({
  username:''
});

const handleChanges = (e) => {
const { name, value } = e.target;
  setFormData({ ...form, [name]: value });
  console.log(form); // Add this line
};


const handleSubmits = (e) => {
  e.preventDefault();
  const basicAuthCredentials = btoa(`${storedUser.Pseudo}:${storedUser.MotdePasse}`);
  fetch("http://localhost:8000/change-username/", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${basicAuthCredentials}`,
          
      },
      body: JSON.stringify(form),
  })
  .then((response) => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
  })
  .then((data) => {
      console.log('Server Response:', data);
      // Handle successful response
  setFormData({
      username:''
      });    
  })
  .catch((error) => {
      console.error('failed:', error);
      // Handle errors
  });
  
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

  fetch("http://localhost:8000/delete-account/", {
    method: 'DELETE',
    headers: {

      'Content-Type': 'application/json',
      'Authorization': `Basic ${basicAuthCredentials}`,
      'X-CSRFToken': getCSRFTokenFromCookies(),

    },
    body: JSON.stringify({ Pseudo: usernameToDelete }),
  })

  .then((response) => {
    console.log('Server Response:', response);

    if (response.status === 204) {
      // Successful DELETE, handle accordingly
      console.log('Account deleted successfully');
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
            <li onClick={handleDeleteAccount} className=' text-black border-b-2 hover:border-b-darkPink cursor-pointer lg:text-md text-10'>Supprimer Compte</li>
             </div>
              <div className='flex flex-row mx-8 mb-3 space-x-2 py-1'>
              <LuLogOut className='mt-1 ' color='DF1477' size={20}/>
              <li onClick={handleLogout} className=' text-black border-b-2 hover:border-b-darkPink cursor-pointer lg:text-md text-10'>Se déconnecter</li>
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
                  name='username'
                  value={form.username}
                  onChange={handleChanges} 
                  className="rounded-md w-[80]"
                  placeholder={storedUser.Pseudo}

                 
                  /> </div> )}
                  {!ModifierPseudo && (<div className='border-2 p-2 rounded-md border-grey border-opacity-35'> <p on onClick={handleModifierPseudo}>{storedUser.Pseudo}</p></div>
                )}
                  
                  <p >Email</p>
                 <div className='border-2 p-2 rounded-md border-grey border-opacity-35'> <p>{storedUser.Email}</p></div>
                  </div>
                  {ModifierPseudo &&( <div className='flex justify-end w-full '>
                  <button onClick= {handleSubmits} className='p-1 lg:px-6 px-2 bg-darkPink text-center text-white rounded-md '>Enregistrer</button>
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
                   name='old_password'  // Make sure 'name' matches the property in formData
                   value={formData.old_password}
                   onChange={handleChange}
                   className="rounded-md w-[80%] "
                   placeholder={storedUser.MotdePasse}
                  />
                  </div>
                  <p>Nouveau mot de passe</p>
                  <input
                   type="password"
                   name='new_password'  // Make sure 'name' matches the property in formData
                   value={formData.new_password}
                   onChange={handleChange}
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
                  <button onClick={handleSubmit}  className='p-1 lg:px-6 px-2 bg-darkPink text-center text-white rounded-md '>Enregistrer</button>
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