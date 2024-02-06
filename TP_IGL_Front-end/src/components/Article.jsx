import React, { useEffect,useState } from 'react';
import'../index.css';

import science5 from'../assets/images/science5.png';
import { LiaShareSolid } from "react-icons/lia";
import { FaHeart } from "react-icons/fa";// full heart
import { FaFilePdf } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Article = () => {

const[favorite,setFavorite]= useState(false);
const[hoverFavorite,setHoverFavorite]= useState(false);
////////////////////to show the article's details
// Define the structure of your AuthorsInstitutions array or import it from somewhere
const navigate = useNavigate();
const location = useLocation();
const { article } = location.state || {};
// bring the id from the path to use it when adding the article to favorites
const id = location.pathname.split('/').pop();
console.log('Article details:******************************************', id);

const { auteurs, titre, abstract, references, key_words, full_text, pdf_file, Date } = article || {};

////// storage for favorites
  // Load favorite article IDs from localStorage
  const storedFavorites = JSON.parse(localStorage.getItem('favoriteIds')) || [];

  const [favoriteIds, setFavoriteIds] = useState(storedFavorites);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteIds')) || [];
    setFavoriteIds(storedFavorites);
  
    const isFavorite = storedFavorites.includes(id);
    setFavorite(isFavorite);
  }, []);
/////////////////////////// for add to favorite
const toggleFavorite = async () => {
  try {
    const response = await fetch('http://localhost:8000/ajouter_article_prefere/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        action: favorite ? 'remove' : 'add',
      }),
    });

    if (response.ok) {
      setFavorite(!favorite);

      // Update localStorage with the current list of favorites
      const updatedFavorites = favorite
        ? favoriteIds.filter(favId => favId !== id)
        : [...favoriteIds, id];
      localStorage.setItem('favoriteIds', JSON.stringify(updatedFavorites));

      console.log('Current favorites:', updatedFavorites);
    } else {
      console.error('Error adding/removing article from favorites:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding/removing article from favorites:', error);
  }
};

  
  // Call this function when the heart icon is clicked
  const handleToggleFavorite = () => {
    toggleFavorite();
  };
// Utility function to convert Arabic numerals to Roman numerals
const toRoman = (num) => {
    const romanNumerals = [
        "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
        "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX",
      // Add more numerals as needed
    ];
  
    return romanNumerals[num - 1] || num;
  };

  ////////////////////////////////////////
    return (
        <div className='p-2 md:p-20'>
          
            <div className='flex flex-col  bg-[#fef9fe] pb-32 rounded-lg'> 
            <img className='w-full h-56 md:h-72 rounded-tr-lg rounded-tl-lg' src={science5} alt=""/>
            <h className='text-center text-3xl font-bold text-darkPink px-4 md:px-16 my-5' >{titre}</h>
            <div className='flex flex-row flex-wrap  justify-between px-10'> {/*Authors + institutions */}
            {auteurs.map((d,index) =>(             
            <div key={index} className='flex-col  text-center mx-1'>
                <div className='text-[#82A498]'>{d.nom}</div>
                <div className='flex-col'> {/* Display each institution in a column */}
                  {d.institutions.map((institution, i) => (
                    <div key={i} className='text-darkGery'>{institution.nom}</div>
                    ))}
                </div>
           </div>
           
            ))}
             </div>

             <div className='flex flex-row justify-between px-10 mt-5'>{/*Date+PDF+favorite+share */}
             <div className='flex flex-row'>
             <div>
             <a href={pdf_file} target="_blank" rel="noopener noreferrer">
                  <FaFilePdf className='mt-1 text-xl text-darkPink' />
                </a></div>
             <div>
             <label className='flex'>
                 <input type='Radio' className='opacity-0'
                 onClick={()=>setFavorite(!favorite)}/> {/* Update the state based on the current value */}
                 
                 <FaHeart
  className='text-red-600 mr-3 mt-1 text-2xl cursor-pointer'
  color={favorite ? "red" : "grey"} // Update the color based on the favorite state
  onClick={handleToggleFavorite} // Call the function when the heart icon is clicked
/>
                 </label>
                 </div>
                 <div><LiaShareSolid className='mt-1 text-2xl text-darkPink'/></div>
                 </div>
             </div>

             <div className='px-10 mt-3 grid grid-cols-2 gap-4'>{/* Article */}

             <div>
              <p className='font-bold mb-4'>ABSTRACT</p>
              <p>{abstract}</p>
              <p className='font-bold my-4'>KEYWORDS</p>

              <div className='flex flex-wrap'> {/* Display each institution in a column */}
                  {key_words.map((keyWord, i) => (
                    <div key={i} className='mb-2 text-black border border-black rounded-lg mr-2 text-xs p-1'>{keyWord}</div>
                    ))}
                </div>

            </div>
 

{/* Split full_text into lines */}
{full_text &&
  full_text.split('\n').map((line, index) => (
    <div className='flex-col' key={index}>
      <p className='font-bold text-3xl'>{(index + 1)+"."}</p>
      <p>{line}</p>
    </div>
  ))}




            <div className='flex-col'> {/* Display each institution in a column */}
            <p className='font-bold mb-4'>REFERENCES</p>
            {references && typeof references === 'string' && references.split(',').map((reference, i) => (
            <div key={i} className='text-black'>
              {reference.trim()}
            </div>
          ))}
                </div>


</div>


             
            </div>
        </div>
    );
};


export default Article;