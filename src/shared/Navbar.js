import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { GoThreeBars, GoX } from "react-icons/go";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, openMenu] = useState(false);
  const [isPhoneScreen, changePhoneScreen] = useState(false);

  useEffect(() => {
    console.log(window.innerWidth);
    if (window.innerWidth <= 768) {
      changePhoneScreen(true);
    }
  }, []);

  const changeVisibilityHandler = () => {
    openMenu(!isMenuOpen);
  };

  return (
    <div className="relative">
      <div className="w-full  bg-[#eaeaea] px-4 py-2 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>
        {!isPhoneScreen && !isMenuOpen && (
          <div className="flex font-alata text-base cursor-pointer justify-end w-1/2">
            <p className="mx-6 my-2">FAQs</p>
            <p className="mx-6 my-2">Roadmap</p>
            <p className="mx-6 my-2">Tokenomics</p>
            <p className="mx-6 my-2">Login</p>
          </div>
        )}

        {isPhoneScreen &&
          (isMenuOpen ? (
            <GoX
              className="md:invisible"
              onClick={changeVisibilityHandler}
              style={{ fontSize: "1.5rem" }}
            />
          ) : (
            <GoThreeBars
              className="lg-invisible"
              onClick={changeVisibilityHandler}
              style={{ fontSize: "1.5rem" }}
            />
          ))}
      </div>

      {isPhoneScreen && isMenuOpen && (
        <div className="flex flex-col md:invisible lg:invisible xl:invisible 2xl:invisible font-alata text-sm absolute top-4.5 left-0 bg-white w-full pt-4 z-50">
          <p className="mx-6 my-4 curosr-pointer">FAQs</p>
          <p className="mx-6 my-4 curosr-pointer">Roadmap</p>
          <p className="mx-6 my-4 curosr-pointer">Tokenomics</p>
          <Link to="/login">
            <p className="mx-6 my-4 curosr-pointer">Login</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
