import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const InfoWidget = () => {
  const [active, setActive] = useState<
    "About Me" | "Experiences" | "Recommended"
  >("About Me");
  const tabs = ["About Me", "Experiences", "Recommended"];
  const content = {
    "About Me": `Hello! I’m Dave, your sales rep here from Salesforce. I’ve been working at this awesome company for 3 years now.

I was born and raised in Albany, NY& have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters- Emma and Ella. Both of them are just starting school, so my calender is usually blocked between 9-10 AM. This is a...`,
    Experiences: `I’ve managed enterprise clients and led SaaS projects delivering measurable business value.`,
    Recommended: `Dave is a great communicator, dependable, and a consistent top performer.`,
  };

  return (
    <div
      className="absolute w-[80%] sm:w-[650px] h-auto sm:h-[270px] left-1/2 sm:left-[882px] top-[96px] -translate-x-1/2 sm:translate-x-0 rounded-[18.9px] p-4 sm:p-6"
      style={{
        background: "#363C43",
        boxShadow: "5.67px 5.67px 3.78px rgba(0,0,0,0.4)",
      }}
    >
      {/* Tabs row */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 mb-4 rounded-full w-full sm:w-[434px] h-auto sm:h-[46px] bg-gray-900 p-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActive(tab as "About Me" | "Experiences" | "Recommended")
            }
            className={`relative px-4 sm:px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
              active === tab
                ? "text-white"
                : "text-gray-400 hover:text-gray-200"
            }`}
            style={
              active === tab
                ? {
                    background: "#131314",
                    boxShadow:
                      "inset 0 2px 6px rgba(255,255,255,0.03), 0 6px 18px rgba(0,0,0,0.6)",
                  }
                : {
                    background: "#24272a",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.55)",
                  }
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div
        className="text-gray-300 text-[15px] leading-relaxed max-h-[180px] overflow-y-auto pr-2"
        style={{
          borderRadius: 6,
          padding: "12px",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(0,0,0,0))",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="whitespace-pre-wrap"
          >
            {content[active]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InfoWidget;
