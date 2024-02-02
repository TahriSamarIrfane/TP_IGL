import React, { useState,useEffect  } from 'react';
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
import { useNavigate } from 'react-router-dom';
const MyCollection = () => {

    const [favorite, setFavorite] = useState([]);
    const[hoverFavorite,setHoverFavorite]= useState(false);

const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);

const storedFavorites = JSON.parse(localStorage.getItem('favoriteIds')) || [];


const toggleFavorite = async (id, index) => {
  setFavorite((prevFavorites) => {
    const isFavorite = prevFavorites.some((fav) => fav.id === id);

    // Update the backend
    const updateBackend = async () => {
      try {
        const response = await fetch('http://localhost:8000/ajouter_article_prefere/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            action: isFavorite ? 'remove' : 'add',
          }),
        });

        if (!response.ok) {
          console.error('Error adding/removing article from favorites:', response.statusText);
        }
      } catch (error) {
        console.error('Error adding/removing article from favorites:', error);
      }
    };

    updateBackend();

    // Update localStorage with the updated favorites
    const updatedFavorites = isFavorite
      ? prevFavorites.filter((fav) => fav.id !== id)
      : [...prevFavorites, { id, index }];

    localStorage.setItem('favoriteIds', JSON.stringify(updatedFavorites.map((fav) => fav.id)));

    // Update the frontend state
    return updatedFavorites;
  });
};

  const [favoriteArticles, setFavoriteArticles] = useState([]);  // Add favoriteArticles to state
  const [searchResults, setSearchResults] = useState([]);
  const [originalSearchResults, setOriginalSearchResults] = useState([]);

  const fetchFavoriteArticles = async () => {
    try {
      const response = await fetch('http://localhost:8000/consulter_articles_preferes/');
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'OK') {
          // Set the list of favorite articles
          favoriteArticles
          setSearchResults(data.favorite_articles);
          setOriginalSearchResults(data.favorite_articles);
        } else {
          // Handle error, log, or show a message to the user
          console.error('Error fetching favorite articles:', data.message);
        }
      } else {
        // Handle HTTP error
        console.error('HTTP error:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error('Error fetching favorite articles:', error.message);
    }
  };

  useEffect(() => {
    // Fetch favorite articles on component mount
    fetchFavoriteArticles();
  }, []);
 

  const navigate = useNavigate();

// the filter
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleFilter = async () => {
    try {

          // Check if all filter fields are empty
    if (keywords.length === 0 && Authors.length === 0 && Institutions.length === 0 && !startDate && !endDate) {
      // If all fields are empty, set the filtered results as the original search results without applying any filters
      setSearchResults(originalSearchResults);
      return;
    }
      // Apply keyword filter
      let filteredResults = searchResults.filter(result => {
        const keywordsInResult = result._source?.key_words;
        console.log('Result Keywords:', keywordsInResult);
        console.log('Filter Keywords:', keywords);
        setSearchResults(originalSearchResults);
        return keywords.length === 0 || (keywordsInResult && keywordsInResult.some(keyword => keywords.includes(keyword)));
      });
  
// Apply author filter
filteredResults = filteredResults.filter(result => {
  const auteursInResult = result._source?.auteurs;

  return Authors.length === 0 || (auteursInResult && auteursInResult.some(auteur => {
    const authorNamesInAuteur = auteur.nom;
    return Authors.includes(authorNamesInAuteur);
  }));
});
  
// Apply institution filter
filteredResults = filteredResults.filter(result => {
  const auteursInResult = result._source?.auteurs;

  return Institutions.length === 0 || (auteursInResult && auteursInResult.some(auteur => {
    const institutionsInAuteur = auteur.institutions.map(institution => institution.nom);
    return Institutions.length === 0 || institutionsInAuteur.some(institution => Institutions.includes(institution));
  }));
});
  
// Apply date range filter
filteredResults = filteredResults.filter(result => {
  const articleDate = new Date(result._source?.Date.split('/').reverse().join('-'));
  return (!startDate || articleDate >= startDate) && (!endDate || articleDate <= endDate);
});
      
  
      // Update your state or do something with the filtered results
      setSearchResults(filteredResults);
  
    } catch (error) {
      console.error('Error filtering results:', error);
    }
  };


 const handleStartDateChange = (date) => {
   setStartDate(date);
   console.log('Start Date:', date);
 };
 
 const handleEndDateChange = (date) => {
   setEndDate(date);
   console.log('End Date:', date);
 };
 
 const [keywordsInput, setKeywordsInput] = useState("");
 const [keywords, setKeywords] = useState([]);
 const [authorsInput, setAuthorsInput] = useState("");
 const [Authors, setAuthors] = useState([]);
 const [institutionsInput, setInstitutionsInput] = useState("");
 const [Institutions, setInstitutions] = useState([]);

 const handleInputChange = (e, setState) => {
  setState(e.target.value);
  console.warn(e.target.value);
};

