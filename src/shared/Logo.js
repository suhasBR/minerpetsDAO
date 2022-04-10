import React from "react";

function Logo() {
  return (
    <div className="flex cursor-pointer">
      <img src="./images/landing/logo.png" alt="logo" className="w-10 h-10" />
      <p className="text-xs md:text-xsm lg:text-xsm xl:text-xsm 2xl:text-xsm font-alata ml-1">Pre-alpha</p>
    </div>
  );
}

export default Logo;
