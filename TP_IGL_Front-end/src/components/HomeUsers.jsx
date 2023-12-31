import React, { useState } from 'react';
import'../index.css';

//importation for the slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TbSearch } from "react-icons/tb";
import { LiaShareSolid } from "react-icons/lia";
import { FaHeart } from "react-icons/fa";// full heart
import { FaRegHeart } from "react-icons/fa";//empty heart
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaStar } from "react-icons/fa";


//import images
import Pc from'../assets/images/Pc.png';
import science4 from'../assets/images/science4.png';
import science3 from'../assets/images/science3.png';
import science2 from'../assets/images/science2.png';
import science1 from'../assets/images/science1.png';
import woman1 from'../assets/images/woman1.png';
import woman2 from'../assets/images/woman2.png';
import man1 from'../assets/images/man1.png';
import FAQ from'../assets/images/FAQ.png';


import BlackSplash2 from'../assets/images/BlackSplash2.png';
import email from '../assets/icons/@.png';
import telephone from '../assets/icons/telephone.png';
import quePensiezVous from'../assets/images/QuePensiez-Vous.png';
import bird from'../assets/images/bird.png';










const CustomPrevArrow = (props) => (
    <div {...props} className=" absolute top-60 slick-arrow-custom  left-3 bottom-0 items-center cursor-pointer">
      <span className=' text-darkPink font-extrabold'>&lt;</span>
    </div>
  );
  
  const CustomNextArrow = (props) => (
    <span>
    <div {...props} className="absolute slick-arrow-custom top-60 slick-arrow-custom  right-3 bottom-0 items-center cursor-pointer">
      <span className='text-darkPink font-extrabold'>&gt;</span>
    </div>
    </span>
  );
   
//for the Slick
const settings={
  arrows: true,
  dots :true,
  infinite:false,
  speed:500,
  slidesToShow:3,
  slidesToScroll:1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  responsive: [

      {
        breakpoint: 768, // screens between 768px and 1024px
        settings: {
          slidesToShow: 1,
        },
      },


    ],

};


