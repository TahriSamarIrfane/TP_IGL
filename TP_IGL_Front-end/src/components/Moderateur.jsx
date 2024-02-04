// import React, {useState} from 'react'
// import background from "../assets/images/Page-admin.png"
// import avatar from "../assets/images/Avatar.png"

// import { MdOutlineDashboard } from "react-icons/md";
// import { IoMenu } from "react-icons/io5";
// import { LuLogOut } from "react-icons/lu";
// import { GrArticle } from "react-icons/gr";
// import { BiSolidEdit } from "react-icons/bi";
// import { IoIosAddCircleOutline } from "react-icons/io";


// const Moderateur = () =>  {
//   const [nav, setNav] =useState(false);
//   const [Article, setArticle] = useState(true);
//   const [MesArticles, setMesArticles] = useState(false);
  
//   const data = [
//     { Titre: 'Titre1', Auteur: 'Item 1',Text:'12334' },
//     { Titre: 'Titre2', Auteur: 'Item 2',Text:'Wrting Writing to test the overflow blablabla' },
//     { Titre: 'Titre3', Auteur: 'Item 3',Text:'12334' },
//     { Titre: 'Titre4', Auteur: 'Item 4',Text:'12334' },
//     { Titre: 'Titre5', Auteur: 'Item 5',Text:'12334' },
//     { Titre: 'Titre6', Auteur: 'Item 6',Text:'12334' },
//     { Titre: 'Titre4', Auteur: 'Item 4',Text:'12334' },
//     { Titre: 'Titre5', Auteur: 'Item 5',Text:'12334' },
//     { Titre: 'Titre6', Auteur: 'Item 6',Text:'12334' },
//     { Titre: 'Titre5', Auteur: 'Item 5',Text:'12334' },
//     { Titre: 'Titre6', Auteur: 'Item 6',Text:'12334' },
    
//   ];
//   const handleWrapper = () => {

//   }
//   const handleArticles = () => {
//     const file = fileInput.files[0];
//     const formData = new FormData();
//     formData.append('file', file);

//   fetch('http://localhost:8000//article/get-articles/', {
//     method: 'GET',
//     headers: {
//       'Content-Type':'application/json'
//     },
//     body: formData
//   })
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error('File upload failed');
//     }
//   })
//   .then(data => {
//     console.log('Server response:', data);
//   })
//   .catch(error => {
//     console.error('Error uploading file:', error);
//   });
//  }

//   const handleArticle = () => {
//     setArticle(true);
//     setMesArticles(false);
//   };
//   const handleMesArticles = () => {
//     setMesArticles(true);
//     setArticle(false);
//   };
//   const handleNav = () =>{
//     setNav(!nav)
//   }
//   return (
//   <div className= ' bg-black w-ful h-full'>
//     <div className='w-full h-full bg-no-repeat max-auto' style={{backgroundImage: `url(${background})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%' , height: '100vh'}}>
//      <div className='flex flex-row justify-center items-center space-x-8 w-full h-full'> 

//        {/*Barre des d'actions (Menu) */}
//         <div className='w-[15%] rounded-sm h-[80%] mt-10 bg-white hidden lg:block '>
//           <div className='flex flex-col justify-between items-center h-auto w-auto'>
//               <div className='flex flex-row justify-center  py-1  mt-4 bg-darkPink rounded-md w-[80%]'>
//                < MdOutlineDashboard className='mt-1 ' size={20} color='white'/>
//                <p className=' text-2 text-white font-bold'>Dashboard</p>
//               </div>
//              <ul className=' flex-col mt-5 h-full w-full'>
//                  <div className={Article ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink ' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-gray '}>
//                     <GrArticle className='mt-1 ' size={17}/>
//                     <li onClick={handleArticle}  className=' text-black'>Articles</li>
                    
//                  </div>
//                 <div className={!MesArticles? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
//                  <BiSolidEdit className='mt-1 ' size={17}/>
//                   <li onClick={handleMesArticles} className='text-black'>Mes Articles</li>
//                 </div>
              
//               </ul>
             
//               <div className='flex flex-row mx-8 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer'>
//                 <LuLogOut className='mt-1 ' size={17}/>
//                 <p className=' text-black'>Déconnecter</p>
//               </div>
//           </div>
//         </div> 

//         {/*La fenêtre des actions et résultats*/}
       
//        <div className='flex flex-col justify-center w-full h-[80%] space-y-2   lg:w-[60%]'>
//          <div className='flex-row '>
//           {/*Boutton Menu dans le cas mobile*/}
//           <div onClick={handleNav} className='lg:hidden'>
//           {nav ? <IoMenu color='white' size={25}/> : <IoMenu color='white' size={25}/> }
//           </div>
//           <h5 className='text-white font-bold text-2xl '>Dashboard</h5>
//          </div>
          
//           <div className="flex flex-col items-center justify-center bg-opacity-10 max-w-auto h-full w-[95%] mt-11 bg-white">
//           {Article && (<ul className='lg:column-list column-list2 h-[90%] w-[90%] space-y-6  overflow-auto'>
//                               {data.map((item) => (
                          
