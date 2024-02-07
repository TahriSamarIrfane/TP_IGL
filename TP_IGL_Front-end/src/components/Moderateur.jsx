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
import { saveUser,getUser } from '../userStorage';
import { useNavigate } from 'react-router-dom';

const Moderateur = () =>  {

  const navigate = useNavigate();
  const [nav, setNav] =useState(false);
  const [Article, setArticle] = useState(true);
  const [MesArticles, setMesArticles] = useState(false);
  const [affiche, setaffiche] = useState(false);
 
  const [Data, setData] = useState([]);
  const [Data2, setData2] = useState([]);

  localStorage.setItem('Titre', 'response.json().titre' ),
  localStorage.setItem('Auteur','response.json().auteurs' ),
  localStorage.setItem('Abstract','response.json().abstract' ),
  localStorage.setItem('Reference', 'response.json().references'),
  localStorage.setItem('Text','response.json().full_text ')


  const containerStyle = {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: 2,
  };


  const storedUser=getUser()
  const storedUser2=getUser()
// /*********Afficher les articles en attente de modération******** */
const updateData=(array)=>{
  setData(array)
}  


const handleNewArticle= async ()=>{
    const url = 'http://localhost:8000/get-articles/'
    const response = await fetch(url,{
      method:'GET',
      headers: {
        'Content-Type':'application/json'
      },
    }) 
    const data = await response.json();
    console.log(data)
        // Extract articles_en_attente array from the data
        const articlesAttente = data.articles_en_attente;
        
        setData(articlesAttente);
        //console.log(articlesAttente)
        console.log(Data)
      
      }
   //***********Se déconnecter */
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
            }         return response.json();
    
        })
        .then((data) => {
            console.log('Logout Response:', data);
            navigate('/');
            // Handle successful response, e.g., redirect to login page
        })
        .catch((error) => {         console.error('Logout failed:', error);
            // Handle errors, e.g., show an error message to the user
        });
    }; 
    