const HomeGuests = () => {

  
const[rating,setRating]= useState(null);
const[hover,setHover]= useState(null);

const [favorite, setFavorite] = useState([]);
const [favorite1, setFavorite1] = useState(false);
const[hoverFavorite,setHoverFavorite]= useState(false);

const [checkboxStates, setCheckboxStates] = useState(new Array(faq.length).fill(false));
const [checkboxStates1, setCheckboxStates1] = useState(new Array(faq1.length).fill(false));

const toggleFavorite = (index) => {
  if (favorite.includes(index)) {
    // If index is already in favorites, remove it
    setFavorite(favorite.filter((favIndex) => favIndex !== index));
  } else {
    // If index is not in favorites, add it
    setFavorite([...favorite, index]);
  }
};

const handleCheckboxChange = (index) => {
  const newCheckboxStates = [...checkboxStates];
  newCheckboxStates[index] = !newCheckboxStates[index];
  setCheckboxStates(newCheckboxStates);
};

const handleCheckboxChange1 = (index) => {
  setCheckboxStates1((prevState) => {
    const newCheckboxStates = [...prevState];
    newCheckboxStates[index] = !prevState[index];
    return newCheckboxStates;
  });
};

    return (
       <div>

        {/* La premiere partie : pour la recherche*/}
        <div className="bg-white mt-20  lg:pr-10 flex flex-col md:flex-row-reverse   justify-between ">
            <div className='mt-20'>
                <img className='lg:custom-PC mb-10   lg:mt-0 float-left' src={Pc} alt=""/>
            </div>
            {/*  Text */}
            <div className='md:mt-20'>
                <div className='px-5 md:px-24'>
                <h className=" bg-pink text-2xl text-darkPink font-Tahoma md:w-3/4 p-0 leading-snugs font-bold">Enjoy
                 with ScienVision </h>
                 <p className='text-black font-bold text-3xl md:text-4xl lg:text-5xl md:w-3/4'>
                 Plongez dans le Monde de la Recherche
                 </p>
                 <p className="text-grey font-Tahoma mt-4 md:w-3/4">
                 Plus de 12000 articles scientifiques, Trouvez des Articles Scientifiques en Un Clin d'Œil.
                 </p>
                 {/*Search bar */}
                 <div className='flex items-center bg-white w-full h-14 rounded-2xl border border-grey mt-10'>
                    <TbSearch className='text-4xl ml-2 text-grey'/>
                        <input type="text" className='    focus:ring-darkPink w-full h-full outline-none border-none placeholder:text-xl' placeholder='Search articles...' />
                    <button className=' ml-auto bg-darkPink h-full w-24 rounded-tr-2xl rounded-br-2xl'>   
                    <h2 className='text-white font-bold text-xl'>Search </h2>                   
                    </button>
                 </div>
                  </div >
                 </div>                 
         </div>

        {/* Nos articles populaires*/}
            <div className='mt-10 '>
            <h className='font-bold text-2xl md:text-3xl ml-5 md:ml-28 px-2'>Nos articles populaires</h>

            <div className='md:ml-20  flex flex-col-reverse md:flex-row-reverse  justify-between'>
                {/* the liste of articles */}

                <div className='lg:w-2/3  h-96 lg:show-atricle-scroll px-10 '>
                        
                        <div class="mx-auto h-full  overflow-scroll ">{/*overflow-scroll will add the scoll when overflow */}
                        {data.map((d,index) =>(
                        <div key={index} className=''>
                        <div className='bg-white  h-full  '>
                            <div className='flex flex-col md:flex-row'>
                            <img className='h-48 rounded-2xl p-3 mt-3' src={d.photo} alt=""/>
                            <div className='mt-3'>
                     <div className='flex flex-col'>
                     <div className='flex flex-row justify-between'>
                     <h className='text-grey mt-1 text-[12px]'> {d.Date}</h>
                     <div className=' flex flex-row'>
                     <LiaShareSolid className='mt-1 text-2xl'/>
                     <button className='top-0'>Share</button>
                     <label className='flex'>
                     <input
  type='checkbox'
  className='opacity-0'
  checked={favorite === index}
  onChange={() => toggleFavorite(index)}
/>
{/* Update the state based on the current value */}
                     
<FaHeart
  className='text-red-600 mx-3 mt-1 text-2xl cursor-pointer'
  color={(favorite && favorite.includes(index)) || hoverFavorite === index ? "red" : "grey"}
  onMouseEnter={() => setHoverFavorite(index)}
  onMouseLeave={() => setHoverFavorite(null)}
/>
                     </label>
        
        
                     {/*<FaRegHeart /> empty heartTOOOO change lateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer */}
                     </div>
                     </div>
                     <p className='font-bold text-lg'>{d.title}</p>
                     <p className="line-clamp-2 text-darkGery text-sm">
                      {d.article}</p>
                           <a href="#" className=" text-black font-bold text-sm">See more</a>
                           <div className='relative pr-5 mt-2 md:pr-40'>
                            {/* inline-block will change the container width according to text length */}
      
    
    
                            <div className='flex flex-wrap flex-row'>
      {d.cle.map((cle) => (
        <div key={cle} className="bg-white inline-block border rounded-2xl border-darkGery text-center mx-1 my-1">
          <h className="px-3 text-darkGery">{cle}</h>
        </div>
      ))}
    </div>
    
    
    
    
    
                         </div>
                     </div> 
                     </div>     
                            </div>
                            </div>
                            </div> 
                        
                    ))
                    }
                        </div>
                     </div>



            {/* the big article at left */}
             <div className='lg:w-1/3 px-10'>
             <div className=''>        
             <img className='md:h-96 lg:h-72 mt-4 mb-5' src={science4} alt=""/>
             <div className='flex flex-row justify-between'>
             <h className='text-grey mt-1'>{bigArticle.Date}</h>
             <div className='flex flex-row'>
             <LiaShareSolid className='mt-1 text-2xl'/>
             <button className='top-0'>Share</button>

             <label className='flex'>
             <input type='Radio' className='opacity-0'
             onClick={()=>setFavorite1(!favorite1)}/> {/* Update the state based on the current value */}
             <FaHeart  className='text-red-600 mx-3 mt-1 text-2xl cursor-pointer'
             color={favorite1 || hoverFavorite ? "red" : "grey"}// Update the color based on state
             onMouseEnter={()=> setHoverFavorite(true)}
             onMouseLeave={()=> setHoverFavorite(false)}
                                         />
             </label>
             {/*<FaRegHeart /> empry heartTOOOO change lateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer */}
             </div>
             </div>
             
             <div>
                <h1 className='font-bold text-lg text-darkPink'>{bigArticle.title}</h1>
                <div className="max-w-md overflow-hidden">
               <p className="line-clamp-3 text-darkGery">
               {bigArticle.article}       
                           </p>
                 <a href="#" className=" text-black font-bold">See more</a>
                 </div>
                 <div className='pr-2'>
                    {/* inline-block will change the container width according to text length */}
                    <div className='flex flex-wrap flex-row'>
      {bigArticle.cle.map((cle) => (
        <div key={cle} className="bg-white inline-block border rounded-2xl border-darkGery text-center mx-1 my-1">
          <h className="px-3 text-darkGery">{cle}</h>
        </div>
      ))}
    </div>
                 </div>
             </div>
             </div>

             </div>
              </div>
            </div>


            {/********** FAQ***********/}
            <div class="relative flex flex-col items-center justify-center md:ml-32 md:mr-32 px-5 md:px-0">
            <img className='absolute top-0 md:h-52 lg:mt-3 ' src={FAQ} alt=""/>
            <img className=' absolute top-0 h-40  lg:mt-24 left-0 hidden' src={woman1} alt=""/>
            <img className='absolute top-0 h-44  lg:mt-1 mr-2 right-0 hidden' src={woman2} alt=""/>
            <div className=' grid grid-cols-1 md:grid-cols-2 gap-5 bg-black mt-56 md:mt-44 pt-6 w-full max-h-full rounded-2xl pb-5'>
                <div className=' text-white'>
  <div className='flex flex-col px-10'>
      {faq.map((d, index) => (
        <div key={index} className='flex flex-col bg-white mt-5  rounded-2xl'>
<input
  type="checkbox"
  checked={checkboxStates[index]}
  onChange={() => handleCheckboxChange(index)}
  id={`faqCheckbox${index}`}
  className="absolute peer opacity-0"
/>

          <label htmlFor={`faqCheckbox${index}`} className='flex flex-row h-12 w-full justify-between items-center px-4 cursor-pointer'>
            <p className='text-black text-center font-bold'>{d.Question}</p>

            <div
  className={`rotate-0 transition-transform duration-200 ${
    checkboxStates[index] ? 'rotate-180' : ''
  }`}
>
  <MdKeyboardArrowDown className={`text-black transform`} />
</div>

          </label>
          {/* The peer works with checkboxes and radios; here it is used to open the answer part */}
          <div className='bg-white max-h-0 rounded-2xl justify-between items-center px-4 overflow-hidden transition-all ease-in-out duration-200 peer-checked:max-h-full'>
            <p className='text-black text-center mb-2'>{d.Answer}</p>
          </div>
        </div>
      ))}
    </div>    
                </div>

                <div className=' text-white  md:block'>
  
                <div className='hidden md:block flex flex-col px-10'>
      {faq.map((d, index) => (
        <div key={index} className='flex flex-col bg-white mt-5  rounded-2xl'>
<input
  type="checkbox"
  checked={checkboxStates1[index]}
  onChange={() => handleCheckboxChange1(index)}
  id={`faq1Checkbox${index}`}
  className="absolute peer opacity-0"
/>

          <label htmlFor={`faq1Checkbox${index}`} className='flex flex-row h-12 w-full justify-between items-center px-4 cursor-pointer'>
            <p className='text-black text-center font-bold'>{d.Question}</p>

            <div
  className={`rotate-0 transition-transform duration-200 ${
    checkboxStates1[index] ? 'rotate-180' : ''
  }`}
>
  <MdKeyboardArrowDown className={`text-black transform`} />
</div>

          </label>
          {/* The peer works with checkboxes and radios; here it is used to open the answer part */}
          <div className='bg-white max-h-0 rounded-2xl justify-between items-center px-4 overflow-hidden transition-all ease-in-out duration-200 peer-checked:max-h-full'>
            <p className='text-black text-center mb-2'>{d.Answer}</p>
          </div>
        </div>
      ))}
    </div> 

                </div>

            </div>
           </div>

         {/* Que Pensiez-Vous ?*/}
         <div class="flex flex-col items-center justify-center mb-5">

        <div className="bg-white flex flex-col  md:flex-row  items-center justify-between ">
          
          {/* the left side*/}
            <div className='md:w-1/2  flex-shrink-0'>         
                  <img className=' right-0 lg:mt-5 w-[320px] h-[300px] md:h-[570px] md:w-[600px]' src={man1} alt=""/>               
            </div>


            {/* the right side*/}
            <div className='md:w-1/2 px-2 ml-24 md:ml-0'>
                <div className=' px-10 pb-5  pt-5 mr-48 md:mr-48 w-[81%] bg-lightGrey md:shadow-xl rounded-2xl '>
              <p className='font-bold text-black text-4xl text-center'>Que Pensiez-Vous ?</p>
                <p className='text-black mt-3 ml-4 text-center'>Votre avis est important pour nous aider à mieux comprendre vos besoins et à adapter notre service en conséquence</p>
                <div className=' mb-10'>
                    <div className='flex flex-row items-center justify-center mb-7'>
                        {[...Array(5)].map((star,index)=>{
                            const currentRating =index+1;
                        return(
                            <label>
                            <input className=' opacity-0'
                             type="radio" name="ratinf"
                             value={currentRating}
                             onClick={()=>setRating(currentRating)}/>
                            <FaStar size={40} className='text-grey cursor-pointer'
                            color={currentRating <= (hover|| rating) ?"#ffc107" : "#8A8785"}
                            onMouseEnter={()=> setHover(currentRating)}
                            onMouseLeave={()=> setHover(null)}
                            />
                            </label>
                        );
                    })}
                </div>
                  <form action='' className='flex flex-col space-y-4'>

                    {/*Commentaire*/}
                    <div className=''>
                      <textarea type='text' placeholder='Ajoutez un Commentaire...' className=' shadow-lg resize-none bg-gray-100 outline-none ring-1 ring-gray-300 w-full h-32 rounded-2xl px-4 py-2 focus:ring-2 focus:ring-rose-200'></textarea>
                    </div>

                    <button className='shadow-md inline-block self-end bg-darkPink text-white font-bold rounded-2xl px-6 py-2 w-full'> Envoyer </button>
                  </form>
                </div>
                  </div >

                 </div>                            
         </div>
         </div>



         {/* Que Pensiez-Vous ?*/}
         <div class="flex flex-col items-center justify-center">

        <div className="bg-white flex flex-col  md:flex-row-reverse  items-center justify-between ">
          
            <div className='md:w-1/3 lg:mt-20 flex-shrink-0'>

              {/* the right side*/}
            <div className='relative '>
                  <img className=' right-0 lg:mt-5 ml-6 md:ml-0' src={BlackSplash2} alt=""/>
                  <div className=''>    
                    <h className='absolute mx-8 top-8 right-0 text-4xl lg:text-4xl md:text-2xl  font-Segoe py-2 px-7 lg:px-7 lg:top-8 md:px-2 md:top-1 text-white font-bold  '>Contactez-nous</h>
                    <div className='absolute flex flex-row mx-16 top-24 lg:top-24 lg:mx-16 md:top-10 md:mx-10'>
                    <img className='w-5 h-5 mt-2 mr-1' src={email} alt=""/>
                    <h className=' mb-3 font-Segoe text-white font-bold text-2xl lg:text-2xl md:text-1xl '>Email :</h>    
                    </div>
                    <h className='absolute mx-20 top-32 lg:top-32 lg:mx-20 mb-3 font-Segoe text-white md:text-1xl md:top-16 md:mx-14'>Surfey@gmail.com</h>

                    <div className='absolute flex flex-row mx-16 top-40 lg:top-40 lg:mx16 md:mx-10 md:top-24'>
                    <img className='w-5 h-5 mt-2 mr-1' src={telephone} alt=""/>
                    <h className=' mb-3 font-Segoe text-white font-bold text-2xl md:text-1xl '>Numéro de Téléphone :</h>    
                    </div>
                    <h className='absolute mx-20 top-48 mb-3 lg:top-48 lg:mx-20 font-Segoe text-white md:text-1xl md:top-40 md:mx-14'>(+213) 123 45 67 89</h>

                  </div>
                  <img className=' lg:mb-40 float-left' src={bird} alt=""/>
                  </div>
                
            </div>

    


            {/* the left side*/}
            <div className='px-5 md:w-2/3'>
                <div className='lg:px-24 pr-0 lg:mr-48 md:mr-48'>
                <img className='justify-center' src={quePensiezVous} alt=""/>
                <p className='text-black mt-5 mb-5 ml-4'>Nous sommes à votre écoute...Votre avis compte !</p>
                <div className=' mb-10'>
                  <form action='' className='flex flex-col space-y-4'>
                    {/* Nom*/}
                    <div className=''>
                      <label for="" className='font-bold text-md'>Nom Complet</label>
                    </div>
                    <div className=''>
                      <input type='text' placeholder='Entrez votre nom complet' className='bg-lightGrey outline-none ring-1 ring-gray-300 w-full rounded-2xl px-4 py-2 focus:ring-2 focus:ring-rose-200'></input>
                    </div>

                     {/*Email*/}
                     <div className=''>
                      <label for="" className='font-bold text-md'>Email</label>
                    </div>
                    <div className=''>
                      <input type='email' placeholder='Entrez votre mail' className='bg-lightGrey outline-none ring-1 ring-gray-300 w-full rounded-2xl px-4 py-2 focus:ring-2 focus:ring-rose-200'></input>
                    </div>

                    {/*text*/}
                    <div className=''>
                      <label for="" className='font-bold text-mds'>Commentaire</label>
                    </div>
                    <div className=''>
                      <textarea type='text' placeholder='Ajoutez un Commentaire...' className='resize-none bg-lightGrey outline-none ring-1 ring-gray-300 w-full rounded-2xl px-4 py-2 focus:ring-2 focus:ring-rose-200'></textarea>
                    </div>

                    <button className='shadow-md inline-block self-end bg-darkPink text-white font-bold rounded-2xl px-6 py-2 w-full'> Envoyer </button>
                  </form>
                </div>
                  </div >

                 </div> 



                 
                 


                             
         </div>
         </div>


       </div>
   
       
    );
};

