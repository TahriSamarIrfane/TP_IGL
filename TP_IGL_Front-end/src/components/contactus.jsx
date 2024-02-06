import React, { useState } from 'react';
import'../index.css';
//importation for the slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//import images
import BlackSplash2 from'../assets/images/BlackSplash2.png';
import email from '../assets/icons/@.png';
import telephone from '../assets/icons/telephone.png';
import quePensiezVous from'../assets/images/QuePensiez-Vous.png';
import bird from'../assets/images/bird.png';

const apiurl = "http://127.0.0.1:8000"

const ContactUs = () => {
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

export default ContactUs;
