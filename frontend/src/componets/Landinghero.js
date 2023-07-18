import React from 'react'
import Etherpeople from "../etherpeople.png";

const Landinghero = () => {
  return (
    <div className="w-screen h-[688px] bg-[#002E2C]">

      <div className="lg:flex lg:items-center lg:justify-center lg:gap-4">

        <div className="lg:flex lg:flex-col lg:gap-10">
          <div className="">
              <h1 className=" text-[#FDFFF7] text-[48px]">Join  Our Waitlist </h1>
              <div className=" w-[500px]">
            <h1 className="text-[22px] text-[#FDFFF7]">Submit your email to join our waitlist of coinrades. <br/>  In the mean time feel free to test phase 1 of the app on the testnet</h1>
          </div>
          </div>
          

          <div>
            <form className="flex justify-between gap-3">
              <input placeholder="      Type your email here " className="rounded-[20px] h-[60px] w-[400px]"></input>
              <button className="bg-[#FDFFF7] rounded-[20px] w-[100px]">Join Now </button>
            </form>
           

          </div>

        </div>

        <div>
        <img src={Etherpeople} alt="logo" className=" relative w-[650px] h-[600px]" ></img> 
        </div>
      </div>
        
    </div>
  )
}

export default Landinghero