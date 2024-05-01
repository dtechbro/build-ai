"use client";
import { useState, useEffect, useContext } from "react"; // Use useEffect for potential future data fetching
import axios from "axios";
import { IoSend } from "react-icons/io5";
import { marked } from "marked";
import { CiUser } from "react-icons/ci";

import { FaBowlFood } from "react-icons/fa6";
import { WiStars } from "react-icons/wi";
import { TbReplace } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import { UserContext } from "@/context/UserContext";
const ChatBot = () => {
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const { username } = useContext(UserContext);

  const surpriseOptions = [
    "How to make Jollof Rice?",
    "Recipe for Egusi Soup?",
    "How to prepare Pounded Yam?",
    "Steps to make Nigerian Fried Rice?",
  ];

  const handleSurprise = () => {
    const randomIndex = Math.floor(Math.random() * surpriseOptions.length);
    setInputValue(surpriseOptions[randomIndex]);
  };

  const sendMessage = async () => {
    setLoading(true);
    try {
      if (!inputValue.trim()) {
        setError("Please ask a question about your dietary needs.");
        return;
      }

      const response = await axios.post(
        "https://aleeyah-api.vercel.app/recipes/generate",
        {
          history: chatHistory.map((item) => item.parts),
          message: inputValue,
        },
      );

      setChatHistory([
        ...chatHistory,
        { role: "user", parts: inputValue },
        { role: "model", parts: response.data },
      ]);
      setInputValue("");
      setError("");
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Error sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  // Optional: Fetch initial conversation history from server (if applicable)
  useEffect(() => {
    // Implement logic to fetch initial history if needed
  }, []);

  function renderReadableText(text) {
    const markdownText = text.replace(/\*{2}(.*?)\*{2}/g, "**$1**");

    const htmlText = marked(markdownText);

    return <span dangerouslySetInnerHTML={{ __html: htmlText }} />;
  }

  // const handleInputChange = (dataMessage) => {
  //setInputValue(dataMessage);
  //};

  return (
    <>
      {chatHistory.length === 0 ? (
        <div className="w-full md:w-10/12 p-6 md:p-10 h-screen flex flex-col justify-between">
          <div className="flex gap-4 flex-col ">
            <div>
              <h1 className="text-primarycolor md:text-7xl text-2xl">
                Hello, {username}
              </h1>
              <h1 className="md:text-7xl text-3xl md:w-1/2 font-thin text-gray-400">
                What do you plan on eating today?
              </h1>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-lg font-bold text-gray-400">Presets</h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                <div
                  onClick={() =>
                    setInputValue(
                      "I have some ingredients what can make out of it",
                    )
                  }
                  className="p-4 md:p-8 rounded-lg h-[150px] md:h-[200px] cursor-pointer hover:border-[2.5px] hover:border-primarycolor bg-gray-50"
                >
                  <h1 className="text-gray-400 text-sm md:text-lg">
                    I have some ingredients what can i make out of it?
                  </h1>
                </div>

                <div
                  onClick={() =>
                    setInputValue(
                      "Come up with a meal plan and grocery list for the week for me",
                    )
                  }
                  className="md:p-8 p-4 rounded-lg h-[150px] md:h-[200px] cursor-pointer hover:border-[2.5px] hover:border-primarycolor bg-gray-50"
                >
                  <h1 className="text-gray-400 text-sm md:text-lg">
                    Come up with a meal plan and grocery list for the week for
                    me
                  </h1>
                </div>
                <div
                  onClick={() =>
                    setInputValue(
                      "Substitute the ingredients recipe for a food",
                    )
                  }
                  className="p-4 md:p-8 rounded-lg h-[150px] md:h-[200px] cursor-pointer hover:border-[2.5px] hover:border-primarycolor bg-gray-50"
                >
                  <h1 className="text-gray-400 text-sm md:text-lg">
                    Substitute the ingredients recipe for a food
                  </h1>
                </div>
                <div
                  onClick={() =>
                    setInputValue(
                      "I have been having a funny feeling since i ate, why could that be?",
                    )
                  }
                  className="md:p-8 p-4 rounded-lg h-[150px] md:h-[200px] cursor-pointer hover:border-[2.5px] hover:border-primarycolor bg-gray-50"
                >
                  <h1 className="text-gray-400 text-sm md:text-lg">
                    I have been having a funny feeling since i ate, why could
                    that be?
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-4 justify-between rounded-full bg-gray-50 flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="How would you like aleeyah to help you today?"
              className="flex w-full outline-none bg-transparent md:text-sm "
            />
            <button onClick={sendMessage} className="p-2 text-primarycolor">
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <IoSend />
              )}
            </button>{" "}
          </div>
        </div>
      ) : (
        <div className=" h-screen  w-full">
          <div className="flex  items-center justify-between  p-4">
            <h1 className="text-lg font-semibold text-primarycolor">
              Aleeyah, your food companion
            </h1>{" "}
            <button onClick={clearChat} className="focus:outline-none">
              <svg
                className="h-6 w-6 text-gray-500 hover:text-primarycolor transition duration-300 ease-in-out" // Use primary color on hover
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5H16V4zM9 14l9-9"
                />
              </svg>
            </button>
          </div>
          <div className="chat-history h-[75%] overflow-y-auto md:w-4/6  mx-auto p-4 md:p-10 ">
            {chatHistory.map((item, index) => (
              <div
                key={index}
                className={`flex ${item.role === "user" ? "justify-start" : "justify-start"} mb-2`}
              >
                {item.role === "user" ? (
                  // Render user message
                  <div className={`flex gap-2 md:gap-4 my-4`}>
                    <div className="bg-black w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex justify-center items-center rounded-full">
                      <CiUser className="text-xl text-white" />
                    </div>

                    <div>
                      <h1 className="font-bold ">You</h1>
                      <p>{item.parts}</p>
                    </div>
                  </div>
                ) : (
                  <div className={`w-full my-4`}>
                    <div className="flex gap-2 md:gap-4">
                      <div className="bg-primarycolor p-2 w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex justify-center items-center rounded-full">
                        <Image
                          src={"/icon.svg"}
                          width={1000}
                          height={1000}
                          alt="icon"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="w-full">
                        <h1 className="font-bold ">Aleeyah</h1>
                        <p>{renderReadableText(item.parts)} </p>
                        <div className="flex gap-2 md:gap-4 flex-wrap mt-4">
                          <div
                            onClick={() =>
                              setInputValue("Substitute the recipes")
                            }
                            className="flex gap-2 items-center bg-[#E5FFEC] p-4 rounded-lg "
                          >
                            <TbReplace />
                            <p className="text-gray-400 hidden md:block">
                              Substitute the recipes
                            </p>
                          </div>
                          <div
                            onClick={() =>
                              setInputValue("Sugest Something else i can eat")
                            }
                            className="flex gap-2 items-center bg-[#E5FFEC] p-4 rounded-lg "
                          >
                            <WiStars className="text-xl" />
                            <p className="text-gray-400 md:block hidden">
                              Suggest something else i can eat
                            </p>
                          </div>
                          <div
                            onClick={() =>
                              setInputValue("Make a meal plan for the week")
                            }
                            className="flex gap-2 items-center bg-[#E5FFEC] p-4 rounded-lg "
                          >
                            <FaBowlFood />
                            <p className="text-gray-400 hidden md:block">
                              Make a meal plan for the week
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                  </div>
                )}
              </div>
            ))}{" "}
          </div>

          <div className="md:p-20 p-4">
            <div className="w-full p-4 justify-between rounded-full bg-gray-50 flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="How would you like aleeyah to help you today?"
                className="flex w-full outline-none bg-transparent"
              />
              <button onClick={sendMessage} className="p-2 text-primarycolor">
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <IoSend />
                )}
              </button>{" "}
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}
    </>
  );
};

export default ChatBot;
