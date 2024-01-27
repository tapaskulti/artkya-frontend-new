/* eslint-disable react/prop-types */
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Accordion = ({ element }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  return (
    <div className="py-2">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full"
      >
        <span>{element[0]?.title}</span>
        {/* {accordionOpen ? <span>-</span> : <span>+</span>} */}
        <svg
          className="fill-indigo-500 shrink-0 ml-8"
          width="12"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="12"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="12"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        {/* <div className="overflow-hidden">{answer}</div> */}

        <div className="overflow-hidden">
          {element[0]?.element?.map((singleElement) => {
            
            {/* console.log(singleElement); */}
            return (
              <>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="border border-slate-50" value={singleElement} onChange={(e) =>{
                    console.log(element[0]?.title)
                    console.log(e.target.value)
                  }}></input>
                  <div className="my-0.5">{singleElement}</div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
