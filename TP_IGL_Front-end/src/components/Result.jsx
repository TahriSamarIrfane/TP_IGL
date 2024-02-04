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
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//import images
import { IoClose } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { IoFilter } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import science3 from'../assets/images/science3.png';

const Result = () => {

  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [initialSearchDone, setInitialSearchDone] = useState(false);

  useEffect(() => {
    const searchTermFromQuery = new URLSearchParams(location.search).get('searchTerm');

    // Check if the search term is present in the URL and is different from the current state
    if (searchTermFromQuery && searchTermFromQuery !== searchTerm && !initialSearchDone) {
      // If different and initial search not done, update the search term state and trigger the search
      setSearchTerm(searchTermFromQuery);
      console.log('-----------------------------',searchTermFromQuery)
      handleSearch();
      
      setInitialSearchDone(true); // Mark initial search as done
    }
  }, [location.search, searchTerm, initialSearchDone]);
  // Trigger the search when searchTerm changes
useEffect(() => {
  if (searchTerm) {
    console.log('Search Term:', searchTerm);
    handleSearch();
  }
}, [searchTerm]);

    const [favorite, setFavorite] = useState([]);
    const[hoverFavorite,setHoverFavorite]= useState(false);

const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
console.log("ù************************",startDate);

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


const storedFavorites = JSON.parse(localStorage.getItem('favoriteIds')) || [];

useEffect(() => {
  const storedFavorites = JSON.parse(localStorage.getItem('favoriteIds')) || [];

  setFavorite(storedFavorites.map(id => ({ id })));
}, []);

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
      : [...prevFavorites, { id }];

    localStorage.setItem('favoriteIds', JSON.stringify(updatedFavorites.map((fav) => fav.id)));

    // Update the frontend state
    return updatedFavorites;
  });
};



 


  /////////////////////for key words+authors+institutions filter/////////////////////////////////////////////////////////////////////////////////////////////////////
  const [searchResults, setSearchResults] = useState([]);
  const [originalSearchResults, setOriginalSearchResults] = useState([]);

  /////////////////////for key words+authors+institutions filter/////////////////////////////////////////////////////////////////////////////////////////////////////
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
  
/* Apply date range filter
filteredResults = filteredResults.filter(result => {
  const articleDate = new Date(result._source?.Date.split('/').reverse().join('-'));
  return (!startDate || articleDate >= startDate) && (!endDate || articleDate <= endDate);
});*/ //the format dd/mm/yyyy

// Apply date range filter
filteredResults = filteredResults.filter(result => {
  const articleDate = new Date(result._source?.Date);

  // Format the articleDate to dd-mm-yyyy
  const formattedDate = `${articleDate.getDate().toString().padStart(2, '0')}-${(articleDate.getMonth() + 1).toString().padStart(2, '0')}-${articleDate.getFullYear()}`;
console.log("------------------",formattedDate);
  // Parse the formatted date into a new Date object
  const parsedDate = new Date(formattedDate);

  return (!startDate || parsedDate >= startDate) && (!endDate || parsedDate <= endDate);
});
      
  
      // Update your state or do something with the filtered results
      setSearchResults(filteredResults);
  
    } catch (error) {
      console.error('Error filtering results:', error);
    }
  };
  
  

  /////for add to favorite

  const isFavorite = favorite.includes(searchResults._id);

  
  
  
  
  /////////////////////for authours filter/////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  ///////////////////Search bar/////////////////////////////////////////////////////////////////////////////////////////////////
const [message, setMessage] = useState('');



const handleSearch = async () => {
  try {
    const response = await fetch('http://localhost:8000/rechercher_articles/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mots_cles: searchTerm,
      }),
    });

    if (response.ok) {
      console.log('**********************************');
      const data = await response.json();
      ///console.log('Search results:', data.search_results);

            // Update state with search results
            setSearchResults(data.search_results);
            setOriginalSearchResults(data.search_results);
            console.log('*******************************',data.search_results);
           // Check if there are no search results
      if (data.search_results.length === 0) {
        setMessage('No articles found for the given search term.');
      } else {
        setMessage('');
      } 
      // Handle the received search results as needed
    } else {
      console.error('Error:', response.statusText);
      setMessage(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    setMessage('An error occurred while fetching data.');
  }
};


