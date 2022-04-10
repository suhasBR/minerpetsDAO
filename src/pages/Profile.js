import React, { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import Sidebar from "../shared/Sidebar";
import Navbar from "../shared/Navbar";
import Wallet from "../shared/wallet/Wallet";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loading-icons";
import mrsabi from "../abi/mrsabi.json";
import { updateUsername } from "../reducers/user";

function Profile() {
  const contractAddress = "0x2f8B8B239C89588d46b83Ad2fAA7CA7B3AB476f0";

  const dispatch = useDispatch();

  let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
  let tempSigner = tempProvider.getSigner();
  let tempContract = new ethers.Contract(contractAddress, mrsabi, tempSigner);

  const [payWallStatus, setPayWallStatus] = useState();
  const address = useSelector((state) => state.user.address);
  const uname = useSelector((state) => state.user.username);
  const [userInfo, setUserInfo] = useState();
  const [showText, changeShowText] = useState(true);

  const [username, changeUsername] = useState(uname);

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

  const givedrop = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        address: address,
      };

      changeShowText(false);

      const res = await axios.post(
        "https://evening-fortress-29065.herokuapp.com/api/v1/profile/freedrop",
        body,
        config
      );
      alert("Success");
      changeShowText(true);
    } catch (error) {
      console.log(error.response);
      alert(error.response.data.msg);
      changeShowText(true);
    }
  };

  const publishTest = async () => {
    try {
      const tx = await tempContract.functions.transfer(
        "0x8522251E68f698c72bF146E208E6d0889dC8adD2",
        "500000000000000000"
      );
      console.log("success");
    } catch (error) {}
  };

  const alterUsername = (e) => {
    changeUsername(e.target.value);
    dispatch(updateUsername(e.target.value));
  };

  const saveUsername = async () => {
    //update database
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        address: address,
        uname: uname,
      };

      const res = await axios.patch(
        "https://evening-fortress-29065.herokuapp.com/api/v1/profile/updateuname",
        body,
        config
      );
      console.log(res.data);
      alert("success");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-row  justify-between">
        <Sidebar />
        <div className="m-4 w-[50rem]">
          <h1 className="mb-4 text-2xl text-left font-alata">Profile</h1>

          <div className=" py-8 text-left">
            <p className="py-2">Username</p>
            <input
              value={username}
              onChange={(e) => alterUsername(e)}
              type="text"
              className="w-2/3 px-4 py-2 border-black border-2 focus:border-gray-500 focus:border-2"
            />
            <br />
            <button
              onClick={saveUsername}
              className="bg-blue-500 text-white px-8 cursor-pointer py-2 rounded-xl my-8"
            >
              Save
            </button>

            <p className="text-base">
              Click the button below to get free MRS token to be able to
              participate in the content building and voting.
            </p>
            <button
              onClick={givedrop}
              className="bg-indigo-400 text-white px-8 cursor-pointer py-2 rounded-xl mb-8 mt-4"
            >
              {showText ? (
                <p>Get Free MRS tokens in my wallet</p>
              ) : (
                <ThreeDots/>
              )}
            </button>

            <button onClick={publishTest}>Pay some cash</button>
          </div>
        </div>
        <div className="m-4">{/* <Wallet /> */}</div>
      </div>
    </div>
  );
}

export default Profile;
