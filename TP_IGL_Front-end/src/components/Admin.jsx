import React, {useState} from 'react'
import background from "../assets/images/Page-admin.png"
import imageS from "../assets/images/Upload.png"
import imageL from "../assets/images/Loading.png"
import avatar from "../assets/images/Avatar.png"
import imageSearch from "../assets/images/Search.png"
import imageNewMod from "../assets/images/NewMod.png"


import { MdOutlineDashboard } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
import { FaAddressBook } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";
import { TiDeleteOutline } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { LuSave } from "react-icons/lu";

const Admin = () =>  {
  const [nav, setNav] =useState(false);
  const [showItems, setShowItems] = useState(false);
  const [ImShift, setImShift] = useState(false);
  const [Upload, setUpload] = useState(true);
  const [NewMod, setNewMod] = useState(false);
  const [SearchMod, setSearchMod] = useState(false);
  const [SearchRes, setSearchRes] = useState(false);
  const [ModifierMod, setModifierMod] = useState(false);

  const data = [
    { Name: 1, Email: 'Item 1',Pwd:'12334' },
    { Name: 2, Email: 'Item 2',Pwd:'12334' },
    { Name: 3, Email: 'Item 3',Pwd:'12334' },
    { Name: 4, Email: 'Item 4',Pwd:'12334' },
    { Name: 5, Email: 'Item 5',Pwd:'12334' },
    { Name: 6, Email: 'Item 6',Pwd:'12334' },
    { Name: 4, Email: 'Item 4',Pwd:'12334' },
    { Name: 5, Email: 'Item 5',Pwd:'12334' },
    { Name: 6, Email: 'Item 6',Pwd:'12334' },
  ];

  const handleListItemClick = () => {
    setShowItems(!showItems);

  };
  const handleModifierMod= () => {
    setModifierMod(!ModifierMod);

  };
  const handleSearchRes = () => {
    setSearchRes(!SearchRes);

  };
  const handleNewMod = () => {
    setNewMod(true);
    setUpload(false);
    setSearchMod(false);
  };
  const handleSearchMod = () => {
    setSearchMod(true);
    setNewMod(false);
    setUpload(false);
  };
  const handleImShift = () => {
    setImShift(!ImShift);
  };
  const handleUpload = () => {
    setUpload(true);
    setNewMod(false);
    setSearchMod(false);
    setShowItems(false);
  };
  const handleNav = () =>{
    setNav(!nav)
  }
  return (
  <div className= ' bg-black w-ful h-full'>
    <div className='w-full h-full bg-no-repeat max-auto' style={{backgroundImage: `url(${background})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%' , height: '100vh'}}>
     <div className='flex flex-row justify-center items-center space-x-8 w-full h-full'> 

       {/*Barre des d'actions (Menu) */}
        <div className='w-[15%] rounded-sm h-[80%] mt-10 bg-white hidden lg:block '>
          <div className='flex flex-col justify-between items-center h-auto w-auto'>
              <div className='flex flex-row justify-center  py-1  mt-4 bg-darkPink rounded-md w-[80%]'>
               < MdOutlineDashboard className='mt-1 ' size={20} color='white'/>
               <p className=' text-2 text-white font-bold'>Dashboard</p>
              </div>
             <ul className=' flex-col mt-5 h-full w-full'>
                 <div className={Upload ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink ' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-gray '}>
                    <FiUpload className='mt-1 ' size={17}/>
                    <li onClick={handleUpload} className=' text-black'>Upload</li>  
                 </div>
                <div className={!showItems ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                 <FaAddressBook className='mt-1 ' size={17}/>
                  <li onClick={handleListItemClick} className='text-black'>Modérateurs</li>
                </div>
              
              </ul>
              {showItems && (
                            <ul className='ml-3'>
                                  <div className={!NewMod ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                                    <MdOutlineAddBox className='mt-1 ' size={17}/>
                                    <li onClick={handleNewMod} className='text-black'>Nouveau</li>
                                 </div>
                                 <div className={!SearchMod ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                                    <IoSearch className='mt-1 ' size={17}/>
                                    <li onClick={handleSearchMod}  className='text-black'>Chercher</li>
                                   </div>
                              
                            </ul>

                                 ) }
              <div className='flex flex-row mx-8 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer'>
                <LuLogOut className='mt-1 ' size={17}/>
                <p className=' text-black'>Déconnecter</p>
              </div>
          </div>
        </div> 

        {/*La fenêtre des actions et résultats*/}
       
       <div className='flex flex-col justify-center w-full h-[80%] space-y-2   lg:w-[60%]'>
          <div className='flex-row '>
           {/*Boutton Menu dans le cas mobile*/}
           <div onClick={handleNav} className='lg:hidden'>
            {nav ? <IoMenu color='white' size={25}/> : <IoMenu color='white' size={25}/> }
           </div>
           <h5 className='text-white font-bold text-2xl '>Dashboard</h5>
          </div>
          
          <div className="flex flex-col items-center justify-center bg-opacity-10 max-w-auto h-full w-[95%] mt-11 bg-white">
          {Upload && ( <div className="flex flex-col justify-center items-center space-y-10 h-full w-full">
             <div className='flex flex-row  items-center w-[70%]'>
               <input
                type="url"
                className="py-2 w-[75%] rounded-l-xl"
                placeholder="Enter URL..."
                /> 

                
               <button onClick={handleImShift} style={{ position:'relative',fontSize: 'auto', overflow:'hidden' }} className='fixed h-full py-2 w-[25%] bg-darkPink rounded-r-xl text-white text-size-auto '>Upload</button>
              </div>
              <img className='h-[60%]' src={!ImShift ? imageS : imageL } alt='/' />
             
            </div>
             )}
             {SearchMod && ( <div className="flex flex-col justify-center items-center space-y-10  h-full w-full">
             <div className='searchBar-admin'>
               <input
                type="text"
                className="inputSearch focus:outline-none"
                placeholder="Recherche..."
               />
                <div onClick={handleSearchRes} className=''>
                 <IoSearch className="text-black" size={20} />
                </div>
               
     
              </div>
             {!SearchRes ? (<img className='h-[60%]' src={imageSearch} alt='/' />) : (
              <div className='flex flex-col justify-center space-y-3 w-[80%] h-[70%]'>
               <hr className='w-full'></hr>
                            <ul style={{  overflowY: 'auto' }} className='flex-col items-center space-y-6 p-5 w-full ml-[-1%]'>
                              {data.map((item) => (
                          
                           <div key={item.Name}  className='flex flex-row justify-star items-center h-[35%]  rounded-md bg-white'>
                            <img className="p-2 " style={{ height: '12vh',width: 'auto' }} src={avatar}  alt='/'/>
                            {!ModifierMod && (<ul className='w-full max-h-full'>
                            <li style={{ fontSize: '1rem' }} className="flex flex-row space-x-2 "><p>Nom:</p><p> {item.Name}</p></li>
                            <li style={{ fontSize: '1rem' }} className="flex flex-row space-x-2 "><p>Email:</p><p>{item.Email}</p></li>
                            <li style={{ fontSize: '1rem' }} className="flex flex-row space-x-2 "><p>Mot de Passe:</p><p>{item.Pwd}</p></li> 
                            </ul>  )}
                            {ModifierMod && (<ul className='w-full max-h-full'>
                            <li style={{ fontSize: '1rem' }} className="flex flex-row space-x-1 "><p >Nom:</p>< input  type="text" className=" mt-1 h-4 w-[30%] border-0" placeholder= {item.Name} /></li>
                            <li style={{ fontSize: '1rem' }} className="flex flex-row space-x-1 "><p>Email:</p>< input  type="text" className="h-4 w-[30%] border-0" placeholder= {item.Email} /></li>
                            <li style={{ fontSize: '1rem' }} className="flex flex-row space-x-1 "><p>Mot de Passe:</p>< input  type="text" className="h-4 w-[30%] border-0" placeholder= {item.Pwd} /></li> 
                            </ul>  )}
                            <div className='flex justify-end  w-[20%] ml-[3%]'>
                            <div className='flex flex-col space-y-8'>
                                <div onClick={''} >
                                {!ModifierMod && (<TiDeleteOutline style={{right:0}} color='#DF1477' size={22} />)}
                                </div>
                                  <div onClick={handleModifierMod}>
                                    {!ModifierMod && (<IoSettingsOutline color='#DF1477' size={20}/>)}
                                    {ModifierMod && (<div className='px-1 mt-4 ml-[-4%]'>
                                    <div onClick={handleModifierMod} className='md:hidden'><LuSave color='DF1477' size={20}/></div>
                                    <button onClick={handleModifierMod} className=' bg-darkPink text-center text-white rounded-md hidden md:block '>Sauvegarder</button>
                                      </div>)}
                                  </div>
                              
                              
                            </div>
                            </div>    
                           </div>
                           
                                ))}
                                </ul>
                               
              </div>

             )}
             
            </div>
             )}
                {NewMod && ( <div className="flex flex-col justify-center items-center space-y-10 h-full w-full">
             <div className='flex flex-col justify-center items-center space-y-5 w-[80%] mt-[-5%]'>
               <img className='h-[33%]' src={imageNewMod} alt='/' />
             
               <input
                type="text"
                className="py-2 w-[75%] rounded-md"
                placeholder="Pseudo"
               />
                <input
                type="email"
                className="py-2 w-[75%] rounded-md"
                placeholder="Email"
               />
               <div className='flex flex-row items-center w-[75%]'>
                 <input
                 type="password"
                 className=" w-[90%] rounded-l-md"
                 placeholder="Mot de Passe"
                 />
                 <div onClick={handleNav} className='flex items-center h-full px-3 bg-darkPink rounded-r-md w-[10%]'>
                 <TfiReload size={20} color='white'/>
                 </div>
               </div>
               <button className='p-1 px-7 bg-darkPink text-center text-white rounded-md '>Ajouter</button>
     
              </div>
             
            </div>
             )}
          </div>
        </div>
          
           {/*NavBar for a small frame */}
           
       
           <div className={!nav ? ' fixed left-0 top-20 w-[40%] h-full border-r border-gray-900 bg-white lg:hidden' : 'fixed left-[-100%]'}>
              <ul className=' flex-col pt-10 h-full w-full' style={{overflow: 'hidden'}}>
                 <div className={Upload ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink ':'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 '}>
                    <FiUpload className='mt-1 ' size={17}/>
                  <li onClick={handleUpload} className=' text-black'>Upload</li>
                </div>
                <div className={!showItems ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer':'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink '}>
                 <FaAddressBook className='mt-1 ' size={17}/>
                  <li onClick={handleListItemClick} className='text-black'>Modérateurs</li>
                </div>
                {showItems && (
                            <ul className='ml-6'>
                                  <div className={!NewMod ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                                    <MdOutlineAddBox className='mt-1  ' size={17}/>
                                    <li onClick={handleNewMod} className='text-black'>Nouveau</li>
                                 </div>
                                 <div className={!SearchMod ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                                    <IoSearch className='mt-1 ' size={17}/>
                                    <li onClick={handleSearchMod} className='text-black'>Chercher</li>
                                   </div>
                              
                            </ul>
              )}
                <div className='flex flex-row mx-8 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer'>
                <LuLogOut className='mt-1 ' size={17}/>
                <p className=' text-black'>Déconnecter</p>
               </div>
              </ul>
              
              
            </div>
      
      </div> 

     {/*Image Profile top right corner*/}
      <div onClick={handleNav} style={{position: 'absolute',top: 15,right: 10, }}>
          <img className="h-10" src={avatar} alt='/'/>
          </div>
    </div>
     
 </div>
  
    
    
  )
}

export default Admin