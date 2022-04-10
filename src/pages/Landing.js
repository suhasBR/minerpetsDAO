import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
  
import { useDispatch } from "react-redux";
import { walletLogin, setLoading, unsetLoading, loadNFTs, updateUsername } from "../reducers/user";

function Landing() {
  const dispatch = useDispatch();

  const [payWallStatus, setPayWallStatus] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isConnected, connectWallet] = useState(false);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    window.addEventListener("unlockProtocol.status", function (event) {
      setPayWallStatus(event.detail.state);
    });

    window.addEventListener("unlockProtocol.authenticated", function (event) {
      setUserInfo(event.detail.address);
    });

    window.addEventListener("unlockProtocol.transactionSent", function (event) {
      console.log(event.detail.hash);
    });
  }, []);

  // Rinkeby testnet details
  const networks = {
    rinkeby: {
      chainId: "0x4",
      chainName: "Rinkeby Test Network",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://rinkeby.infura.io/v3/"],
      blockExplorerUrls: ["https://rinkeby.etherscan.io"],
    },
    polygon: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: "Mumbai Testnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc-mumbai.matic.today/"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
  };

  const walletLoginFunc = async () => {
    if (window.ethereum) {
      try {
        //change network
        // const sw = await window.ethereum.request({
        //   method: "wallet_addEthereumChain",
        //   params: [
        //     {
        //       ...networks["rinkeby"],
        //     },
        //   ],
        // });

        //connect wallet
        const result = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(result[0]);
        connectWallet(true);
        setAddress(result[0]);

        dispatch(walletLogin(result[0]))

        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

          const body = {
            address: result[0]
          };

          const res = await axios.post(
            "https://evening-fortress-29065.herokuapp.com/api/v1/profile/createUser",
            body,
            config
          );  
          console.log(res.data);
          dispatch(updateUsername(res.data.newUser.uname));
        } catch (err) {
          console.log(err);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert("Need to install Metamask !");
    }
  };

  return (
    <div className="bg-black ">
      <Navbar />
      <div className="flex flex-col">
        <div className="flex flex-row flex-wrap mt-12 mb-8 mx-auto justify-center items-start ">
          <h1 className="text-7xl text-white font-normal max-w-xs text-center font-alata">
            Miner Pets
          </h1>
          <img
            src="./images/landing/Miner Pets.png"
            alt="miner pets"
            className="w-80 h-80"
          />
        </div>
        <div className="flex flex-row items-center justify-center">
          <h1 className="text-5xl text-white max-w-lg m-4 font-extralight">
            Monster Collection X Learning X To the moon
          </h1>
          {!isConnected ? (
            <button
              onClick={walletLoginFunc}
              className="bg-gradient-to-r from-[#A18CD1] to-[#FBC2EB] cursor-pointer text-white px-8 py-4 rounded-xl"
            >
              Connect Wallet
            </button>
          ) : payWallStatus === "unlocked" ? (
            <Link to="/profile">
              <button className="bg-gradient-to-r from-[#A18CD1] to-[#FBC2EB] cursor-pointer text-white px-8 py-4 rounded-xl">
                Connected to{" "}
                {address && address.toString().substring(0, 4) + "..."} <br />{" "}
                Enter
              </button>
            </Link>
          ) : (
            <button
              onClick={() =>
                window.unlockProtocol &&
                window.unlockProtocol.loadCheckoutModal()
              }
              className="bg-gradient-to-r from-[#A18CD1] to-[#FBC2EB] cursor-pointer text-white px-8 py-4 rounded-xl"
            >
              Buy NFT and enter
            </button>
          )}
        </div>

        <p className="text-sm text-white max-w-4xl my-4 text-center mx-auto">
          Miner pets is a new world that takes inspiration from monster
          collector games and mixes it with learning modules and the blockshian
          . This web3 project aims to involve the community to help create the
          art and story of the game. We hope to build out an easy and fun
          onboarding to web3 and DeFi protocols .
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
