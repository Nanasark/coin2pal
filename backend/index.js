// const express = require("express");
// const Moralis = require("moralis").default;
// const app = express();
// const cors = require("cors");
// require("dotenv").config();
// const port = 3001;
// const ABI = require("./abi.json");

// app.use(cors());
// app.use(express.json());

// function convertArrayToObjects(arr) {
//   const dataArray = arr.map((transaction, index) => ({
//     key: (arr.length + 1 - index).toString(),
//     type: transaction[0],
//     amount: transaction[1],
//     message: transaction[2],
//     address: `${transaction[3].slice(0,4)}...${transaction[3].slice(0,4)}`,
//     subject: transaction[4],
//   }));

//   return dataArray.reverse();
// }

// app.get("/getNameAndBalance", async (req, res) => {

//   const {userAddress} = req.query;
//   const response = await Moralis.EvmApi.utils.runContractFunction(
//     {
//       chain: "0x13881",
//       address: "0x2Ea89366e4DA9e73Fd480A476C04a74263e34dAC", //My contract address
//       functionName: "getMyName",
//       abi:ABI,
//       params: { _user: userAddress},
//     }
    
//   );

//   const jsonResponseName = response.raw;

//   const secResponse = await Moralis.EvmApi.balance.getNativeBalance({
//     chain: "0x13881",
//     address: userAddress,
//   });

//   const thirResponse = await Moralis.EvmApi.token.getTokenPrice({
//     address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
//   });

//   const jsonResponseBal = (secResponse.raw.balance / 1e18).toFixed(2); 
//   const jsonResponseDollars = (
//     thirResponse.raw.usdPrice * jsonResponseBal
//   ).toFixed(2);

//   const fourResponse = await Moralis.EvmApi.utils.runContractFunction(
//     {
//       chain: "0x13881",
//       address: "0x2Ea89366e4DA9e73Fd480A476C04a74263e34dAC", //My contract address
//       functionName: "getMyHistory",
//       abi:ABI,
//       params: { _user: userAddress},
//     }
    
//   );


 
//   const jsonResponseHistory = convertArrayToObjects(fourResponse.raw);

//   const fiveResponse = await Moralis.EvmApi.utils.runContractFunction(
//     {
//       chain: "0x13881",
//       address: "0x2Ea89366e4DA9e73Fd480A476C04a74263e34dAC", //My contract address
//       functionName: "getMyRequests",
//       abi:ABI,
//       params: { _user: userAddress},
//     }
    
//   );

//   const jsonResponseRequests = fiveResponse.raw;

//   const jsonResponse = {
//     name: jsonResponseName,
//     balance: jsonResponseBal,
//     dollars: jsonResponseDollars,
//     history: jsonResponseHistory,
//     requests: jsonResponseRequests
//   };

//   return res.status(200).json({jsonResponse});
// });



// Moralis.start({
//   apiKey: process.env.MORALIS_KEY,
// }).then(() => {
//   app.listen(port, () => {
//     console.log(`Listening for API Calls`);
//   });
// });

const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3001;
const ABI = require("./abi.json");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://coinrade.vercel.app/"); // Replace * with the appropriate origin or set it to the specific domain you want to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

function convertArrayToObjects(arr) {
  const dataArray = arr.map((transaction, index) => ({
    key: (arr.length + 1 - index).toString(),
    type: transaction[0],
    amount: transaction[1],
    message: transaction[2],
    address: `${transaction[3].slice(0,4)}...${transaction[3].slice(0,4)}`,
    subject: transaction[4],
  }));

  return dataArray.reverse();
}

app.get("/getNameAndBalance", async (req, res) => {
  const { userAddress } = req.query;

  const response = await Moralis.EvmApi.utils.runContractFunction({
    chain: "0x13881",
    address: "0x2Ea89366e4DA9e73Fd480A476C04a74263e34dAC",
    functionName: "getMyName",
    abi: ABI,
    params: { _user: userAddress },
  });

  const jsonResponseName = response.raw;

  const secResponse = await Moralis.EvmApi.balance.getNativeBalance({
    chain: "0x13881",
    address: userAddress,
  });

  const jsonResponseBal = (secResponse.raw.balance / 1e18).toFixed(2);

  const thirResponse = await Moralis.EvmApi.token.getTokenPrice({
    address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
  });

  const jsonResponseDollars = (
    thirResponse.raw.usdPrice * jsonResponseBal
  ).toFixed(2);

  const fourResponse = await Moralis.EvmApi.utils.runContractFunction({
    chain: "0x13881",
    address: "0x2Ea89366e4DA9e73Fd480A476C04a74263e34dAC",
    functionName: "getMyHistory",
    abi: ABI,
    params: { _user: userAddress },
  });

  const jsonResponseHistory = convertArrayToObjects(fourResponse.raw);


  const fiveResponse = await Moralis.EvmApi.utils.runContractFunction({
    chain: "0x13881",
    address: "0x2Ea89366e4DA9e73Fd480A476C04a74263e34dAC",
    functionName: "getMyRequests",
    abi: ABI,
    params: { _user: userAddress },
  });

  const jsonResponseRequests = fiveResponse.raw;


  const jsonResponse = {
    name: jsonResponseName,
    balance: jsonResponseBal,
    dollars: jsonResponseDollars,
    history: jsonResponseHistory,
    requests: jsonResponseRequests,
  };

  return res.status(200).json(jsonResponse);
});



Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});