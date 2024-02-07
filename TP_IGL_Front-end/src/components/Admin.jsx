import React, {useState} from 'react'
import background from "../assets/images/Page-admin.png"
import imageS from "../assets/images/Upload.png"
import imageL from "../assets/images/Loading.png"
import avatar from "../assets/images/Avatar.png"
import imageModifierMod from "../assets/images/ModifierMod.png"
import imageNewMod from "../assets/images/NewMod.png"
import imageDeleteMod from "../assets/images/DeleteMod.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import { MdOutlineDashboard } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
import { FaAddressBook } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import { getUser } from '../userStorage'
import { useNavigate } from 'react-router-dom';

const Admin = () =>  {
  
  const storedUser = getUser();
  const [nav, setNav] =useState(false);
  const [showItems, setShowItems] = useState(false);
  const [ImShift, setImShift] = useState(false);
  const [Upload, setUpload] = useState(true);
  const [NewMod, setNewMod] = useState(false);
  const [DeleteMod, setDeleteMod] = useState(false);
  const [ModifierMod, setModifierMod] = useState(false);

    const[username,setusername] =useState('');
    const[usernameNew,setusernameNew] =useState('');
    const[email,setemail] =useState('');
    const[password,setpassword] =useState('');
    const[Data,setData] =useState('');
    const[dataName,setdataName] =useState('');
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null)
    const storedUser2 =getUser();
    const notify = () => {toast("article uploaded successfuly!",{type:'success'})};
    const notify_err=()=>{toast("error while uploading the article",{type:'error'})}


  const handleChangePW = (e) => {
    setpassword(e.target.value);
    console.log(password);
    };
  const handleChangeE = (e) => {
    setemail(e.target.value);
    console.log(email);
    };
    const handleChangeP = (e) => {
      setusername(e.target.value);
      console.log(username);
    };
    const handleChangePNew = (e) => {
      setusernameNew(e.target.value);
      console.log(usernameNew);
    };
 
    const handleLogout = (e) => {
      e.preventDefault();
      const basicAuthCredentials = btoa(`${storedUser.Pseudo}:${storedUser.MotdePasse}`);
     
      fetch("http://localhost:8000/logout/", {         method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${basicAuthCredentials}`,
          },
      })
      .then((response) => {
          if (!response.ok) {             throw new Error(`HTTP error! Status: ${response.status}`);
          }         return response.json(),
         navigate('/');
 
      })
      .then((data) => {
          console.log('Logout Response:', data);
          
          // Handle successful response, e.g., redirect to login page
      })
      .catch((error) => {         console.error('Logout failed:', error);
          // Handle errors, e.g., show an error message to the user
      });
  };
const handleNewModInfo = (e) =>{
  const url = "http://localhost:8000/create-moderator/";
  e.preventDefault();
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      email: email,
    }),
  })
  .then((response) => response.json(),
  )
  .then((data) => {
  storedUser2.id=data.id
  console.log(data.id)
    if (data.message === 'Moderator created successfully') {
      setData(data.message)
    } else {
      setData('Mail ou Pseudo éxistent déjà')
    }
  });
}


const handleModifierModName = () =>{
  const url = "http://localhost:8000/change_moderator_username/";
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      moderator_username: username,
      new_username: usernameNew,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(username)
    console.log(usernameNew)
    if(data.message == 'Username changed successfully')
    {setData(data.message)}else{
      setData('Pseudo déjà existant')
    }
 
  });
}
const handleModifierModPW = () =>{
  const url = "http://localhost:8000/change_moderator_password/";

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      moderator_username: username,
      new_password: password,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    if(data.message == 'Password changed successfully')
    {setData(data.message)}else{
      setData('Pseudo déjà existant')
    }
 
  });
}
const handleDelete = () =>{
  const url = "http://localhost:8000/remove-moderator/";
  fetch(url,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    }),
  })
  .then((response) => 
    response.json())
  .then((data) => {
    console.log(data)
    if (data.message == 'Moderator removed successfully') {
      setData(data.message)
    } else {
      setData(data.error)
    }

  });
}
//Wrapper Fucntion
const handleClick = (e)=>{ 
  handleModifierModPW(e);
  handleModifierModName();
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
 const handleUploadArticle = () => {
    const file = selectedFile;
    console.log(file)
    const formData = new FormData();
    formData.append('uploaded_file', file);
    console.log(formData.data)
    if (file){
    fetch('http://localhost:8000/upload-file/', {
    method: 'POST',
    headers: {
     // 'Content-Type':'multipart/form-data; boundary=----WebKitFormBoundary7ZaI7SkA4ubYG8Uw'
    },
    body: formData
  })
  .then(response => {
    console.log(response.data)
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('File upload failed');
    }
  })
  .then(data => {
    console.log('Server response:', data);
    setData(data.message);
    notify()
  })
  .catch(error => {
    console.error('Error uploading file:', error);
    notify_err()
  });}
  else{
    console.log("no file selected")
  }
 }
  const handleListItemClick = () => {
    setShowItems(!showItems);
  };
  const handleModifierMod= () => {
    setData('');
    setdataName('');
    setModifierMod(true);
    setNewMod(false);
    setUpload(false);
    setDeleteMod(false);
  };
  const handleDeleteMod = () => {
    setData('');
    setdataName('');
    setDeleteMod(true);
    setNewMod(false);
    setUpload(false);
    setModifierMod(false);
  };
  const handleNewMod = () => {
    setData('');
    setdataName('');
    setNewMod(true);
    setUpload(false);
    setModifierMod(false);
    setDeleteMod(false);
  };

  const handleImShift = () => {
    setImShift(!ImShift);

  };
  const handleUpload = () => {
    setData('');
    setdataName('');
    setUpload(true);
    setNewMod(false);
    setDeleteMod(false);
    setShowItems(false);
    setModifierMod(false);
  };
  const handleNav = () =>{
    setNav(!nav)
  }
  const handlenotifiermoderateur = () => {
  
  
    const csrfToken = getCSRFTokenFromCookies();

   fetch('http://localhost:8000/notify-moderators/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFTokenFromCookies(),
          },
  });
  
        
}  
  return (
    
    <div className='flex flex-col bg-gradient-to-r lg:h-screen h-screen w-screen from-GLbleu via-GLpink to-orange-300   '>
        <ToastContainer />
      <div className='flex flex-row justify-center items-center space-x-8 w-full h-full'> 

       {/*Barre des d'actions (Menu) */}
        <div className='w-[15%] rounded-2xl bg-opacity-30 h-[80%] mt-10  bg-white hidden lg:block '>
          <div className='flex flex-col justify-between items-center h-auto w-auto'>
              <div className='flex flex-row justify-center  py-1  mt-4 bg-darkPink rounded-md w-[80%]'>
               < MdOutlineDashboard className='mt-1 ' size={20} color='white'/>
               <p className=' text-2 text-white font-bold'>Dashboard</p>
              </div>
             <ul className=' flex-col mt-5 h-full w-full'>
                 <div className={Upload ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink ' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-gray '}>
                    <FiUpload color='#AA336A' className='mt-1 ' size={17}/>
                    <li onClick={handleUpload} className=' text-black'>Upload</li>  
                 </div>
                <div className={!showItems ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                 <FaAddressBook color='#AA336A' className='mt-1 ' size={17}/>
                  <li onClick={handleListItemClick} className='text-black'>Modérateurs</li>
                </div>
              
              
              {showItems && (
                            <ul className='ml-3'>
                                  <div className={!NewMod ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                                    <MdOutlineAddBox color='#AA336A' className='mt-1 ' size={17}/>
                                    <li onClick={()=>handleNewMod} className='text-black'>Nouveau</li>
                                 </div>
                                 <div className={!ModifierMod ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                                    <IoSettingsOutline color='#AA336A' className='mt-1 ' size={17}/>
                                    <li onClick={()=>handleModifierMod}  className='text-black'>Modifier</li>
                                   </div>
                                   <div className={!DeleteMod ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                                    <MdOutlineDeleteForever color='#AA336A' className='mt-1 ' size={17}/>
                                    <li onClick={()=>handleDeleteMod()}  className='text-black'>Supprimer</li>
                                   </div>
                              
                            </ul>

                                 ) }
              <div className='flex flex-row mx-8 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer'>
                <LuLogOut color='#AA336A' className='mt-1 ' size={17}/>
                <Link to='/'><li onClick={handleLogout} className=' text-black'>Déconnecter</li></Link>

              </div>
              </ul>
          </div>
        </div> 

        {/*La fenêtre des actions et résultats*/}
       
       <div className='flex flex-col justify-center w-full h-[95%] space-y-2  lg:w-[60%]'>
          <div className='flex-row '>
           {/*Boutton Menu dans le cas mobile*/}
           <div onClick={handleNav} className='lg:hidden'>
            {nav ? <IoMenu color='white' size={25}/> : <IoMenu color='white' size={25}/> }
           </div>
           <h5 className='text-white text-opacity-70 font-bold text-2xl '>Dashboard</h5>
          </div>
          
          <div className="flex flex-col items-center justify-center rounded-2xl max-w-auto h-[80%] w-[95%] mt-11 bg-white">
          {Upload && ( <div className="flex flex-col justify-center items-center space-y-10 h-full w-full">
             <div className='flex flex-row  items-center w-[60%] '>
             <form onSubmit={e=>e.preventDefault()} encType='multipart/form-data'>
               <input
                type="file"
                name="uploaded_file"
                id='uploaded_file'
                className=" w-[75%] rounded-l-xl border-b-2 border-t-2 border-l-2  "
                onChange={handleFileChange}/> 
               <button onClick={handleUploadArticle}  style={{ position:'relative',fontSize: 'auto', overflow:'hidden' }} className='fixed h-full py-[2.1%] w-[25%] border-b-2  border-r-2 bg-darkPink rounded-r-xl text-white text-size-auto '>Upload</button>
               </form>
              </div>
              
              <img className='h-[60%]' src={!ImShift ? imageS : imageL } alt='/' />
             
            </div>
             )}
             {ModifierMod && ( <div className="flex flex-col justify-center items-center space-y-3 max-h-[80%]">
             <div className='flex flex-col justify-center items-center space-y-4  max-h-full w-[80%] mt-[-5%]'>
             <img className='h-[35%]' src={imageModifierMod} alt='/' />
               <input
                type="text"
                className="py-2 w-[75%] rounded-md text-black"
                placeholder="Pseudo Actuel"
                name='moderator_username'
                value={username}
                onChange={handleChangeP}
               />
                 <input
                type="text"
                className="py-2 w-[75%] rounded-md text-black"
                placeholder="Nouveau Pseudo"
                name='moderator_username'
                value={usernameNew}
                onChange={handleChangePNew}
               />
                <input
                type="password"
                name='moderator_username'
                className="py-2 w-[75%] rounded-md"
                placeholder="Nouveau Mot de Passe"
                value={password}
                onChange={handleChangePW}
               />
               <p className='text-darkPink'>{Data}</p>
               <p className='text-darkPink'>{dataName}</p>
               <button type='button' onClick={handleClick} className='p-1 px-7 bg-darkPink text-center text-white rounded-md '>Enregistrer</button>
     
              </div>
             
            </div>
             )}
                {NewMod && ( <div className="flex flex-col justify-center items-center space-y-10 h-full w-full">
             <div className='flex flex-col justify-center items-center space-y-5 w-[80%] mt-[-5%]'>
               <img className='h-[33%]' src={imageNewMod} alt='/' />
             
               <input
                type="text"
                className="py-2 w-[75%] rounded-md text-black"
                placeholder="Pseudo"
                name='username'
                value={username}
                onChange={handleChangeP}
               />
                <input
                type="email"
                name='email'
                className="py-2 w-[75%] rounded-md"
                placeholder="Email"
                value={email}
                onChange={handleChangeE}
               />
               <p className='text-darkPink'>{Data}</p>
               <button type='button' onClick={handleNewModInfo} className='p-1 px-7 bg-darkPink text-center text-white rounded-md '>Ajouter</button>
     
              </div>
             
            </div>
             )}

          {DeleteMod && ( <div className="flex flex-col justify-center items-center space-y-10 h-full w-full">
             <div className='flex flex-col justify-center items-center space-y-5 h-full w-[80%] mt-[-5%]'>
               <img className='h-[33%]' src={imageDeleteMod} alt='/' />
             
               <input
                type="text"
                className="py-2 w-[75%] rounded-md text-black"
                placeholder="Pseudo"
                name='username'
                value={username}
                onChange={handleChangeP}
               />
                 <p className='text-darkPink'>{Data}</p>
               <button type='button' onClick={handleDelete} className='p-1 px-7 bg-darkPink text-center text-white rounded-md '>Supprimer</button>
     
              </div>
             
            </div>
             )}

          </div>
        </div>
          
           {/*NavBar for a small frame */}
           
       
           <div className={!nav ? ' fixed left-0 top-20 w-[40%] h-full border-r border-gray-900 bg-white lg:hidden' : 'fixed left-[-100%]'}>
              <ul className=' flex-col pt-10 h-full w-full' style={{overflow: 'hidden'}}>
                 <div className={Upload ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink ':'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 '}>
                    <FiUpload color='#AA336A' className='mt-1 ' size={17}/>
                  <li onClick={handleUpload} className=' text-black'>Upload</li>
                </div>
                <div className={!showItems ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer':'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink '}>
                 <FaAddressBook color='#AA336A' className='mt-1 ' size={17}/>
                  <li onClick={handleListItemClick} className='text-black'>Modérateurs</li>
                </div>
                {showItems && (
                            <ul className='ml-3'>
                                  <div className={!NewMod ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                                    <MdOutlineAddBox className='mt-1 ' size={17}/>
                                    <li onClick={handleNewMod} className='text-black'>Nouveau</li>
                                 </div>
                                 <div className={!ModifierMod ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                                    <IoSettingsOutline className='mt-1 ' size={17}/>
                                    <li onClick={handleModifierMod}  className='text-black'>Modifier</li>
                                   </div>
                                   <div className={!DeleteMod ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                                    <MdOutlineDeleteForever className='mt-1 ' size={17}/>
                                    <li onClick={handleDeleteMod}  className='text-black'>Supprimer</li>
                                   </div>
                              
                            </ul>

                                 ) }
                <div className='flex flex-row mx-8 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer'>
                <LuLogOut color='#AA336A' className='mt-1 ' size={17}/>
                <Link to='/'><p onClick={handleLogout} className=' text-black'>Déconnecter</p></Link>
               </div>
              </ul>
              
              
            </div> 
      </div>  
     {/*Image Profile top right corner*/}
      <div onClick={handleNav} style={{position: 'absolute',top: 15,right: 10, }}>
      <Link to='/ProfileAdminMod'><img style={{borderRadius:'50%', height:'40px',width:'40px',objectFit:'cover'}} src={avatar} alt='/'/></Link>
          </div>
    </div>
     

  
    
    
  )
}

export default Admin