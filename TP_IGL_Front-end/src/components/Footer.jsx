import React from "react";
import { Link } from "react-scroll";
import {
    FaFacebook,
    FaLinkedin,
    FaInstagram,
} from 'react-icons/fa'

const Footer =() =>{
    const year = new Date().getFullYear();
    
    return(
        <footer className="relative text-white  bg-black flex flex-col">
        <div className="grid lg:grid-cols-4  grid-cols-1 px-10 lg:px-20 py-10 gap-20">

            <div className="flex lg:col-span-4 gap-5 justify-between" >
                <div className="flex flex-col gap-5">
                    <h6 className="font-medium py-2 uppercase">Compagnie</h6>
                    <ul>
                        <li className="py-2 text-sm list-none">
                        <a href="/user"> Acceuil</a>
                        </li>
                        <li className="py-2 text-sm list-none">
                        <a href="/user#blog">  Blog
                        </a>
                        </li>
                        <li className="py-2 text-sm list-none">
                        <a href="/user#Avis">Avis
                        </a>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-5">
                    <h6 className="font-medium py-2 uppercase">Aide</h6>
                    <ul>
                        <li className="py-2 text-sm list-none">
                        <a href="/user#faq-section">FAQ</a></li>{/* LINK is not working see why!! */}
                        <li className="py-2 text-sm list-none">
                        <a href="/user#contact">Contact</a>
                         </li>
                        
                        
                    </ul>
                </div>
                <div className="flex flex-col gap-5">
                    <h6 className="font-medium py-2 uppercase">Apprendre</h6>
                    <ul>
                        <li className="py-2 text-sm list-none">
                        <Link to="" smooth={true} duration={500}>Help Doc</Link>
                        </li>
                        <li className="py-2 text-sm list-none">
                        <Link to="" smooth={true} duration={500}>Gudies
                        </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-5">
                    <h6 className="font-medium py-2 uppercase">Légal</h6>
                    <ul>
                        <li className="py-2 text-sm list-none">
                        <Link to="" smooth={true} duration={500} >Conditions générales
                        </Link>
                        </li>
                        <li className="py-2 text-sm list-none">
                        <Link to="" smooth={true} duration={500} >Politique et confidentialités
                        </Link>
                        </li>
                        <li className="py-2 text-sm list-none">
                        <Link to="" smooth={true} duration={500} >Notification de droits d’auteur
                        </Link>
                        </li>
                        <li className="py-2 text-sm list-none">
                            <Link to="" smooth={true} duration={500}>Cookies settings
                            </Link>
                            </li>
                    </ul>
                </div>

            </div>
            </div>
             <div className="flex flex-row justify-center py-5">

               <a href="" className="hover:text-darkPink duration-300 hover:scale-150 px-5">
                <FaInstagram size={20}/>
                </a>

                <a href="" className="hover:text-darkPink duration-300 hover:scale-150 px-5">
                <FaFacebook size={20}/>
                </a>

               <a href="" className="hover:text-darkPink duration-300 hover:scale-150 px-5">
                 <FaLinkedin size={20}/>
                 </a>

             </div>
             <div className="flex justify-center mb-5">
                <h6 className="text-sm">Copyright &copy; {year}-{year+1} Surfey. Tous droits réservés.</h6>
             </div>
             
             
             </footer>

    )
  };
  
  export default Footer
