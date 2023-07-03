import React, { useState, useEffect } from "react";
import { DollarOutlined, SwapOutlined } from "@ant-design/icons";
import dollarsign from "./dollarsign.svg";
import cash from "./cash.png";
import plus from "./plus.png";
import { Modal, Input, InputNumber } from "antd";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction  } from "wagmi";
import { polygonMumbai } from "@wagmi/chains";
import ABI from "../abi.json";


function RequestAndPay({ requests, getNameAndBalance }) {
  const [payModal, setPayModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [requestAmount, setRequestAmount] = useState(5);
  const [requestAddress, setRequestAddress] = useState("");
  const [requestMessage, setRequestMessage] = useState("");

  const { config } = usePrepareContractWrite({
    chainId: polygonMumbai.id,
    address: "0x4Cb41F3abA88647beDEdF91856e9119C4f4Fe886",
    abi: ABI,
    functionName: "payRequest",
    args: [0],
    overrides: {
      value: String(Number(requests["1"][0])),
    },
  });

  const { write, data } = useContractWrite(config);

  const { config: configRequest } = usePrepareContractWrite({
    chainId: polygonMumbai.id,
    address: "0x4Cb41F3abA88647beDEdF91856e9119C4f4Fe886",
    abi: ABI,
    functionName: "createRequest",
    args: [requestAddress, requestAmount, requestMessage],
  });

  const { write: writeRequest, data: dataRequest } = useContractWrite(configRequest);


  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const { isSuccess: isSuccessRequest } = useWaitForTransaction({
    hash: dataRequest?.hash,
  })


  const showPayModal = () => {
    setPayModal(true);
  };
  const hidePayModal = () => {
    setPayModal(false);
  };

  const showRequestModal = () => {
    setRequestModal(true);
  };
  const hideRequestModal = () => {
    setRequestModal(false);
  };

  useEffect(()=>{
    if(isSuccess || isSuccessRequest){
      getNameAndBalance();
    }
  },[isSuccess, isSuccessRequest])

  return (
    <>
      <Modal
        title="Confirm Payment"
        open={payModal}
        onOk={() => {
          write?.();
          hidePayModal();
        }}
        onCancel={hidePayModal}
        okText="Proceed To Pay"
        cancelText="Cancel"
      >
        {requests && requests["0"].length > 0 && (
          <>
            <h2>Sending payment to {requests["3"][0]}</h2>
            <h3>Value: {(requests["1"][0])} Matic</h3>
            <p>"{requests["2"][0]}"</p>
          </>
        )}
      </Modal>
      <Modal
        title="Request A Payment"
        open={requestModal}
        onOk={() => {
          writeRequest?.();
          hideRequestModal();
        }}
        onCancel={hideRequestModal}
        okText="Proceed To Request"
        cancelText="Cancel"
      >
        <p>Amount (Matic)</p>
        <InputNumber value={requestAmount} onChange={(val)=>setRequestAmount(val)}/>
        <p>From (address)</p>
        <Input placeholder="0x..." value={requestAddress} onChange={(val)=>setRequestAddress(val.target.value)}/>
        <p>Message</p>
        <Input placeholder="Lunch Bill..." value={requestMessage} onChange={(val)=>setRequestMessage(val.target.value)}/>
      </Modal>


      <div className="flex gap-7 items-center relative justify-center lg:top-[20px]">
        <div
          className="text-[#FDFFF7] flex flex-col justify-center items-center bg-[#006843] lg:w-[75px] lg:h-[75px] rounded-[5px]"
            onClick={() => {
              showPayModal();
            }}
          > 
          
          <img src={dollarsign} alt="dollar sign"></img>
            Pay
            <p className="text-[12px]">money now</p>
            {requests && requests["0"].length > 0 && (
              <div className="relative text-center left-[30px] rounded-full w-[20px] lg:bottom-[65px] bg-black ">{requests["0"].length}</div>
            )}
          </div>
          <div
            className="text-[#FDFFF7] flex flex-col justify-center items-center bg-[#006843] lg:w-[75px] lg:h-[75px] rounded-[5px]"
            onClick={() => {
              showRequestModal();
            }}
          >
            <img className="w-[20px]" src={cash} alt="dollar sign"></img>
            Request
            <p className="text-[12px]">money now</p>
        </div>
        <div
            className="text-[#006843] flex flex-col justify-center items-center border border-[#006843] lg:w-[75px] lg:h-[75px] rounded-[5px]"
            onClick={() => {
            }}
          >
            <img src={plus} className="w-[20px]" alt="dollar sign"></img>
            More
            <p className="text-[12px]">fund options</p>
        </div>
      </div> 
              
        
    </>
  );
}

export default RequestAndPay;

// className="text-[#FDFFF7] flex flex-col justify-center items-center bg-[#006843] lg:w-[75px] lg:h-[75px] rounded-[5px]"