export default HomeGuests;

//left side questions
const faq = [
    {
        Question:`Lorem ipsum dolor sit amet consectetur ?`,
        Answer:`Lorem ipsum dolor sit amet consectetur. Congue integer tortor vitae posuere nisl quisque enim at. Suspendisse non elit eget penatibus urna facilisi aliquam. Convallis ligula sed potenti tristique risus. Tempor et eleifend sit elit turpis nec. Lectus vel faucibus mattis posuere gravida nullam sagittis.`,
    },
    {
        Question:`Lorem ipsum dolor sit amet consectetur ?`,
        Answer:`Lorem ipsum dolor sit amet consectetur. Congue integer tortor vitae posuere nisl quisque enim at. Suspendisse non elit eget penatibus urna facilisi aliquam. Convallis ligula sed potenti tristique risus. Tempor et eleifend sit elit turpis nec. Lectus vel faucibus mattis posuere gravida nullam sagittis.`,
    },
    {
        Question:`Lorem ipsum dolor sit amet consectetur ?`,
        Answer:`Lorem ipsum dolor sit amet consectetur. Congue integer tortor vitae posuere nisl quisque enim at. Suspendisse non elit eget penatibus urna facilisi aliquam. Convallis ligula sed potenti tristique risus. Tempor et eleifend sit elit turpis nec. Lectus vel faucibus mattis posuere gravida nullam sagittis.`,
    },
    {
        Question:`Lorem ipsum dolor sit amet consectetur ?`,
        Answer:`Lorem ipsum dolor sit amet consectetur. Congue integer tortor vitae posuere nisl quisque enim at. Suspendisse non elit eget penatibus urna facilisi aliquam. Convallis ligula sed potenti tristique risus. Tempor et eleifend sit elit turpis nec. Lectus vel faucibus mattis posuere gravida nullam sagittis.`,
    },
    {
        Question:`Lorem ipsum dolor sit amet consectetur ?`,
        Answer:`Lorem ipsum dolor sit amet consectetur. Congue integer tortor vitae posuere nisl quisque enim at. Suspendisse non elit eget penatibus urna facilisi aliquam. Convallis ligula sed potenti tristique risus. Tempor et eleifend sit elit turpis nec. Lectus vel faucibus mattis posuere gravida nullam sagittis.`,
    },

]

