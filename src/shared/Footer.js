import React from "react";

function Footer() {
  return (
    <div>
      <div className="w-full h-1 bg-gradient-to-r from-[#76EAEC] via-[#EF8EEE] via-[#F5BCF4] via-[#FAE250] via-[#F2AA4E] to-[#7443F6] mt-16"></div>
      <div className="flex flex-row flex-wrap items-center justify-between px-8 py-4 md:px-36 lg:px-36 xl:px-36 2xl:px36 py-8">
        <div className="flex flex-col">
          <p className="text-slate-500 text-sm">Copyright &#169; 2022 World Builder </p>
          <p className="text-slate-500 text-sm">All Rights Reserved</p>
        </div>

        {/* <div className="flex flex-col mt-4 ">
        <p className="text-[#b8b3e4] cursor-pointer  text-base">Twitter</p>
        <p className="text-[#b8b3e4] cursor-pointer text-base">Discord</p>
        </div> */}
      </div>
    </div>
  );
}

export default Footer;
