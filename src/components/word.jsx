import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [wordType, setWordType] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setWord(e.target.value);
  };

  const searchWord = async () => {
    if (word.length === 0) {
      setError("Please Enter a Word.");
      return;
    }

    try {
      setError("");
      const options = {
        method: "GET",
        url: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
        headers: {
          "X-RapidAPI-Key":
            "e6d5486629msh65018cdd80ae331p1e0186jsn97a0e98cae43",
          "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);

      const wordData = response.data;

      if (wordData.results && wordData.results.length > 0) {
        const firstResult = wordData.results[0];
        const firstDefinition =
          firstResult.definition || "Definition not available";
        const type = firstResult.partOfSpeech || "Type not available";

        setDefinition(firstDefinition);
        setWordType(type);
      } else {
        setDefinition("Definition not available.");
        setWordType("Type not available.");
      }
    } catch (error) {
      console.error("Error fetching word data:", error);
      setError("An error occurred while fetching word data.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen px-3 bg-[#04080F]">
      <h1 className="text-4xl uppercase font-bold text-center tracking-widest text-[#507DBC] my-7 md:text-5xl">
        Lexicon
      </h1>
      <input
        className="border border-[#BBD1EA] rounded text-center tracking-widest my-3 px-10 md:text-xl py-1 md:px-20"
        type="text"
        value={word}
        onChange={handleInputChange}
        placeholder="Enter a Word."
      />
      <button
        className="border border-[#BBD1EA] rounded text-s text-[#DAE3E5] px-6 md:px-10 py-1"
        onClick={searchWord}
      >
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="flex flex-col my-20">
        <h1 className="text-3xl uppercase font-bold text-[#507DBC] md:text-4xl">
          {word}
        </h1>
        <p className="text-l italic text-[#DAE3E5] md:text-xl">{wordType}</p>
        <p className="text-base my-5 text-[#A1C6EA] md:text-l">{definition}</p>
      </div>

      <div>
        <h1 className="fixed bottom-0 left-0 w-full text-center my-5 text-[#A1C6EA] text-sm">
          Made by{" "}
          <a
            href="https://alnickclores.github.io/portfolio-website-v2/src/index.html?fbclid=IwAR02O8wa3Qnbu26Cjqu9j9gKJ4PCc1Kklj3iuAZTCBdbvhb03D4AkPqNDQY#hero"
            target="_blank"
          >
            Alnick
          </a>
        </h1>
      </div>
    </div>
  );
};

export default App;
