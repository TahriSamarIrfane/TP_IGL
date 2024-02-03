import React, { useState } from 'react';
import'../index.css';

//importation for the slick-carousel
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//import images
import RobotPic from'../assets/images/RobotPic.png';
import BlackSplash from'../assets/images/BlackSplash.png';
import BlackSplash2 from'../assets/images/BlackSplash2.png';
import TEAMpic from'../assets/images/TEAMpic.png';
import Line1 from '../assets/images/Line1.png';
import icon1 from '../assets/icons/icon1.png';
import icon2 from '../assets/icons/icon2.png';
import email from '../assets/icons/@.png';
import telephone from '../assets/icons/telephone.png';
import icon3 from '../assets/icons/icon3.png';
import icon4 from '../assets/icons/icon4.png';
import FeedBacks from'../assets/images/FeedBacks.png';
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


const apiurl = "http://127.0.0.1:8000"

const HomeGuests = () => {

  //Contact-us integration with contact-view
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all required elements are present
    if (!nom || !email || !message) {
      console.error('One or more form elements are missing.');
      return;
    }

    // Perform AJAX request
    try {
      const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

      const response = await fetch(`${apiurl}/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
          nom: nom,
          email: email,
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      // Handle the response data as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };

    return (
       <div>

        {/* S'inscrire , Se connecter*/}
        <div className="bg-white mt-20  lg:pr-10 flex flex-col md:flex-row-reverse  items-center justify-between ">
            <div>
                <img className='lg:robot-height lg:robot-width mb-10 md:mb-40 lg:mb-40 float-left' src={RobotPic} alt=""/>
            </div>
            {/*  Text */}
            <div className='md:w-2/3 lg:mt-20'>
                <div className='px-2 md:px-24'>
                <h className=" bg-pink text-2xl text-darkPink font-Tahoma md:w-3/4 p-0 leading-snugs font-bold">Enjoy
                 with Surfey </h>
                 <p className='text-black font-bold text-3xl md:text-4xl lg:text-5xl md:w-3/4'>L'Univers de la Connaissance à Votre Portée</p>
                 <p className="text-grey font-Tahoma mt-4 md:w-3/4">Plus de 12000 articles scientifiques,
                  Inscrivez-vous et Plonger dans le Monde de la Science.</p>
                  </div >
                  <div className='relative'>
                  <img className='h-60 line1-width lg:splach lg:mt-5' src={BlackSplash} alt=""/>
                  <div className='flex  space-x-44 lg:space-x-72'>
                  <a href='#' className="text-lg mt-3 ml-3 md:ml-16 bg-darkPink font-Segoe rounded-3xl py-2 px-3 text-pink font-bold absolute top-0 left-0 lg:ml-32">Se Connecter</a>
                  <a href='#' className="text-lg mt-3 bg-pink font-Segoe rounded-3xl py-2 px-7 text-darkPink font-bold absolute top-0 left-0 ">S’Inscrire</a>
                  </div>
                  </div>
                 </div> 
                             
         </div>

        {/* A propos*/}
            <div id="sectionApropos" className='lg:mt-20'>
            <div className='ml-5 md:ml-20 flex flex-col md:flex-row-reverse  items-center justify-between'>
                <div>
                    <div className='flex flex-col md:flex-row-reverse  items-center justify-between'>
               <img className='line1-width line1-height' src={Line1} alt=""/>
             <p className='text-black font-bold text-5xl w-3/4 md:w-3/4 ml-40 md:text-4xl md:ml-56'>A Propos</p>
             </div>
             <p className="md:px-20 text-grey font-Tahoma mt-4 ">Lorem ipsum dolor sit amet consectetur. Neque risus et eget molestie consectetur. Euismod sit ligula commodo cursus. Metus ac dui nunc facilisi a vestibulum non. Tortor et quis ac placerat nisl id. Amet etiam tempus quis lacus. Nibh id in etiam libero nunc enim interdum..</p>
             </div>
             <img className='h-50 md:h-72 lg:h-72 ' src={TEAMpic} alt=""/>
              </div>
            </div> 

         {/* Nos Services*/}
         <p id="sectionSrevice" className='text-center text-5xl font-bold mt-10 mb-10'>Nos Services</p>
         <div   className='max-w-screen-lg mx-auto p-4'>
            
            <div className=' grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 md:px-10 lg:px-20 '>

                 {/* first square*/}
              <div className='relative  '>
              <div className='absolute flex  flex-col items-center justify-center py-4'>
              <img className='h-20  ' src={icon3} alt=""/>
                 <p className=' text-white font-bold px-14 pt-2'>Large Choix d'Articles Scientifiques</p> 
                 <p className=' text-white pt-3 px-10'>Explorez une vaste collection d'articles scientifiques sur notre site, offrant un choix étendu pour répondre à vos besoins de recherche.</p>    
                 </div>  
                 <div className="square w-full "/>
              </div>

              {/* second square*/}
              <div className='relative  '>
              <div className='absolute flex  flex-col items-center justify-center py-4'>
              <img className='h-20  ' src={icon2} alt=""/>
                 <p className=' text-white font-bold px-14 pt-2'>Téléchargement PDF</p> 
                 <p className=' text-white pt-3 px-10'>Accédez à la flexibilité avec la possibilité de télécharger les articles au format PDF, vous permettant de les lire hors ligne à tout moment.</p>    
                 </div>  
                 <div class="square w-full "/>
              </div>

              {/* third square*/}
              <div className='relative  '>
              <div className='absolute flex  flex-col items-center justify-center py-4'>
              <img className='h-20  ' src={icon1} alt=""/>
                 <p className=' text-white font-bold px-14 pt-2'>Profil Utilisateur Personnalisé</p> 
                 <p className=' text-white pt-3 px-10'>Créez votre espace personnalisé avec un profil utilisateur. Enregistrez vos articles favoris et personnalisez votre expérience de recherche.</p>    
                 </div>  
                 <div class="square   w-full"/>
              </div>

              {/* fourth square*/}
              <div className='relative  '>
              <div className='absolute flex  flex-col items-center justify-center py-4'>
              <img className='h-20  ' src={icon4} alt=""/>
                 <p className=' text-white font-bold px-14 pt-2'>Devenir Modérateur</p> 
                 <p className=' text-white pt-3 px-10'>Participez activement en devenant modérateur. Contribuez à la qualité de notre plateforme en modérant les articles et en façonnant le contenu.</p>    
                 </div>  
                 <div class="square   w-full"/>
              </div>
         
         </div>
         </div>

         {/* Feedbacks*/}
         <div  class="flex flex-col items-center justify-center mt-20 ">
         <img id="sectionFeedBack" className='justify-center h-10 w-72' src={FeedBacks} alt=""/>
         <p className='text-grey mt-5 px-5'>Découvrez ce que disent nos utilisateurs satisfaits à propos de notre application</p>
         </div>

         <div className='relative' >
            <Slider {...settings} className='p-10'>
            {data.map((d) =>(
                <div className='p-3'>
                <div className='bg-lightPink shadow-md  md:h-96 lg:h-72 rounded-3xl p-4'>
                        <div className='flex flex-col'>
                            <div className='flex flex-row'>
                    <img className='h-24 w-24 rounded-full p-3 ' src={d.photo} alt=""/>
                    <div className='mt-3'>
                    <p className='font-bold'>{d.name}</p>
                    <p>{d.stars}</p>
                    </div>
                    </div>

                        <div className='text-center'>
                        <p>{d.FeedBack}</p>                        
                        </div>
                    </div> 
                 </div>
                 </div>
            ))
            }
            </Slider>
            
         </div>



         {/* Que Pensiez-Vous ?*/}
     <div class="flex flex-col items-center justify-center">

<div className="bg-white flex flex-col  md:flex-row-reverse  items-center justify-between ">
  
    <div className='md:w-1/3 lg:mt-20 flex-shrink-0'>

      {/* the right side*/}
    <div className='relative '>
          <img className=' right-0 lg:mt-5 ml-6 mf:ml-0' src={BlackSplash2} alt=""/>
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
        <form id="ContactForm" onSubmit={handleSubmit} encType="multipart/form-data" action='' className='flex flex-col space-y-4'>
        <input type="hidden" name="csrfmiddlewaretoken" value="{% csrf_token %}" />
            {/* Nom*/}
            <div className=''>
              <label for="" className='font-bold text-md'>Nom Complet</label>
            </div>
            <div className=''>
              <input 
               type='text' 
               placeholder='Entrez votre nom complet' 
               className='bg-lightGrey outline-none ring-1 ring-gray-300 w-full rounded-2xl px-4 py-2 focus:ring-2 focus:ring-rose-200'
               id="nom"
               name="nom"
               value={nom}
               onChange={(e) => setNom(e.target.value)}
               required
              />
            </div>

             {/*Email*/}
             <div className=''>
              <label for="" className='font-bold text-md'>Email</label>
            </div>
            <div className=''>
              <input 
              type='email' 
              placeholder='Entrez votre mail' 
              className='bg-lightGrey outline-none ring-1 ring-gray-300 w-full rounded-2xl px-4 py-2 focus:ring-2 focus:ring-rose-200'
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
             />
            </div>

            {/*text*/}
            <div className=''>
              <label for="" className='font-bold text-mds'>Commentaire</label>
            </div>
            <div className=''>
              <textarea 
              type='text' 
              placeholder='Ajoutez un Commentaire...' 
              className='resize-none bg-lightGrey outline-none ring-1 ring-gray-300 w-full rounded-2xl px-4 py-2 focus:ring-2 focus:ring-rose-200'
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              />
            </div>

            <button 
            className='shadow-md inline-block self-end bg-darkPink text-white font-bold rounded-2xl px-6 py-2 w-full'
            type="submit"
            name="submit"
            > Envoyer 
            </button>
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

const data = [
    {
        name:`Alex`,
        photo:`https://placebear.com/300/200`,
        stars:`✱✱✱✱✱`,
        FeedBack:`Je suis impressionné par la facilité avec laquelle je peux télécharger des articles scientifiques sur ce site. Enregistrer mes articles favoris pour y revenir plus tard est un énorme avantage. Hautement recommandé !`,
    },

    {
        name:`Emily`,
        photo:`https://robohash.org/yourtext.png`,
        stars:`✱✱✱✱✱`,
        FeedBack:`Une ressource exceptionnelle pour tous les chercheurs. La possibilité de télécharger des articles en PDF illimité simplifie grandement la gestion de ma bibliographie. Bravo pour cette innovation !`,
    },

    {
        name:`Marie`,
        photo:`https://plus.unsplash.com/premium_photo-1700175395626-360f76faa0c8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwMjc2NjQ3NQ&ixlib=rb-4.0.3&q=80&w=100`,
        stars:`✱✱✱✱✱`,
        FeedBack:`Ce moteur de recherche a vraiment changé la donne pour moi. Non seulement je peux accéder à une multitude d'articles, mais la fonction pour enregistrer mes préférés facilite la relecture. Une excellente ressource pour la communauté scientifique`,
    },

    {
        name:`Alex`,
        photo:`https://placebear.com/300/200`,
        stars:`✱✱✱✱✱`,
        FeedBack:`Je suis impressionné par la facilité avec laquelle je peux télécharger des articles scientifiques sur ce site. Enregistrer mes articles favoris pour y revenir plus tard est un énorme avantage. Hautement recommandé !`,
    },

    {
        name:`Emily`,
        photo:`https://robohash.org/1.png`,
        stars:`✱✱✱✱✱`,
        FeedBack:`Une ressource exceptionnelle pour tous les chercheurs. La possibilité de télécharger des articles en PDF illimité simplifie grandement la gestion de ma bibliographie. Bravo pour cette innovation !`,
    },

    {
        name:`Marie`,
        photo:`https://ui-avatars.com/api/?name=John+Doe&size=100`,
        stars:`✱✱✱✱✱`,
        FeedBack:`Ce moteur de recherche a vraiment changé la donne pour moi. Non seulement je peux accéder à une multitude d'articles, mais la fonction pour enregistrer mes préférés facilite la relecture. Une excellente ressource pour la communauté scientifique`,
    },
]