import React, {useState} from 'react'
import background from "../assets/images/Page-admin.png"
import imageS from "../assets/images/SEO-pana.png"
const Admin = () =>  {
  const [nav, setNav] =useState(false);

  const handleNav = () =>{
    setNav(!nav)
  }
  return (
   <div className= ' bg-black w-ful h-full'>
     <div className=' w-full h-full bg-no-repeat' style={{backgroundImage: `url(${background})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '100%' , height: '100vh'}}>
     <div className='flex flex-row justify-center items-center space-x-8 w-full h-full'>
  <div className='w-[15%] rounded-sm h-[80%] bg-white hidden md:flex ml-20 '>
    <div className='flex flex-col justify-between'>
      <div className='px-6 ml-7 mt-4 bg-darkPink rounded-sm text-2 text-white font-bold'>Dashboard</div>
     <ul className='fixed top-[25%]'>
      <li className='py-1 border-b-2 mx-10 text-black hover:border-b-darkPink cursor-pointer'>Upload</li>
      <li className='py-1 border-b-2 mx-10 text-black hover:border-b-darkPink cursor-pointer'>Modérateur</li>
     </ul>
     <p className=' mb-6 py-1 mx-10  text-black hover:border-b-darkPink border-b-2 cursor-pointer'>Déconnecter</p>
    </div>
  </div>
  <div className='flex flex-col items-start w-[60%] h-[80%] space-y-2 '>
    <h5 className='text-white font-bold text-2xl '>Dashboard</h5>
    <div className="flex flex-col items-center justify-center bg-opacity-10 h-full w-full mt-11 bg-white">
      <div className="flex flex-col items-center w-full">
        <input
          type="url"
          className="w-[60%] mt-10  rounded-xl"
          placeholder="Enter URL"
        />
        <img className='h-[60%]' src={imageS} alt='/' />
      </div>
    </div>
  </div>
</div>

      </div>
     </div>
    
    
  )
}

export default Admin