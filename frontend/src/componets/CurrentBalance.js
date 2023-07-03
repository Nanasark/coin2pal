import React from "react";


function CurrentBalance({dollars}) {
  return (
    <div className="bg-[#FDFFF7] rounded-[5px] justify-between lg:h-[220px] lg:w-[350px]  shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col items-center border-[#C6821D] border-[1px]" title="Current Balance">
      <div className="flex  justify-between border-b-2 border-[#00A878] relative mt-[15px] w-[300px]">
      <h1 className="text-[#006843] font-semibold text-[18px]">Current Balance</h1>
      <p className="text-[18px]">Balance History</p> 
      </div>
     
      <div className="lg:w-[300px] relative gap-5 flex">
        <div className="text-[64px] font-thin" >${dollars}</div>
        <div className="relative top-[50px] text-[18px]">Available</div>
      </div>
      <div className="flex text-center relative lg:text-[12px] lg:gap-2 bottom-[10px]">
        <div className="border border-[#006843] lg:w-[100px]  rounded-[20px]">Swap Tokens</div>
        <div className="border border-[#006843] lg:w-[100px]  rounded-[20px]">Bridge Tokens</div>
        <div className="border border-[#006843] lg:w-[100px]  rounded-[20px]">Manage Tokens</div>
      </div>
    </div>
  );
}

export default CurrentBalance;
