import React, { useState } from 'react';
import'../index.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles
//importation for the slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LiaShareSolid } from "react-icons/lia";
import { FaHeart } from "react-icons/fa";// full heart
import { TbSearch } from "react-icons/tb";



//import images
import science3 from'../assets/images/science3.png';
import science2 from'../assets/images/science2.png';
import science1 from'../assets/images/science1.png';
import Books from'../assets/images/Books.png';

import { IoClose } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { IoFilter } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";


const MyCollection = () => {

    const [favorite, setFavorite] = useState([]);
    const[hoverFavorite,setHoverFavorite]= useState(false);

const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);

const toggleFavorite = (index) => {
    if (favorite.includes(index)) {
      // If index is already in favorites, remove it
      setFavorite(favorite.filter((favIndex) => favIndex !== index));
    } else {
      // If index is not in favorites, add it
      setFavorite([...favorite, index]);
    }
  };

    return (

        

                <div className='mt-0 mb-10'>   

                  {/*Picture*/}
                  <div className='px-3 md:px-14'>
                  <div className=' h-20 md:h-32 relative flex flex-row items-center justify-center bg-pink mt-36 md:mt-40 mb-10 rounded-3xl'>
                  <h className='text-3xl md:text-5xl font-bold -ml-20 md:ml-68 text-black'>Ma collection</h>
                  <img className=' absolute h-40 md:h-56 -bottom-5 right-0 md:right-16' src={Books} alt=""/>
                  </div>
                  </div>
                <div className='md:ml-20  flex flex-col-reverse md:flex-row-reverse  justify-between'>
                    {/* the liste of articles */}
                    <div className='md:w-3/4 h-[438px]  md:h-[438px] lg:show-atricle-scroll px-3 md:px-10 '>
                        
                    <div class="mx-auto h-full  overflow-scroll ">{/*overflow-scroll will add the scoll when overflow */}
                    {data.map((d,index) =>(
                    <div key={index} className=''>
                    <div className='bg-white  h-full  '>
                        <div className='flex flex-col md:flex-row'>
                        <img className='h-44 rounded-2xl p-3 mt-3' src={d.photo} alt=""/>
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
/> {/* Update the state based on the current value */}
                 
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


                     <FaFilePdf className='absolute right-3 top-2 text-xl' />

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
    
    
    
                {/* the Bar at left   #FAF9FE */}
                 <div className='lg:w-1/4  bg-[#FAF9FE] flex flex-col mb-10 md:mb-0 px-3 md:px-0'>
                    <div className='mx-auto h-48 md:h-[438px] overflow-scroll'>
                    <div className=' flex flex-row mb-5'>   
                    <IoFilter className='font-bold mt-1 mx-1 ml-3'/>
                    <p className='font-bold'> Filtrer</p>
                    <p className='text-[#5E6DF5] ml-48 md:ml-24'>Tout supprimer</p>
                   </div>
                    {/*Keywords */}
                    <p className='ml-3 font-bold'>mots clés</p>
                    <div className='flex flex-row flex-wrap ml-1'>
                        {keyWords.map((word, index) => (
                        <div className="relative bg-pink rounded-md flex-shrink-0 mt-2 px-5 mx-1 border-darkPink border-[1px] text-sm text-darkPink "
                         key={index}>
                        <IoClose className=' absolute text-darkPink text-sm hidden md:block md:right-0 md:top-1'/>
                        <IoClose className=' absolute text-darkPink text-sm md:hidden  right-1 top-[4px]'/>

                        {word}
                        </div>
                         ))}
                    </div>    
                    <div className='flex pr-2  bg-white w-full max-w-[95%] h-9 rounded-md border border-grey mt-2 ml-2'>
                        <input type="text" className=' focus:ring-darkPink rounded-md w-full h-full outline-none border-none placeholder:text-md' placeholder='Chercher des mots clés' />
                    <button >   
                    <GoPlus className='text-darkPink' />                   
                    </button>
                 </div>

                 {/*Authors */}
                 <p className='ml-3 font-bold mt-4'>Auteurs</p>
                 <div className='flex flex-row flex-wrap ml-1 '>
                        {Authors.map((word, index) => (
                        <div className="relative bg-pink rounded-md flex-shrink-0 mt-2 px-5 mx-1 border-darkPink border-[1px] text-sm text-darkPink "
                         key={index}>
                        <IoClose className=' absolute text-darkPink text-sm hidden md:block md:right-0 md:top-1'/>
                        <IoClose className=' absolute text-darkPink text-sm md:hidden  right-1 top-[4px]'/>
                        {word}
                        </div>
                         ))}
                    </div>    
                    <div className='flex pr-2 bg-white w-full max-w-[95%] h-9 rounded-md border border-grey mt-2 ml-2'>
                        <input type="text" className='focus:ring-darkPink rounded-md w-full h-full outline-none border-none placeholder:text-md' placeholder='Chercher des mots clés' />
                    <button >   
                    <GoPlus className='text-darkPink' />                   
                    </button>
                 </div>

                {/*Institutions */}
                 <p className='ml-3 font-bold mt-4'>Institutions</p>
                 <div className='flex flex-row flex-wrap ml-1 '>
                        {Institutions.map((word, index) => (
                        <div className="relative bg-pink rounded-md flex-shrink-0 mt-2 px-5 mx-1 border-darkPink border-[1px] text-sm text-darkPink "
                         key={index}>
                        <IoClose className=' absolute text-darkPink text-sm hidden md:block md:right-0 md:top-1'/>
                        <IoClose className=' absolute text-darkPink text-sm md:hidden  right-1 top-[4px]'/>
                        {word}
                        </div>
                         ))}
                    </div>    
                    <div className='flex pr-2 bg-white w-full max-w-[95%] h-9 rounded-md border border-grey mt-2 ml-2'>
                        <input type="text" className='focus:ring-darkPink rounded-md w-full h-full outline-none border-none placeholder:text-md' placeholder='Chercher des mots clés' />
                    <button >   
                    <GoPlus className='text-darkPink ml-2' />                   
                    </button>
                 </div>
                 {/*Publication date */}
                 <p className='ml-3 font-bold mt-4'>Date de publication</p>

                 <div className='ml-3 '>
                    <form className='flex flex-col'>
                        <label for="radio1">
                        <input type='radio' name="Groupe" value="Année actuelle" className=''/>
                        <h className='ml-2'>Année actuelle</h>
                        </label>

                        <label for="radio2">
                        <input type='radio' name="Groupe" value="5 dernières années" className=''/>
                        <h className='ml-2'>5 dernières années</h>
                        </label>

                        <label for="radio3" >
                        <input type='radio' name="Groupe" value="10 dernières années" className=''/>
                        <h className='ml-2'>10 dernières années</h>
                        </label>
                    </form>
                 </div>

                                  {/*Publication date */}
                                  <p className='ml-3 font-bold mt-4 mb-2'>Personnaliser</p>

                                  <div className="  flex justify-center items-center space-x-4 ">
                                    <div className='relative border border-grey'>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="From"
        className=" focus:ring-darkPink py-2 px-4 border-none  w-32 rounded focus:outline-none focus:border-blue-500"
      />
       <MdKeyboardArrowDown className='absolute right-2 top-2 mt-1 text-darkPink text-xl ' />
       </div>

       <div className='relative border border-grey rounded-sm'>
      <DatePicker
      id='from'
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        placeholderText="To"
        className="focus:ring-darkPink  py-2 px-4 border-none  w-32 rounded focus:outline-none focus:border-blue-500"
      />
            
                <MdKeyboardArrowDown className='absolute right-2 top-2 mt-1 text-darkPink text-xl ' />
       </div>

                                  </div>

                                  <div className='flex items-center justify-center bg-darkPink h-10 w-[95%] rounded-md mt-5 ml-2 mb-10'>
                                    <h className=' text-lg font-bold text-white'>Filtrer</h>

                                  </div>
                                  </div>
    
                 </div>
                  </div>
                </div>
                
    )};


export default MyCollection;

const keyWords = ["IOT", "Medicine", "DEGH", "Robotics", "JSQJG"];
const Authors = ["Name1", "Name2", "Name3", "Name4"];
const Institutions = ["Institution1", "Institution2", "Institution3", "Institution4"];


const data = [
    {
        Date:`11 Novembre 2023`,
        title:`Lorem ipsum dolor sit`,
        photo:science3,
        cle:['Lorem','ipsum','Lorem','ipsum','dolor','sit'],
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

    {
        Date:`11 Novembre 2023`,
        title:`Lorem ipsum dolor sit `,
        photo:science3,
        cle:['Lorem','ipsum','dolor','sit'],
        article:` Lorem ipsum dolor sit amet consectetur. Orci volutpat mauris arcu non dictum elit sagittis. Mauris ullamcorper ac orci at sollicitudin integer tortor. Eget lacus est in  PlusLorem ipsum dolor sit amet consectetur. Orci volutpat mauris arcu non dictum elit sagittis. Mauris ullamcorper ac orci at sollicitudin integer tortor. Eget lacus est in duis vitae et..        `,
    },

    {
        Date:`11 Novembre 2023`,
        title:`Lorem ipsum dolor sit amet `,
        photo:science2,
        cle:['Lorem','ipsum','dolor','sit','Lorem'],
        article:` Lorem ipsum dolor sit amet consectetur. Orci volutpat mauris arcu non dictum elit sagittis. Mauris ullamcorper ac orci at sollicitudin integer tortor. Eget lacus est in  PlusLorem ipsum dolor sit amet consectetur. Orci volutpat mauris arcu non dictum elit sagittis. Mauris ullamcorper ac orci at sollicitudin integer tortor. Eget lacus est in duis vitae et..        `,
    },
]