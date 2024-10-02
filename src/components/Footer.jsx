import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center w-full fixed bottom-0">
      <div className="logo font-bold text-white text-2xl">
        <span className="text-amber-400"> &lt;</span>

        <span>CipherNest</span>
        <span className="text-amber-400">/&gt;</span>
      </div>
      <div className="flex justify-center items-center">
        {" "}
        Created with <img
          className="w-7 mx-2"
          src="icons/heart.png"
          alt=""
        />{" "}
        by NamanTheDev{" "}
      </div>
    </div>
  );
};

export default Footer;
