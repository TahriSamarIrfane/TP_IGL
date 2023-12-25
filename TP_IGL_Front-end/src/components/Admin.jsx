import React from 'react'
import background from "../assets/images/Page-Modérateur.png"
const Admin = () =>  {
  return (
    <div  style={{backgroundImage:  `url(${background})`,backgroundRepeat:"no-repeat",backgroundSize:"cover", height:'100vh',width:'100vw' ,}}>
      <div className='fixed left-[10%] top-[14%] w-[17%] rounded-sm h-[80%] bg-white'>
       <h5 className='flex fixed justify-center top-[16%] left-[12%] w-[12%] h-[5%] bg-black  rounded-md  text-white font-bold text-2 '>Dashboard</h5>
        <ul className='fixed top-[25%]'>
          <li className='py-3 border-b mx-10'>Name</li>
          <li className='py-3 border-b mx-10'>Name</li>
          <li className='py-3 mx-10 '>Name</li> 
        </ul>

      </div>
      <div className='fixed left-[30%] top-[14%] '>
      <p className='flex justify-start  text-white font-bold text-2xl'>Dashboard</p>
      <div className=' fixed w-[60%] rounded-md h-[73%] bg-white opacity-10'>

        </div>
      </div>
    </div>
  )
}

export default Admin