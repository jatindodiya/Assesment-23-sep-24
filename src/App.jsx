import { useState } from "react";
import "./App.css";
import downSign from './assets/downSign.svg';


const dateArray = ["24-Apr-2024", "02-May-2024", "09-May-2024", "31-May-2024", "21-Jun-2024"];
const strategyArray = [
  {
    View: "Bullish",
    Value: {
      "24-Apr-2024": [
        "Bull Call Spread",
        "Bull Put Spread",
        "Bull Put Spread",
        "Long Call",
        "Bull Put Spread",
        "Bull Call Spread",
        "Strategy1",
        "Bull Call Spread",
        "Strategy1",
        "Strategy1",
        "Bull Call Spread",
        "Spread-Strategy",
      ],
      "02-May-2024": [
        "Bull Call Spread",
        "Bull Call Spread",
        "Bull Put Spread",
        "Long Call",
        "Long Call",
        "Long Call",
        "Bull Put Spread",
        "Bull Call Spread",
        "Strategy1",
        "Bull Call Spread",
        "Strategy2",
        "Strategy1",
        "Strategy2",
        "Bull Call Spread",
      ],
      "09-May-2024": ["Strategy Put", "Strategy Call", "Strategy Call", "Strategy Call", "Strategy Put"],
    },
  },
  {
    View: "Bearish",
    Value: {
      "24-Apr-2024": ["Bear Call Spread", "Bear Call Spread", "Bear Call Spread", "Long Put", "Long Put", "Long Put", "Bear Call Spread"],
      "31-May-2024": ["Long Put", "Long Put", "Long Put", "Long Put", "Long Put"],
      "21-Jun-2024": ["Strategy3", "Strategy3", "Bear Put Spread", "Strategy3", "Long Put", "Long Put"],
    },
  },
  {
    View: "RangeBound",
    Value: {
      "24-Apr-2024": [
        "Short Straddle",
        "Short Strangle",
        "Short Strangle",
        "Iron Butterfly",
        "Short Strangle",
        "Short Straddle",
        "Strategy1",
        "Short Straddle",
        "Strategy1",
        "Strategy1",
        "SpreadStrategy",
        "Short Straddle",
      ],
      "02-May-2024": [
        "Short Straddle",
        "Short Straddle",
        "Short Strangle",
        "Iron Butterfly",
        "Iron Butterfly",
        "Iron Butterfly",
        "Short Strangle",
        "Short Straddle",
        "Strategy1",
        "Short Straddle",
        "Strategy2",
        "Strategy1",
        "Strategy2",
        "Short Straddle",
      ],
      "21-Jun-2024": ["Iron Condor", "Iron Butterfly", "Iron Butterfly", "Iron Butterfly", "Iron Condor"],
    },
  },
  {
    View: "Volatile",
    Value: {
      "02-May-2024": ["Long Straddle", "Long Strangle", "Long Strangle", "Long Strangle", "Long Straddle", "Strategy1", "Long Straddle", "Strategy1", "Strategy1", "Spread-Strategy", "Long Straddle"],
      "09-May-2024": ["Long Straddle", "Long Straddle", "Long Strangle", "Long Strangle", "Long Straddle", "Strategy1", "Long Straddle", "Strategy2", "Strategy1", "Strategy2", "Long Straddle"],
      "31-May-2024": ["Long Straddle", "Long Strangle", "Long Strangle", "Long Strangle", "Long Straddle"],
    },
  },
];

function App() {
  const [view, setView] = useState("Bullish");
  const [date, setDate] = useState(dateArray[0]);
  const [dateVisible, setDateVisible] = useState(false);
  return (
    <div className="container">
      {/* navbar */}
      <div className="flex justify-center bg-slate-200 p-3 rounded-b-lg items-center">
        <h1 className="text-3xl font-semibold mx-2">Jatin Dodiya</h1>
        <a href="https://www.linkedin.com/in/jatin-dodiya/" target="_blank" rel="noopener noreferrer" className="mx-2 px-4 bg-blue-600 rounded-full text-white hover:bg-blue-800 p-2">
          About Me
        </a>
      </div>

      {/* title */}
      <div>
        <p className="text-center m-3">Nerve Solution - (Interview Assignment)</p>
      </div>

      {/* main assignment task Starts From here*/}
      <div className="w-1/3 mx-auto flex flex-col justify-center items-center p-4">

        {/* Views */}
        <div className="w-full flex justify-between mb-4 p-2 rounded-xl font-bold">
          {strategyArray.map((item, index) => (
            <div
              key={index}
              onClick={() => setView(item.View)}
              className={`cursor-pointer px-4 py-1 rounded-xl text-center w-full mx-1 ${view === item.View ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-400"}`}
            >
              {item.View}
            </div>
          ))}
        </div>

        {/* Dates */}
        <div className="w-full">
          <div
            onClick={() => setDateVisible((prev) => !prev)} // Toggle date visibility
            className="flex justify-between items-center cursor-pointer px-4 py-2 rounded-lg text-left font-bold border border-gray-300"
          >
            {date}
            <img src={downSign} className={`w-5 h-5 transition-transform duration-300 ${dateVisible ? "rotate-180" : ""}`} style={{ filter: 'invert(35%) sepia(76%) saturate(5071%) hue-rotate(193deg) brightness(107%) contrast(101%)' }} />
          </div>

          {dateVisible && (
            <div className="w-full flex flex-col justify-between mb-4 p-2 rounded-xl font-bold">
              {dateArray.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setDate(item), setDateVisible((prev) => !prev);
                  }}
                  className={`cursor-pointer px-4 py-2 rounded-lg text-left mx-2 my-1 ${date === item ? "bg-blue-600 text-white" : " hover:text-gray-500 border border-gray-300"}`}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Show Strategies Based on View and Date */}

        <div className="w-full">
          {(() => {
            const strategyList = strategyArray.find((item) => item.View === view)?.Value[date];
            // console.log(strategyList)
            if (!strategyList) {
              return (
                <div className="h-64 flex justify-center flex-col items-center">
                  <p className="m-3">There are No strategies for</p>
                  <p className="font-bold">{date}</p>
                </div>
              );
            }

            const strategyCount = strategyList.reduce((acc, strategy) => {
              acc[strategy] = (acc[strategy] || 0) + 1;
              return acc;
            }, {});
            // console.log(Object.entries(strategyCount))

            return Object.entries(strategyCount).map(([strategy, count], index) => (
              <div key={index} className="flex justify-between items-center p-4 my-2 bg-white border border-gray-300 rounded-xl font-bold">
                {strategy}
                <div className="text-gray-500">
                  <span className="mx-2">•</span>
                  <span>{count > 1 ? `${count} Strategies` : `1 Strategy`}</span>
                </div>
              </div>
            ));
          })()}
        </div>
      </div>
    </div>
  );
}

export default App;