const navigate = useNavigate();
const handleNavigate = (result) => {
  console.log('Handling navigation for result:---------------------------', result);
  console.log('Result _id:', result._id);
  console.log('Result _source:', result._source);
  navigate(`/Article/${result._id}`, { state: { article: result._source } });
};
  //////////////////////////////////////////////////////////////////////////////

  
    return (

        

                <div className='mt-20 mb-10'>   

                  {/*Search bar */}
                  <div className='flex items-center justify-center mb-5 px-3 md:px-0'>
                 <div className='flex items-center  bg-white w-full md:w-[70%] h-14 rounded-2xl border border-grey'>
                    <TbSearch className='text-4xl ml-2 text-grey'/>
                        <input type="text" className='focus:ring-darkPink w-full h-full outline-none border-none placeholder:text-xl'
                         placeholder='Search articles...' 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          />
                    <button className=' ml-auto bg-darkPink h-full w-24 rounded-tr-2xl rounded-br-2xl' onClick={handleSearch}>   
                    <h2 className='text-white font-bold text-xl'>Surf </h2>                   
                    </button>
                 </div>
                 </div>

                <div className='md:ml-20  flex flex-col-reverse md:flex-row-reverse  justify-between'>
                    {/* the liste of articles */}
                    <div className='lg:w-3/4 h-[438px] md:h-[438px] lg:show-atricle-scroll px-3 md:px-10 '>
                        
                    <div class="mx-auto h-full  overflow-scroll ">{/*overflow-scroll will add the scoll when overflow */}
                    {searchResults && searchResults.length > 0 ? (
                    searchResults.map((result, index) => (


                    <div key={index} className=''>
                    <div className='bg-white  h-full  '>
                        <div className='flex flex-col md:flex-row bg-white'>
                        <img className='h-44 rounded-2xl p-3 mt-3' src={science3} alt=""/>
                        <div className='mt-3'>
                 <div className='flex flex-col'>
                 <div className='flex flex-row justify-between'>
                <h className='text-grey mt-1 text-[12px]'> {result._source.Date}</h>
                 <div className=' flex flex-row md:ml-72 '>
                 <LiaShareSolid className='mt-1 text-2xl'/>
                 <button className='top-0'>Share</button>
                 <label className='flex'>
                    <input
                      type='checkbox'
                      className='opacity-0'
                      checked={storedFavorites.includes(result._id)}
                      onChange={() => toggleFavorite(result._id, index)}
                    />
                    {/* Update the state based on the current value */}
                    <FaHeart
                                  className='text-red-600 mx-3 mt-1 text-2xl cursor-pointer'
                                  color={
                                    storedFavorites.includes(result._id) || hoverFavorite === index
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
                 <p className='font-bold text-lg cursor-pointer' onClick={() => navigate(`/Article/${result._id}`, { state: { article: result._source } })}>{result._source.titre}</p>
                 <p className="line-clamp-2 text-darkGery text-sm">
                 {result._source.full_text}</p>

<p className="text-black font-bold text-sm cursor-pointer" onClick={() => navigate(`/Article/${result._id}`, { state: { article: result._source } })}>
  Voir plus
</p>

                       <div className='relative pr-5 mt-2 md:pr-40'>
                        {/* inline-block will change the container width according to text length */}
  


                        <div className='flex flex-wrap flex-row'>
  {result._source.key_words.map((cle, cleIndex) => (
    <div key={cleIndex} className="bg-white inline-block border rounded-2xl border-darkGery text-center mx-1 my-1 ">
      <h className="px-3 text-darkGery">{cle}</h>
    </div>
  ))}
</div>


<a href={result._source.pdf_file} target="_blank" rel="noopener noreferrer">
                  <FaFilePdf className='absolute right-3 top-2 text-xl cursor-pointer' />
                </a>
                     </div>
                 </div> 
                 </div>     
                        </div>
                        </div>
                        </div> 
                    
                    ))
                    ) : (
                      <p>Aucun résultat de recherche trouvé.</p>
                    )}


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



export default Result;