//                            <li   className='flex flex-col h-[80%] w-[80%] rounded-md bg-white'>
//                              <div className='flex flex-col justify-start '>
//                              <p className='px-1 font-medium text-xl'>{item.Titre}</p>
//                               <p className='px-2 text-opacity-90 text-lg mb-1'>{item.Auteur}</p>
//                               <div className=' flex px-2 justify-start py-1 '><p className= 'text-start text-sm line-clamp-1' style={{textOverflow:'ellipsis',overflow:'hidden',width:'130px'}}>{item.Text}</p>
//                               </div>
//                               <div className='flex justify-end mb-2'>
//                                          <button  className= ' px-2 mr-2 bg-darkPink text-[90%] text-center text-white rounded-xl '>Modérer</button>
//                                   </div>
//                               </div>
//                            </li>
                           
//                                 ))}
//                                 </ul>)} 
//                     {MesArticles && (<ul className='lg:column-list column-list2 h-[90%] w-[90%] space-y-6 overflow-auto'>
//                               {data.map((item) => (
                          
//                            <li   className='flex flex-col h-[80%] w-[80%] rounded-md bg-white'>
//                              <div className='flex flex-col justify-start '>
//                              <p className='px-1 font-medium text-xl'>{item.Titre}</p>
//                               <p className='px-2 text-opacity-90 text-lg mb-1'>{item.Auteur}</p>
//                               <div className=' flex px-2 justify-start py-1 '><p className= 'text-start text-sm line-clamp-1' style={{textOverflow:'ellipsis',overflow:'hidden',width:'130px'}}>{item.Text}</p>
//                               </div>
//                               <div className='flex justify-end mb-2 mr-1'>
//                               <IoIosAddCircleOutline size={23} color='#DF1477' />
//                                            </div>
//                               </div>
//                            </li>
                           
//                                 ))}
//                                 </ul>)}  
//           </div>
//         </div>
          
//            {/*NavBar for a small frame */}
           
       
//            <div className={!nav ? ' fixed left-0 top-20 w-[30%] h-full border-r border-gray-900 bg-white lg:hidden' : 'fixed left-[-100%]'}>
//               <ul className=' flex-col pt-10 h-full w-full' style={{overflow: 'hidden'}}>
//                  <div className={Article ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink ':'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer'}>
//                     <GrArticle className='mt-1 ' size={17}/>
//                   <li onClick={handleArticle} className=' text-black lg:text-xl text-[80%]'>Articles</li>
//                 </div>
//                 <div className={!MesArticles ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer':'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink '}>
//                  <BiSolidEdit className='mt-1 ' size={17}/>
//                   <li onClick={handleMesArticles} className='text-black lg:text-xl text-[80%]'>Mes Articless</li>
//                 </div>
                
//                 <div className='flex flex-row mx-8 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer'>
//                 <LuLogOut className='mt-1 ' size={17}/>
//                 <p className=' text-black lg:text-xl text-[80%]'>Déconnecter</p>
//                </div>
//               </ul>
              
              
//             </div>
      
//       </div> 

//      {/*Image Profile top right corner*/}
//       <div onClick={handleNav} style={{position: 'absolute',top: 15,right: 10, }}>
//           <img style={{borderRadius:'50%', height:'40px',width:'40px',objectFit:'cover'}}  src={avatar} alt='/'/>
//           </div>
//     </div>
     
//  </div>
  
    
    
//   )
// }

// export default Moderateur
import React, {useState} from 'react'
import background from "../assets/images/Page-admin.png"
import avatar from "../assets/images/Avatar.png"

import { MdOutlineDashboard } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { GrArticle } from "react-icons/gr";
import { BiSolidEdit } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';


