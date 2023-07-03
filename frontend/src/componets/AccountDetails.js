import React from "react";
import { Card } from "antd";
import user from "../user.png";
import matic from "../matic.png";



function AccountDetails({ address, name, balance }) {
  

  return (
    <div className="relative lg:top-[40px] bg-[#FDFFF7] rounded-[5px] justify-between lg:h-[220px] lg:w-[350px]  shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col items-center border-[#C6821D] border-[1px] " title="Account Details" style={{ width: "100%" }}>
      <div className="flex  justify-between border-b-2 border-[#00A878] relative mt-[15px] w-[300px]">
      <h1 className="text-[#006843] font-semibold text-[18px]">Account Details</h1>
      
      </div>
      <div className="accountDetailRow">
       <img src={user} alt="maticLogo" width={26} />
        <div>
          <div className="accountDetailHead"> {name} </div>
          <div className="accountDetailBody">
          {" "}
            Address: {address.slice(0, 4)}...{address.slice(38)}
          </div>
        </div>
      </div>
      <div className="accountDetailRow">
        <img src={matic} alt="maticLogo" width={26} />
        <div>
          <div className="accountDetailHead"> Native Matic Tokens</div>
          <div className="accountDetailBody">{balance} Matic</div>
        </div>
      </div>
      <div className="flex text-center relative lg:text-[12px] lg:gap-5 bottom-[10px]">
        <div className="border border-[#006843] lg:w-[120px]  rounded-[20px]">Set Username</div>
        <div className="border border-[#006843] lg:w-[120px]  rounded-[20px]">Switch Accounts</div>
      </div>
    </div>
  );
}

export default AccountDetails;
