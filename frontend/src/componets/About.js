import React from 'react'
import Trustcrypto from "../trustcrypto.png";

const About = () => {
    return (
        <div className="h-[618px] relative bg-[#001011] flex justify-center items-center">
            <div className="bg-[#000000] relative left-1 text-white w-[1212px] h-[485px]  rounded-[30px] blur-[2.5px] shadow-[0px_-5px_0px_-1px_rgba(255,255,255,0.25)]">
            
            </div>

            <div className="text-[18px]  flex items-center absolute">
                <p className="z-[5] w-[480px] leading-[30px] text-white" >With Coinrade, users can easily submit their requests for services and specify the associated payment details. These requests are stored securely on the blockchain, ensuring transparency, immutability, and accountability. The unique aspect of our Dapp lies in its ability to maintain a strict chronological order of requests, eliminating any potential bias or favoritism.</p>

                
            <div>
        <img src={Trustcrypto} alt="logo" className=" relative w-[550px] h-[500px]" ></img> 
        </div>
            </div>
            


        </div>
    )
}

export default About