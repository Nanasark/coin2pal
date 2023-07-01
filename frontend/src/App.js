import { useState, useEffect } from "react";
import "./App.css";
import logo from "./logo.png";
import { Layout, Button } from "antd";
import CurrentBalance from "./componets/CurrentBalance";
import RequestAndPay from "./componets/RequestAndPay";
import AccountDetails from "./componets/AccountDetails";
import RecentActivity from "./componets/RecentActivity";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import axios from "axios";

const { Header, Content } = Layout;

function App() {

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  const [name, setName] = useState("...");
  const [balance, setBalance] = useState("...");
  const [dollars, setDollars] = useState("...");
  const [history, setHistory] = useState(null);
  const [requests, setRequests] = useState({ "1": [0], "0": [] }); 
  
  function disconnectAndSetNull() {
    disconnect();
    setName("...");
    setBalance("...");
    setDollars("...");
    setHistory(null);
    setRequests({ "1": [0], "0": [] });
  }

  async function getNameAndBalance() {
    const res = await axios.get(`http://localhost:3001/getNameAndBalance`, {
      params: { userAddress: address },
    });
  
    const response = res.data;
    console.log("Response:", response); // Log the entire response object for debugging
  
    if (response.name[1]) {
      console.log("Name:", response.name[0]); // Log the retrieved name
      setName(response.name[0]);
    }
  
    setBalance(String(response.balance));
    setDollars(String(response.dollars));
    setHistory(response.history);
    setRequests(response.requests);
  }

  useEffect(() => {
    if (!isConnected) return;
    getNameAndBalance();
  }, [isConnected]);

  return (
    <div className="w-screen bg-[#EAF8BF] ">
      <Layout>
        <Header className="w-screen bg-[#EAF8BF] lg:flex lg:justify-between lg:items-center">
          <div className="flex gap-10 items-center">
            <div className="relative">
              <img src={logo} alt="logo" className=" relative w-[200px] h-[60px]" ></img> 
            </div>
           {isConnected &&
            <div className="relative flex justify-center gap-10">
              <div className="">Summary</div>
              <div className="">Activity</div>
              <div className="">{`Send & Request`}</div>
              <div className="">Wallet</div>
              <div className="">Help</div>
            </div>
}
          </div>

          {isConnected ? (
            <Button type={"primary"} onClick={disconnectAndSetNull}>
              Disconnect Wallet
            </Button>
          ) : (
            <Button type={"primary"} onClick={()=>{
              console.log(requests); connect();
            }}>
              Connect Wallet
            </Button>
          )}
        </Header>

        <Content className="lg:flex bg-[#EAF8BF] w-screen lg:justify-between">
        {isConnected ? (
            <>
          <div className="lg :flex relative lg:left-[30px] lg:flex-col lg:gap-10 bg-[#EAF8BF]">
            <CurrentBalance   dollars={dollars}/>
            <RequestAndPay requests={requests} getNameAndBalance={getNameAndBalance}/>
            <AccountDetails 
            address={address}
            name={name}
            balance={balance}
            />
          </div>
          <div className="relative right-[30px]">
            <RecentActivity  history={history} />
          </div>
          </>
          ) : (
            <div>Please Login</div>
          )}
        </Content>
      </Layout>
    </div>
  );
}

export default App;
