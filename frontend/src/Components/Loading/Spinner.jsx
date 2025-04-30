import React from "react";
import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-36 h-36 border-4 border-t-transparent border-b-[#000] border-l-[#000] border-r-[#000] rounded-full"
      ></motion.div>
    </div>
  );
};

export default Spinner;