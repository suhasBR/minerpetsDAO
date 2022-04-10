import React, { useState } from "react";
import { GoThreeBars } from "react-icons/go";
import { FaHistory, FaMinus, FaPlus, FaWallet } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { BsGearFill, BsGrid3X3Gap, BsPeopleFill } from "react-icons/bs";

function Wallet() {
  const [wallet, openWallet] = useState(false);
//   const [page, changePage] = useState(0);

  const toggleVisibility = () => {
    const temp = wallet;
    openWallet(!temp);
  };

  return (
    <div className="flex flex-col max-w-6xl ">
      <div className="flex flex-row justify-between items-center rounded-xl px-4 py-2 mb-4 bg-[#c5c5c5] w-60">
        <div className="bg-green-700 rounded-full w-4 h-4"></div>
        <p className="text-sm">$0</p>
        <div onClick={toggleVisibility} className="text-sm cursor-pointer">
          {!wallet ? <FaPlus /> : <FaMinus />}
        </div>
      </div>

      {wallet && (
        <div className="rounded-xl relative min-h-[25rem] flex flex-col border border-[#818181] drop-shadow bg-white">
          <div className="flex flex-row bg-gradient-to-b from-[#fff] to-[#d2d2d2] px-4 py-2 rounded-t-xl justify-between">
            <img
              src="/images/landing/logo.svg"
              alt="logo"
              className="w-8 h-8"
            ></img>
            <div className="p-2 rounded-xl border border-[#818181] ">
              <p className="text-xs text-[#818181]">Magical Rocket Scientist</p>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center px-4 py-2">
            <div className="bg-green-700 rounded-full w-4 h-4"></div>
            <div className="flex flex-col">
              <p className="text-sm">Wallet-I</p>
              <p className="text-[#878787] text-xs">0xE4B...7B</p>
            </div>
            <GoThreeBars />
          </div>

          <h2 className="py-4 mx-auto text-xl font-poppins font-bold">
            $ 1000.0 u-USD
          </h2>

          <div className="flex flex-row justify-evenly mb-4">
            <button className="px-2 py-1 text-white text-sm bg-[#367bcf] rounded-xl ">
              Deposit
            </button>
            <button className="px-2 py-1 text-white text-sm bg-[#367bcf] rounded-xl ">
              Withdraw
            </button>
          </div>

          <hr></hr>

          <div className="flex flex-col overflow-auto py-2 px-2">
            <div className="flex flex-row mb-2 justify-between bg-[#ececec] rounded-xl px-2 py-2">
              <img
                src="/images/wallet/mrs.png"
                alt="mrs token"
                className="w-8 h-8"
              ></img>
              <div className="flex flex-col">
                <p className="text-xs text-black">MRS token</p>
                <p className="text-xs text-[#7b7b7b]">10000 MRS</p>
              </div>
              <div className="p-2 rounded-2xl text-xs border border-[#818181] ">
                10000 u-USD
              </div>
            </div>

            <div className="flex flex-row justify-between bg-[#ececec] rounded-xl px-2 py-2">
              <img
                src="/images/wallet/wbl.png"
                alt="mrs token"
                className="w-8 h-8"
              ></img>
              <div className="flex flex-col">
                <p className="text-xs text-black">MRS token</p>
                <p className="text-xs text-[#7b7b7b]">10000 MRS</p>
              </div>
              <div className="p-2 rounded-2xl text-xs border border-[#818181] ">
                10000 u-USD
              </div>
            </div>
          </div>

          <div className="flex absolute left-0 bottom-0 w-full flex-row justify-between px-2 py-2 bg-[#f9f9f9] rounded-b-xl">
            <FaWallet className="text-xl" />
            <BsGrid3X3Gap className="text-xl"/>
            <BiTransfer className="text-xl"/>
            <FaHistory className="text-xl"/>
            <BsPeopleFill className="text-xl"/>
            <BsGearFill className="text-xl"/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wallet;
