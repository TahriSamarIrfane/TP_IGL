import React, { useState } from 'react';
import'../index.css';

import science5 from'../assets/images/science5.png';
import { LiaShareSolid } from "react-icons/lia";
import { FaHeart } from "react-icons/fa";// full heart
import { FaFilePdf } from "react-icons/fa6";

const Article = () => {

const[favorite,setFavorite]= useState(false);
const[hoverFavorite,setHoverFavorite]= useState(false);

    return (
        <div className='p-2 md:p-20'>
            <div className='flex flex-col  bg-[#FAF9FE] pb-32 rounded-lg'> 
            <img className='w-full h-56 md:h-72 rounded-tr-lg rounded-tl-lg' src={science5} alt=""/>
            <h className='text-center text-3xl font-bold text-darkPink px-4 md:px-16 my-5' >Lorem ipsum dolor sit amet consectetur. Auctor gravida dolor a donec justo.</h>
            <div className='flex flex-row flex-wrap  justify-between px-10'> {/*Authors + institutions */}
            {AuthorsInstitutions.map((d,index) =>(             
            <div key={index} className='flex-col  text-center mx-1'>
                <div className='text-[#82A498]'>{d.Author}</div>
                <div className='flex-col'> {/* Display each institution in a column */}
                  {d.Institutions.map((institution, i) => (
                    <div key={i} className='text-darkGery'>{institution}</div>
                    ))}
                </div>
           </div>
           
            ))}
             </div>

             <div className='flex flex-row justify-between px-10 mt-5'>{/*Date+PDF+favorite+share */}
             <div className='text-darkGery'>{date}</div>
             <div className='flex flex-row'>
             <div><FaFilePdf className='mt-1 text-xl text-darkPink' /></div>
             <div>
             <label className='flex'>
                 <input type='Radio' className='opacity-0'
                 onClick={()=>setFavorite(!favorite)}/> {/* Update the state based on the current value */}
                 
                 <FaHeart  className='text-red-600 mr-3 mt-1 text-2xl cursor-pointer'
                 color={favorite|| hoverFavorite ? "red" : "grey"}
                 // Update the color based on state
                 onMouseEnter={()=> setHoverFavorite(true)}
                 onMouseLeave={()=> setHoverFavorite(false)}
                                             />
                 </label>
                 </div>
                 <div><LiaShareSolid className='mt-1 text-2xl text-darkPink'/></div>
                 </div>
             </div>

             <div className='px-10 mt-3 grid grid-cols-2 gap-4'>{/* Article */}

             <div>
              <p className='font-bold mb-4'>ABSTRACT</p>
              <p>{article.abstract}</p>
              <p className='font-bold my-4'>KEYWORDS</p>

              <div className='flex flex-wrap'> {/* Display each institution in a column */}
                  {article.keyWords.map((keyWords, i) => (
                    <div key={i} className='mb-2 text-black border border-black rounded-lg mr-2 text-xs p-1'>{keyWords}</div>
                    ))}
                </div>

            </div>

            {article.paragraph.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
            ))}


            <div className='flex-col'> {/* Display each institution in a column */}
            <p className='font-bold mb-4'>REFERENCES</p>
                  {article.Reference.map((Reference, i) => (
                    <div key={i} className='text-black'>{Reference}</div>
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
    abstract:`Lorem ipsum dolor sit amet consectetur. Enim faucibus non duis purus aenean vitae. Vivamus rhoncus dignissim eget metus mi facilisis. Rhoncus ut enim mauris arcu neque nunc tincidunt ullamcorper nam. Mollis faucibus placerat lectus vitae. Posuere venenatis non cras elit tempus hendrerit tristique vehicula. Enim sit at in ultrices. Id sit ut lobortis eu ornare in venenatis. Neque ac feugiat at consectetur elementum diam massa enim. Amet feugiat orci diam ac sollicitudin massa mattis cursus. Tellus condimentum tortor mollis scelerisque. Sit vitae scelerisque ac turpis nibh. Aenean hac massa interdum massa. Maecenas commodo faucibus dignissim malesuada sapien tortor nunc risus. At odio arcu suspendisse odio consequat lorem porta. Amet aliquet vel maecenas sed vel. Quam diam non volutpat sem. In convallis augue egestas nibh. Leo sit hac sit ut nulla donec quis vitae neque. Amet eu cras neque urna sed id.`,
    keyWords : ["IOT", "Medicine", "DEGH", "Robotics", "JSQJG","IOT", "Medicine", "DEGH", "Robotics", "JSQJG","IOT", "Medicine", "DEGH", "Robotics", "JSQJG",],
    paragraph:`Lorem ipsum dolor sit amet consectetur. Sit aliquam a tortor urna ut. Diam vivamus malesuada quis risus venenatis sit ultricies cras pellentesque. Amet id tellus , libero non malesuada. Montes quis pellentesque amet tortor fames porta nisi. Sed dolor quis felis a eros. Aliquam nullam adipiscing leo pulvinar nec magnis pulvinar. Et consequat sed dui quis pharetra In amet sagittis venenatis ac sapien pellentesque consectetur semper. Velit condimentum turpis nullam blandit porttitor venenatis sit quam. Nam convallis semper tincidunt turpis sit morbi magna viverra faucibus. Non ullamcorper non gravida sed enim. Blandit convallis urna magna id elit duis mi sit. Elit amet dictum molestie odio nec. Amet tincidunt in sit metus. Et ut vel vitae et facilisis sapien tempor pellentesque elit. Molestie urna facilisis malesuada rhoncus vitae risus consectetur pulvinar. Non quam vel purus nunc. Semper ac at arcu vel enim convallis lorem. Tristique elit purus cursus semper vitae semper.Convallis purus enim auctor cursus commodo vel nascetur. In cursus sit ut urna eget dolor. Vitae convallis posuere netus mi in metus proin ac a.Convallis purus enim auctor cursus commodo vel nascetur. In cursus sit ut urna eget dolor. Vitae convallis posuere netus mi in metus proin ac a.Lorem ipsum dolor sit amet consectetur. Sit aliquam a tortor urna ut. Diam vivamus malesuada quis risus venenatis sit ultricies cras pellentesque.\n AAAAAAAAAA  Amet id tellus consequat libero non malesuada. Montes quis pellentesque amet tortor fames porta nisi. Sed dolor quis felis a eros. Aliquam nullam adipiscing leo pulvinar nec magnis pulvinar. Et consequat sed dui quis pharetra. In amet sagittis venenatis ac sapien pellentesque consectetur semper. Velit condimentum turpis nullam blandit porttitor venenatis sit quam. Nam convallis semper tincidunt turpis sit morbi magna viverra faucibus. .Non ullamcorper non gravida sed enim. Blandit convallis urna magna id elit duis mi sit. Elit amet dictum molestie odio nec. Amet tincidunt in sit metus.\n BBBBBBBB  Et ut vel vitae et facilisis sapien tempor pellentesque elit. Molestie urna facilisis malesuada rhoncus vitae risus consectetur pulvinar. Non quam vel purus nunc. Semper ac at arcu vel enim convallis lorem. Tristique elit purus cursus semper vitae semper. Convallis purus enim auctor cursus commodo vel nascetur. In cursus sit ut urna eget dolor. Vitae convallis posuere netus mi in metus proin ac a.Convallis purus enim auctor cursus commodo vel nascetur. In cursus sit ut urna eget dolor. Vitae convallis posuere netus mi in metus proin ac a.`,
    Reference:[" [1]Lorem ipsum dolor sit amet consectetur.","[2] Sit aliquam a tortor urna ut.","[3] Diam vivamus malesuada quis risus venenatis sit ultricies.","[4] Et consequat sed dui quis pharetra."],
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

export default Article;