const Moderateur = () =>  {
  const [nav, setNav] =useState(false);
  const [Article, setArticle] = useState(true);
  const [MesArticles, setMesArticles] = useState(false);

  const [Data, setData] = useState([]);

 

  const handleNewArticle=()=>{
    const url = 'http://localhost:8000/get-articles/'
    fetch(url,{
      method:'GET',
      headers: {
        'Content-Type':'application/json'
      },
    }).then(
      response => response.json()
    ).then(
      data => console.log(data),
      setData(JSON.stringify(response.json(), null, 2)),
    
    )
    
  }
  const handleModerArticle=(id)=>{
    const url =  `http://localhost:8000/moder/${id}/get/`
    fetch(url,{
      method:'GET',
      headers: {
        'Content-Type':'application/json'
      },
    }).then(
      response => response.json()
    ).then(
      data => console.log(data),
      localStorage.setItem('Titre', response.json().titre ),
      localStorage.setItem('Auteur',response.json().auteurs ),
      localStorage.setItem('Abstract',response.json().abstract ),
      localStorage.setItem('Reference', response.json().references),
      localStorage.setItem('Text',response.json().full_text )
    )
  }
  //  /*******Rendre l'article en cours*********** */
  const handleMesArticle=(id)=>{
    const url =  `http://localhost:8000/moder/${id}/get/`
    fetch(url,{
      method:'GET',
      headers: {
        'Content-Type':'application/json'
      },
    }).then(
      response => response.json()
    ).then(
      data => console.log(data)
    )

  }


    const handleWrapper=()=>{
      handleArticle();
      handleNewArticle();
    }
  
  const handleArticle = () => { // les articles choisi par le moderateur
    const url='http://localhost:8000/get-moder-articles/'
    fetch(url,{
      method:'GET',
      headers: {
        'Content-Type':'application/json'
      },body:{
        moderateur_id,  // j'ai besoin le id du moderateur courant 
      }
    }).then(response => response.json()
    ).then(
      data => console.log(data)
    )
    setArticle(true);
    setMesArticles(false);
  };
  const handleMesArticles = () => {
    const url='http://localhost:8000/change-etat/'
    fetch(url,{
      method:'PATCH',
      headers: {
        'Content-Type':'application/json'
      },body:{
        moderateur_id,  // j'ai besoin le id du moderateur courant et le id de l'article choisis
        article_id
      }
    }).then(response => response.json()
    ).then(
      data => console.log(data)
    )
    setMesArticles(true);
    setArticle(false);
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
                 <div className={Article ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink ' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-gray '}>
                    <GrArticle className='mt-1 ' size={17}/>
                    <li onClick={handleWrapper}  className=' text-black'>Articles</li>
                    
                 </div>
                <div className={!MesArticles? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                 <BiSolidEdit className='mt-1 ' size={17}/>
                  <li onClick={handleMesArticles} className='text-black'>Mes Articles</li>
                </div>
              
              </ul>
             
              <div className='flex flex-row mx-8 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer'>
                <LuLogOut className='mt-1 ' size={17}/>
                <Link to="/ModererArticle"><p className=' text-black'>Déconnecter</p></Link>
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
          {MesArticles && (<ul className='lg:column-list column-list2 h-[90%] w-[90%] space-y-6  overflow-auto'>
                              {Data.map((item) => (
                          
                           <li   className='flex flex-col h-[80%] w-[80%] rounded-md bg-white'>
                             <div className='flex flex-col justify-start '>
                             <p className='px-1 font-medium text-xl'>{item.titre}</p>
                              <div className=' flex px-2 justify-start py-1 '><p className= 'text-start text-sm line-clamp-1' style={{textOverflow:'ellipsis',overflow:'hidden',width:'130px'}}>{item.abstract}</p>
                              </div>
                              <div className='flex justify-end mb-2'>
                                         <button onClick={handleModerArticle(item.id)} className= ' px-2 mr-2 bg-darkPink text-[90%] text-center text-white rounded-xl '>Modérer</button>
                                  </div>
                              </div>
                           </li>
                           
                                ))}
                                </ul>)} 
                    {Article && (<ul className='lg:column-list column-list2 h-[90%] w-[90%] space-y-6 overflow-auto'>
                              {Data.map((item) => (
                          
                           <li   className='flex flex-col h-[80%] w-[80%] rounded-md bg-white'>
                             <div className='flex flex-col justify-start '>
                             <p className='px-1 font-medium text-xl'>{item.titre}</p>
                              <div className=' flex px-2 justify-start py-1 '><p className= 'text-start text-sm line-clamp-1' style={{textOverflow:'ellipsis',overflow:'hidden',width:'130px'}}>{item.abstract}</p>
                              </div>
                              <div className='flex justify-end mb-3 mr-1'>
                            <Link to={`/ModererArticle/${item.id}`}><IoIosAddCircleOutline onClick={handleMesArticle}  size={23} color='#DF1477' /></Link>
                                           </div>
                              </div>
                           </li>
                           
                                ))}
                                </ul>)}  
          </div>
        </div>
          
           {/*NavBar for a small frame */}
           
       
           <div className={!nav ? ' fixed left-0 top-20 w-[30%] h-full border-r border-gray-900 bg-white lg:hidden' : 'fixed left-[-100%]'}>
              <ul className=' flex-col pt-10 h-full w-full' style={{overflow: 'hidden'}}>
                 <div className={Article ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink ':'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer'}>
                    <GrArticle className='mt-1 ' size={17}/>
                  <li onClick={handleArticle} className=' text-black lg:text-xl text-[80%]'>Articles</li>
                </div>
                <div className={!MesArticles ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer':'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink '}>
                 <BiSolidEdit className='mt-1 ' size={17}/>
                  <li onClick={handleMesArticles} className='text-black lg:text-xl text-[80%]'>Mes Articless</li>
                </div>
                
                <div className='flex flex-row mx-8 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer'>
                <LuLogOut className='mt-1 ' size={17}/>
                <p className=' text-black lg:text-xl text-[80%]'>Déconnecter</p>
               </div>
              </ul>
              
              
            </div>
      
      </div> 

     {/*Image Profile top right corner*/}
      <div onClick={handleNav} style={{position: 'absolute',top: 15,right: 10, }}>
          <img style={{borderRadius:'50%', height:'40px',width:'40px',objectFit:'cover'}}  src={avatar} alt='/'/>
          </div>
    </div>
     
 </div>
  
    
    
  )
}

export default Moderateur