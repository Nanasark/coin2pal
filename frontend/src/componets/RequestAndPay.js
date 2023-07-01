import React, { useState, useEffect } from "react";
import { Modal, Input, InputNumber } from "antd";
import dollarsign from "./dollarsign.svg"


function RequestAndPay({}) {
  const [payModal, setPayModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [requestAmount, setRequestAmount] = useState(5);
  const [requestAddress, setRequestAddress] = useState("");
  const [requestMessage, setRequestMessage] = useState("");

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

  return (
    <>
      <Modal
        title="Confirm Payment"
        open={payModal}
        onOk={() => {
          hidePayModal();
        }}
        onCancel={hidePayModal}
        okText="Proceed To Pay"
        cancelText="Cancel"
      >
      </Modal>
      <Modal
        title="Request A Payment"
        open={requestModal}
        onOk={() => {
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
      <div className="flex gap-20 relative lg:top-[-20px]">
        <div
          className="text-[#FDFFF7] flex flex-col justify-center items-center bg-[#006843] lg:w-[75px] lg:h-[75px] rounded-[5px]"
          onClick={() => {
            showPayModal();
          }}
        >
          <img src={dollarsign} alt="dollar sign"></img>
          Pay
          <p>money now</p>
            <div className="relative text-center rounded-full w-[20px] lg:bottom-[65px] bg-black ">2</div>
        </div>
        <div
          className="text-[#FDFFF7] flex flex-col justify-center items-center bg-[#006843] lg:w-[75px] lg:h-[75px] rounded-[5px]"
          onClick={() => {
            showRequestModal();
          }}
        >
          
          Request
        </div>
      </div>
    </>
  );
}

export default RequestAndPay;