/***********Bouton Modérer pour commencer la correction****** */
  const handleModerArticle=(id)=>{
    const url =  `http://localhost:8000/moder/${id}/get/`
    localStorage.clear();
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
  const handleNav = () =>{
    setNav(!nav)
  }
  const handleWrapper2=(id)=>{
    handleMArticles(storedUser.Pseudo);
    // handleMesArticles(id);
  }
    const handleafficher=()=>{
   setaffiche(true)
   handleNewArticle()
    }
    const handleWrapper=()=>{
      setArticle(true);
      setMesArticles(false);
      handleNewArticle();
    }
    const handleMArticles = async(moderator_username) => {
        const url=`http://localhost:8000/get-moder-articles/${moderator_username}/`
        const response =await fetch(url,{
          method:'GET',
          headers: {
            'Content-Type':'application/json'
          } })
          const data = await response.json();
          console.log(data)

      setMesArticles(true);
      setArticle(false);
    };

  //const moderator_username= storedUser2.Pseudo// /*******Choix de l'article à Modérer****** */
  const handleMesArticles = (moderator_usernamemoderator_username,article_id) => {
    const url=`http://localhost:8000/choose-article/moderator/${moderator_username}/article/${article_id}/`
    const updated_data={
    moderator_username: moderator_username,  // j'ai besoin le id du moderateur courant et le id de l'article choisis
    article_id: article_id,}
    fetch(url,{
      method:'PATCH',
      headers: {
        'Content-Type':'application/json'
      },body:JSON.stringify(updated_data)
    }).then(response => response.json()
    ).then(
      data => console.log(data)
    )
    setMesArticles(true);
    setArticle(false);
    
  };
  
  return (
    <div className='flex flex-col bg-gradient-to-r lg:h-screen h-full w-screen from-GLbleu via-GLpink to-orange-300   '>  <div className='flex flex-row justify-center items-center space-x-8 w-full h-full'> 
    <div className='flex flex-row justify-center items-center space-x-8 w-full h-full'>
       {/*Barre des d'actions (Menu) */}
       <div className='w-[15%] rounded-2xl bg-opacity-30 h-[80%] mt-10 bg-white hidden lg:block '>
          <div className='flex flex-col justify-between items-center h-auto w-auto'>
              <div className='flex flex-row justify-center  py-1  mt-4 bg-darkPink rounded-md w-[80%]'>
               < MdOutlineDashboard className='mt-1 ' size={20} color='white'/>
               <p className=' text-2 text-white font-bold'>Dashboard</p>
              </div>
             <ul className=' flex-col mt-5 h-full w-full'>
                 <div className={Article ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink ' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-gray '}>
                 <GrArticle color='#AA336A' className='mt-1 ' size={17}/>
                    <li onClick={handleWrapper}  className=' text-black'>Articles</li>
                    
                 </div>
                <div className={!MesArticles? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer' : 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink' }>
                <BiSolidEdit color='#AA336A' className='mt-1 ' size={17}/>
                  <li onClick={()=>handleWrapper2()} className='text-black'>Mes Articles</li>
                </div>
              
           
             
              <div className='flex flex-row mx-8 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer'>
              <LuLogOut color='#AA336A' className='mt-1 ' size={17}/>
              <Link to="/"><li onClick={handleLogout} className=' text-black'>Déconnecter</li></Link>
              </div>
              </ul>
          </div>
        </div> 

        {/*La fenêtre des actions et résultats*/}
       
       <div className='flex flex-col justify-center w-full h-[80%] space-y-2   lg:w-[60%]'>
         <div className='flex-row '>
          {/*Boutton Menu dans le cas mobile*/}
          <div onClick={handleNav} className='lg:hidden'>
          {nav ? <IoMenu color='white' size={25}/> : <IoMenu color='white' size={25}/> }
          </div>
          <h5 className='text-white text-opacity-70 font-bold text-2xl '>Dashboard</h5>
        
         </div>
          
         <div className="flex flex-col items-center justify-center  rounded-2xl  max-w-auto h-full w-[95%] mt-11 bg-white">
          {MesArticles && (<ul  className='lg:column-list column-list2 h-[90%] w-[90%] space-y-6  overflow-auto'>
                              {Data2.map((item) => (
                          
                           <li   className='flex flex-colmax-h-40 max-w-40 border-darkPink  border-2 rounded-md bg-white'>
                             <div className='flex flex-col justify-start '>
                             <p className=' ellipsis-text px-1 font-medium text-xl'>{item.titre}</p>
                              <div className=' flex px-2 justify-start py-1 '><p className= 'text-start text-sm line-clamp-1' style={{textOverflow:'ellipsis',overflow:'hidden',width:'130px'}}>{item.abstract}</p>
                              </div>
                              <div className='flex justify-end mb-2' >
                              <Link to={`/ModererArticle/${item.id}`}><button onClick={()=>handleModerArticle(item.id)} className= ' px-2 mr-2 bg-darkPink text-[90%] text-center text-white rounded-xl '>Modérer</button></Link>
                                  </div>
                              </div>
                           </li>
                           
                                ))}
                                </ul>)} 
                    {!affiche && (<button onClick={()=>handleafficher()} className= ' items-center p-2 mr-2 bg-darkPink text-[90%] text-center text-white rounded-xl '>Afficher les articles en attente</button>)}
                   { affiche && Article &&( 
                    <ul className='lg:column-list  column-list2 h-[90%] w-[90%] space-y-6 '>
                              {Data.map((item) => (
                               
                           <li   key={item.id} className='flex flex-col max-h-40 max-w-40 border-darkPink border-2 rounded-md bg-white'>
                             <div className='flex flex-col  justify-start '>
                             <p style={containerStyle} className=' ellipsis-textp-1 font-medium text-md'>{item.Titre}</p>
                              <div className=' flex px-2 justify-start py-1 '><p className= 'text-start text-sm line-clamp-1' style={{textOverflow:'ellipsis',overflow:'hidden',width:'130px'}}>{item.Text}</p>
                              </div>
                              <div className='flex justify-end mb-3 mr-1 '>
                            <IoIosAddCircleOutline onClick={()=>handleMesArticles(storedUser2.Pseudo,item.id)}  size={23} color='#DF1477' />
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
                 <GrArticle color='#AA336A' className='mt-1 ' size={17}/>
                  <li onClick={handleWrapper} className=' text-black lg:text-xl text-[80%]'>Articles</li>
                </div>
                <div className={!MesArticles ? 'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer':'flex flex-row mx-8 mb-6 space-x-2 py-1 border-b-2 border-b-darkPink '}>
                <BiSolidEdit color='#AA336A' className='mt-1 ' size={17}/>
                  <li  className='text-black lg:text-xl text-[80%]'>Mes Articles</li>
                </div>
                
                <div className='flex flex-row mx-8 space-x-2 py-1 border-b-2 hover:border-b-darkPink cursor-pointer'>
                <LuLogOut color='#AA336A' className='mt-1 ' size={17}/>
                <Link to="/"><p className=' text-black lg:text-xl text-[80%]'>Déconnecter</p></Link>
               </div>
              </ul>
              
              
            </div>
      
      </div> 

     {/*Image Profile top right corner*/}
      <div onClick={handleNav} style={{position: 'absolute',top: 15,right: 10, }}>
      <Link to='/ProfileAdminMod'><img style={{borderRadius:'50%', height:'40px',width:'40px',objectFit:'cover'}}  src={avatar} alt='/'/></Link>  </div>
    </div>
     
 </div>
  
    
    
  )
}

export default Moderateur