const addKeyword = (input, setState) => {
  if (input.trim() !== "") {
    setState((prevKeywords) => [...prevKeywords, input.trim()]);
    // Clear input after adding
    setKeywordsInput("");
  }
};

const removeKeyword = (index, setState) => {
  setState((prevKeywords) => prevKeywords.filter((_, i) => i !== index));
};

const removeInstitution = (index, setState) => {
  setState((prevInstitution) => prevInstitution.filter((_, i) => i !== index));
};

const removeAuthor = (index, setState) => {
  setState((prevAuthor) => prevAuthor.filter((_, i) => i !== index));
};

const addAuthor = (input, setState) => {
  if (input.trim() !== "") {
    setState((prevAuthor) => [...prevAuthor, input.trim()]);
    // Clear input after adding
    setAuthorsInput("");
  }
};

const addInstitutions = (input, setState) => {
  if (input.trim() !== "") {
    setState((prevInstitution) => [...prevInstitution, input.trim()]);
    // Clear input after adding
    setInstitutionsInput("");
  }
};



//remove all tables content when click supprimer tout
const clearMap = (input, setState) => {
  setKeywords([]);
  setAuthors([]);
  setInstitutions([]);
  setStartDate(null);
  setEndDate(null);
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
                    {searchResults.map((article,index) =>(
                      console.log('favoriteArticles:***********', favoriteArticles),
                    <div key={article.id} className=''>
                    <div className='bg-white  h-full  '>
                        <div className='flex flex-col md:flex-row'>
                        <img className='h-44 rounded-2xl p-3 mt-3' src={science3} alt=""/>
                        <div className='mt-3'>
                 <div className='flex flex-col'>
                 <div className='flex flex-row justify-between'>
                 <h className='text-grey mt-1 text-[12px]'> {article._source.Date}</h>
                 <div className=' flex flex-row'>
                 <LiaShareSolid className='mt-1 text-2xl'/>
                 <button className='top-0'>Share</button>
                 <label className='flex'>
                 <input
                      type='checkbox'
                      className='opacity-0'
                      checked={storedFavorites.includes(article._id)}
                      onChange={() => toggleFavorite(article._id, index)}
                    />
                 
                    {/* Update the state based on the current value */}
                    <FaHeart
                                  className='text-red-600 mx-3 mt-1 text-2xl cursor-pointer'
                                  color={
                                    storedFavorites.includes(article._id) || hoverFavorite === index
                                      ? 'red'
                                      : 'grey'
                                  }
                                  onMouseEnter={() => setHoverFavorite(index)}
                                  onMouseLeave={() => setHoverFavorite(null)}
                                />
                 </label>
    
    
                 {/*<FaRegHeart /> empty heartTOOOO change lateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer */}
                 </div>
                 </div>
                 <p className='font-bold text-lg'>{article._source.titre}</p>
                 <p className="line-clamp-2 text-darkGery text-sm">
                  {article._source.full_text}</p>
                  <p className="text-black font-bold text-sm" onClick={() => navigate(`/Article/${article._id}`, { state: { article: article._source } })}>
  Voir plus
</p>
                       <div className='relative pr-5 mt-2 md:pr-40'>
                        {/* inline-block will change the container width according to text length */}
  


                        <div className='flex flex-wrap flex-row'>

                        {article._source.key_words.map((keyword, index) => (
  <div key={index} className="bg-white inline-block border rounded-2xl border-darkGery text-center mx-1 my-1">
    <h className="px-3 text-darkGery">{keyword}</h>
  </div>
))}
</div>


<a href={article._source.pdf_file} target="_blank" rel="noopener noreferrer">
                  <FaFilePdf className='absolute right-3 top-2 text-xl cursor-pointer' />
                </a>
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
                    <p className='text-[#5E6DF5] mr-1 ml-48 md:ml-24 cursor-pointer'onClick={clearMap}>Tout supprimer</p>
                   </div>
                    {/*Keywords */}
                    <p className='ml-3 font-bold'>mots clés</p>
  

                    

                    <div className='flex flex-row flex-wrap ml-1'>
  {keywords.map((word, index) => (
    <div
      className="relative bg-pink rounded-md flex-shrink-0 mt-2 px-5 mx-1 border-darkPink border-[1px] text-sm text-darkPink "
      key={index}
    >
      <IoClose
        className='absolute text-darkPink text-sm hidden md:block md:right-0 md:top-1 cursor-pointer'
        onClick={() => removeKeyword(index, setKeywords)}
      />
      <IoClose
        className='absolute text-darkPink text-sm md:hidden right-1 top-[4px] cursor-pointer'
        onClick={() => removeKeyword(index, setKeywords)}
      />
      {word}
    </div>
  ))}
</div>



                    
<div className='flex pr-2 bg-white w-full max-w-[95%] h-9 rounded-md border border-grey mt-2 ml-2'>
  <input
    type="text"
    className='rounded-md w-full h-full outline-none border-none placeholder:text-md'
    placeholder='Chercher des mots clés'
    value={keywordsInput}
    onChange={(e) => handleInputChange(e, setKeywordsInput)}
  />
  <button onClick={() => addKeyword(keywordsInput, setKeywords)}>
    <GoPlus className='text-darkPink' />
  </button>
</div>


                 {/*Authors */}
                 <p className='ml-3 font-bold mt-4'>Auteurs</p>
                 <div className='flex flex-row flex-wrap ml-1 '>
                        {Authors.map((word, index) => (
                        <div className="relative bg-pink rounded-md flex-shrink-0 mt-2 px-5 mx-1 border-darkPink border-[1px] text-sm text-darkPink "
                         key={index}>

<IoClose
        className='absolute text-darkPink text-sm hidden md:block md:right-0 md:top-1 cursor-pointer'
        onClick={() => removeAuthor(index, setAuthors)}
        
      />
      <IoClose
        className='absolute text-darkPink text-sm md:hidden right-1 top-[4px] cursor-pointer'
        onClick={() => removeAuthor(index, setAuthors)}
      />


                        {word}
                        </div>
                         ))}
                    </div>    
                    <div className='flex pr-2 bg-white w-full max-w-[95%] h-9 rounded-md border border-grey mt-2 ml-2'>
                        <input type="text" className='rounded-md w-full h-full outline-none border-none placeholder:text-md'
                         placeholder='Chercher des mots clés'
                         value={authorsInput}
                         onChange={(e) => handleInputChange(e, setAuthorsInput)}
                         />

                    <button onClick={() => addAuthor(authorsInput, setAuthors)}>
                    <GoPlus className='text-darkPink' />
                    </button>
                 </div>

 


                {/*Institutions */}
                 <p className='ml-3 font-bold mt-4'>Institutions</p>
                 <div className='flex flex-row flex-wrap ml-1 '>
                        {Institutions.map((word, index) => (
                        <div className="relative bg-pink rounded-md flex-shrink-0 mt-2 px-5 mx-1 border-darkPink border-[1px] text-sm text-darkPink "
                         key={index}>
                        

                        <IoClose
        className='absolute text-darkPink text-sm hidden md:block md:right-0 md:top-1 cursor-pointer'
        onClick={() => removeInstitution(index, setInstitutions)}
      />
      <IoClose
        className='absolute text-darkPink text-sm md:hidden right-1 top-[4px] cursor-pointer'
        onClick={() => removeInstitution(index, setInstitutions)}
      />

                        {word}
                        </div>
                         ))}
                    </div>    
                    <div className='flex pr-2 bg-white w-full max-w-[95%] h-9 rounded-md border border-grey mt-2 ml-2'>
                        <input type="text" className='rounded-md w-full h-full outline-none border-none placeholder:text-md'
                         placeholder='Chercher des mots clés'
                         value={institutionsInput}
                         onChange={(e) => handleInputChange(e, setInstitutionsInput)}
                         />

                    
                    <button onClick={() => addInstitutions(institutionsInput, setInstitutions)}>
                    <GoPlus className='text-darkPink' />
                    </button>
                 </div>
                 {/*Publication date */}


                                  {/*Publication date */}
                                  <p className='ml-3 font-bold mt-4 mb-2'>Personnaliser</p>

                                  <div className="  flex justify-center items-center space-x-4 ">
                                    <div className='relative border border-grey'>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        placeholderText="From"
        className="py-2 px-4 border-none  w-32 rounded focus:outline-none focus:border-blue-500"
      />
       <MdKeyboardArrowDown className='absolute right-2 top-2 mt-1 text-darkPink text-xl ' />
       </div>

       <div className='relative border border-grey rounded-sm'>
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        placeholderText="To"
        className="py-2 px-4 border-none  w-32 rounded focus:outline-none focus:border-blue-500"
      />
             <MdKeyboardArrowDown className='absolute right-2 top-2 mt-1 text-darkPink text-xl ' />
       </div>

                                  </div>

                                  <div className='flex items-center justify-center bg-darkPink h-10 w-[95%] rounded-md mt-5 ml-2 mb-10 cursor-pointer'onClick={handleFilter}>
                                    <h className=' text-lg font-bold text-white'  >Filtrer</h>
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