//right side questions
const faq1 = [
    {
        Question:`Lorem ipsum dolor sit amet consectetur ?`,
        Answer:`Lorem ipsum dolor sit amet consectetur. Congue integer tortor vitae posuere nisl quisque enim at. Suspendisse non elit eget penatibus urna facilisi aliquam. Convallis ligula sed potenti tristique risus. Tempor et eleifend sit elit turpis nec. Lectus vel faucibus mattis posuere gravida nullam sagittis.`,
    },
    {
        Question:`Lorem ipsum dolor sit amet consectetur ?`,
        Answer:`Lorem ipsum dolor sit amet consectetur. Congue integer tortor vitae posuere nisl quisque enim at. Suspendisse non elit eget penatibus urna facilisi aliquam. Convallis ligula sed potenti tristique risus. Tempor et eleifend sit elit turpis nec. Lectus vel faucibus mattis posuere gravida nullam sagittis.`,
    },
    {
        Question:`Lorem ipsum dolor sit amet consectetur ?`,
        Answer:`Lorem ipsum dolor sit amet consectetur. Congue integer tortor vitae posuere nisl quisque enim at. Suspendisse non elit eget penatibus urna facilisi aliquam. Convallis ligula sed potenti tristique risus. Tempor et eleifend sit elit turpis nec. Lectus vel faucibus mattis posuere gravida nullam sagittis.`,
    },
    {
        Question:`Lorem ipsum dolor sit amet consectetur ?`,
        Answer:`Lorem ipsum dolor sit amet consectetur. Congue integer tortor vitae posuere nisl quisque enim at. Suspendisse non elit eget penatibus urna facilisi aliquam. Convallis ligula sed potenti tristique risus. Tempor et eleifend sit elit turpis nec. Lectus vel faucibus mattis posuere gravida nullam sagittis.`,
    },
    {
        Question:`Lorem ipsum dolor sit amet consectetur ?`,
        Answer:`Lorem ipsum dolor sit amet consectetur. Congue integer tortor vitae posuere nisl quisque enim at. Suspendisse non elit eget penatibus urna facilisi aliquam. Convallis ligula sed potenti tristique risus. Tempor et eleifend sit elit turpis nec. Lectus vel faucibus mattis posuere gravida nullam sagittis.`,
    },

]

