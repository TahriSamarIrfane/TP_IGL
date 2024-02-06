// export default Article;
import React, { useState } from 'react';
import'../index.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import science5 from'../assets/images/science5.png';
import { LiaShareSolid } from "react-icons/lia";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { data } from 'autoprefixer';
import { useNavigate } from 'react-router-dom';




const ModérerArticle = () => {

    const navigate = useNavigate();
    const [Edit, setEdit] = useState(false);   
    const [Auteur, setAuteur] = useState('');
    const [Abstract, setAbstract] = useState('');
    const [Titre, setTitre] = useState('');
    const [Ref, setRef] = useState('');
    const [KeyW, setKeyW] = useState('');
    const [Txt, setTxt] = useState('');
    const [Pdf, setPdf] = useState('');
    const [Etat, setEtat] = useState('T');
    const { id } = useParams();
    

    const handleEdit = () =>{
        setEdit(true);
   
    }
    const handleInputTitre =(event) => {
        setTitre(event.target.innerHTML);
    }
    const handleInputAbstract =(event) => {
        setAbstract(event.target.innerHTML);
    }
    const handleInputTxt =(event) => {
        setTxt(event.target.innerHTML);
        console.log(Txt);
    }
    const handleInputAuteur =(event) => {
        setAuteur(event.target.innerHTML);
    }
    const handleInputRef =(event) => {
        setRef(event.target.innerHTML);
        console.log(Ref);
    }
    const handleInputKeyW =(event) => {
        setKeyW(event.target.innerHTML);
        console.log(KeyW);
    }
 // ***********Modérer l'article*********
    const handleEditArticle=(id)=>{
        const url =  `http://localhost:8000/moder/${id}/`
        fetch(url,{
          method:'PATCH',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            auteur: Auteur,
            
            titre: Titre,
            abstract:Abstract,
            references:Ref,
            key_words:KeyW,
            full_text:Txt,
            pdf_file:Pdf,
            etat: Etat,

          }),
        }).then(
          response => {response.json()
          console.log("successfully corrected")
        navigate('/Moderateur')}
          )  
        }
// /***********Supprimer l'article***** */
    const handleDeleteArticle=(id)=>{
        
        const url =  `http://localhost:8000/moder/${id}/`
        fetch(url,{
          method:'DELETE',
          headers: {
            'Content-Type':'application/json'
          },
        }).then(
          response => {response.json()
          console.log("successfully deleted")}
          )  
        
        }
    
 
    return (
        <div className='p-2 md:p-20'>
            <div className='flex flex-col  bg-[#FAF9FE] pb-32 rounded-lg'> 
            <img className='w-full h-56 md:h-72 rounded-tr-lg rounded-tl-lg' src={science5} alt=""/>
           <p contentEditable={Edit} suppressContentEditableWarning={true} onInput={handleInputTitre} className='text-center text-3xl font-bold text-darkPink px-4 md:px-16 my-5' >{id}</p> 
            <div className='flex flex-row flex-wrap  justify-between px-10'> {/*Authors + institutions */}
            {AuthorsInstitutions.map((d,index) =>(             
            <div contentEditable={Edit} onInput={handleInputAuteur} suppressContentEditableWarning={true} key={index} className='flex-col  text-center mx-1'>
                <div className='text-[#82A498]'>{d.Author}</div>
                <div className='flex-col'> {/* Display each institution in a column */}
                  {d.Institutions.map((institution, i) => (
                    <div key={i} className='text-darkGery'>{institution}</div>
                    ))}
                </div>
           </div>
          
            ))}
             </div>

             <div className='flex flex-row justify-between px-10 mt-5'>{/*Date */}
             <div contentEditable={Edit} suppressContentEditableWarning={true} className='text-darkGery'>{date}</div>
             <div className='flex flex-row p-6 justify-center items-center '>
             <div className='flex flex-row space-x-5'>
                  <MdDeleteForever onClick={()=>handleDeleteArticle(id)} className='mt-1 text-2xl' />
                 {Edit && (<button onClick={()=>handleEditArticle(id)} className= ' px-2 mr-2 bg-darkPink text-[90%] text-center text-white rounded-xl '>Terminé</button>)}
                 {!Edit && (<FaEdit onClick={()=>handleEdit()} className='mt-1 text-2xl text-darkPink' />)}
                 <Link to='/Moderateur'><LiaShareSolid className='mt-1 text-2xl text-darkPink'/></Link>
                 
             </div>
            
             </div>
              
             </div>
             <div  className='px-10 mt-3 grid grid-cols-2 gap-4'>{/* Article */}

             <div>
              <p className='font-bold mb-4'>ABSTRACT</p>
              <p contentEditable={Edit} onInput={handleInputAbstract} suppressContentEditableWarning={true}>{article.abstract}</p>
              <p className='font-bold my-4'>KEYWORDS</p>

              <div contentEditable={Edit} onInput={handleInputKeyW} suppressContentEditableWarning={true} className='flex flex-wrap'> {/* Display each institution in a column */}
                  {article.keyWords.map((keyWords, i) => (
                    <div key={i} className='mb-2 text-black border border-black rounded-lg mr-2 text-xs p-1'>{keyWords}</div>
                    ))}
                </div>

            </div>

            {article.paragraph.split('\n').map((line, index) => (
            <p contentEditable={Edit} onInput={handleInputTxt} suppressContentEditableWarning={true} key={index}>{line}</p>
            ))}


            <div className='flex-col'> {/* Display each institution in a column */}
            <p className='font-bold mb-4'>REFERENCES</p>
                  {article.Reference.map((Reference, i) => (
                    <div contentEditable={Edit} suppressContentEditableWarning={true} onInput={handleInputRef}  key={i} className='text-black'>{Reference}</div>
                    ))}
                </div>


</div>


             
            </div>
        </div>
    );
};

const date = '25 December 2023';
const article =
{
    abstract: localStorage.getItem('Abstract'),
    keyWords : [localStorage.getItem('Reference')],
    paragraph: localStorage.getItem('Text'),
    Reference:[localStorage.getItem('Reference')],
}
;
 
const AuthorsInstitutions =[
    {
        Author:`Name1`,
        Institutions : ["Institution1", "Institution2", "Institution3", "Institution4"],
    },
    {
        Author:`Name2`,
        Institutions : ["Institution1", "Institution2", "Institution3", "Institution4"],
    },

    {
        Author:`Name3`,
        Institutions : ["Institution1", "Institution2", "Institution3"],
    },
    {
        Author:`Name4`,
        Institutions : ["Institution1"],
    },
    {
        Author:`Name5`,
        Institutions : ["Institution1", "Institution2", "Institution3", "Institution4"],
    },
];

export default ModérerArticle;
