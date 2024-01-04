import React, {useState} from 'react'
import background from "../assets/images/Page-admin.png"
import imageS from "../assets/images/Upload.png"
import imageL from "../assets/images/Loading.png"
import avatar from "../assets/images/Avatar.png"

import { MdOutlineDashboard } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
import { FaAddressBook } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { IoSearch } from "react-icons/io5";


const Moderateur = () =>  {
  const [nav, setNav] =useState(false);
  const [Article, setArticle] = useState(false);
  const [MesArticles, setMesArticles] = useState(false);
  
  const data = [
    { Titre: 1, Auteur: 'Item 1',Text:'12334' },
    { Titre: 2, Auteur: 'Item 2',Text:'12334' },
    { Titre: 3, Auteur: 'Item 3',Text:'12334' },
    { Titre: 4, Auteur: 'Item 4',Text:'12334' },
    { Titre: 5, Auteur: 'Item 5',Text:'12334' },
    { Titre: 6, Auteur: 'Item 6',Text:'12334' },
    { Titre: 4, Auteur: 'Item 4',Text:'12334' },
    { Titre: 5, Auteur: 'Item 5',Text:'12334' },
    { Titre: 6, Auteur: 'Item 6',Text:'12334' },
  ];

  const handleArticle = () => {
    setArticle(!Article);
  };
  const handleMesArticles = () => {
    setMesArticles(!MesArticles);
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
                 <div className={!showItems ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink ' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-gray '}>
                    <FiUpload className='mt-1 ' size={17}/>
                    <li onClick={handleArticle}  className=' text-black'>Articles</li>
                    {Article && (<ul style={{  overflowY: 'auto' }} className='flex-col items-center space-y-6 p-5 w-full ml-[-1%]'>
                              {data.map((item) => (
                          
                           <div key={item.Name}  className='flex flex-row justify-star items-center h-[35%] w-[30%]  rounded-md bg-white'>
                             <h2>{item.Titre}</h2>
                              <h4 className='opacity-8'>{item.Auteur}</h4>
                              <p>{item.Text}</p>
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
                                </ul>)}  
                 </div>
                <div className={!showItems ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                 <FaAddressBook className='mt-1 ' size={17}/>
                  <li onClick={handleListItemClick} className='text-black'>Mes Articles</li>
                </div>
              
              </ul>
             
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
            <div className="flex flex-col justify-center items-center space-y-10 h-full w-full">
             <div className='flex-row  items-center w-[70%]'>
                 </div>
              <img className='h-[60%]' src={!ImShift ? imageS : imageL } alt='/' />
            </div>
          </div>
        </div>
          
           {/*NavBar for a small frame */}
           
       
           <div className={!nav ? ' fixed left-0 top-20 w-[30%] h-full border-r border-gray-900 bg-white lg:hidden' : 'fixed left-[-100%]'}>
              <ul className=' flex-col pt-10 h-full w-full' style={{overflow: 'hidden'}}>
                 <div className={showItems ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink ':'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-grey'}>
                    <FiUpload className='mt-1 ' size={17}/>
                  <li className=' text-black'>Upload</li>
                </div>
                <div className={showItems ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer':'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink '}>
                 <FaAddressBook className='mt-1 ' size={17}/>
                  <li onClick={handleListItemClick} className='text-black'>Modérateurs</li>
                </div>
                {!showItems && (
                            <ul className='ml-6'>
                                  <div className={!showItems ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                                    <MdOutlineAddBox className='mt-1  ' size={17}/>
                                    <li  className='text-black'>Nouveau</li>
                                 </div>
                                 <div className={!showItems ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                                    <IoSearch className='mt-1 ' size={17}/>
                                    <li  className='text-black'>Chercher</li>
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

export default Moderateur