// For the big articles
const bigArticle = 
  {
      Date:`11 Novembre 2023`,
      title:`Lorem ipsum dolor sit `,
      photo:science3,
      cle:['Lorem','ipsum','Lorem','ipsum','dolor','sit',],
      article:` Lorem ipsum dolor sit amet consectetur. Orci volutpat mauris arcu non dictum elit sagittis. Mauris ullamcorper ac orci at sollicitudin integer tortor. Eget lacus est in  PlusLorem ipsum dolor sit amet consectetur. Orci volutpat mauris arcu non dictum elit sagittis. Mauris ullamcorper ac orci at sollicitudin integer tortor. Eget lacus est in duis vitae et..        `,
  };

// For articles
const data = [
    {
        Date:`11 Novembre 2023`,
        title:`Lorem ipsum dolor sit `,
        photo:science3,
        cle:['Lorem','ipsum','Lorem','ipsum','dolor','sit',],
        article:` Lorem ipsum dolor sit amet consectetur. Orci volutpat mauris arcu non dictum elit sagittis. Mauris ullamcorper ac orci at sollicitudin integer tortor. Eget lacus est in  PlusLorem ipsum dolor sit amet consectetur. Orci volutpat mauris arcu non dictum elit sagittis. Mauris ullamcorper ac orci at sollicitudin integer tortor. Eget lacus est in duis vitae et..        `,
    },

    {
        Date:`11 Novembre 2023`,
        title:`Lorem ipsum dolor sit amet `,
        photo:science2,
        cle:['Lorem','ipsum','dolor','sit','Lorem'],
        article:` Lorem ipsum dolor sit amet consectetur. Orci volutpat mauris arcu non dictum elit sagittis. Mauris ullamcorper ac orci at sollicitudin integer tortor. Eget lacus est in  PlusLorem ipsum dolor sit amet consectetur. Orci volutpat mauris arcu non dictum elit sagittis. Mauris ullamcorper ac orci at sollicitudin integer tortor. Eget lacus est in duis vitae et..        `,
    },

    {
        Date:`11 Novembre 2023`,
        title:`Lorem ipsum dolor sit amet consectetur`,
        photo:science1,
        cle:['Lorem','ipsum','dolor','sit','Lorem'],
        article:` Lorem ipsum dolor sit amet consectetur. Orci volutpat mauris arcu non dictum elit sagittis. Mauris ullamcorper ac orci at sollicitudin integer tortor. Eget lacus est in  PlusLorem ipsum dolor sit amet consectetur. Orci volutpat mauris arcu non dictum elit sagittis. Mauris ullamcorper ac orci at sollicitudin integer tortor. Eget lacus est in duis vitae et..        `,
    },

    {
        Date:`11 Novembre 2023`,
        title:`Lorem ipsum dolor sit amet `,
        photo:science2,
        cle:['Lorem','ipsum','dolor','sit','Lorem'],
        article:` Lorem ipsum dolor sit amet consectetur. Orci volutpat mauris arcu non dictum elit sagittis. Mauris ullamcorper ac orci at sollicitudin integer tortor. Eget lacus est in  PlusLorem ipsum dolor sit amet consectetur. Orci volutpat mauris arcu non dictum elit sagittis. Mauris ullamcorper ac orci at sollicitudin integer tortor. Eget lacus est in duis vitae et..        `,
    },

    {
        Date:`11 Novembre 2023`,
        title:`Lorem ipsum dolor sit amet consectetur`,
        photo:science1,
        cle:['Lorem','ipsum','dolor','sit','Lorem'],
        article:` Lorem ipsum dolor sit amet consectetur. Orci volutpat mauris arcu non dictum elit sagittis. Mauris ullamcorper ac orci at sollicitudin integer tortor. Eget lacus est in  PlusLorem ipsum dolor sit amet consectetur. Orci volutpat mauris arcu non dictum elit sagittis. Mauris ullamcorper ac orci at sollicitudin integer tortor. Eget lacus est in duis vitae et..        `,
    },

]