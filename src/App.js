import React, { useState } from 'react';
import './App.css'; 
import 'tailwindcss/tailwind.css'; 
const { GoogleGenerativeAI } = require('@google/generative-ai');


let API_KEY = process.env.REACT_APP_GEMINI_API;

const googleAI = new GoogleGenerativeAI(API_KEY);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};
 
const geminiModel = googleAI.getGenerativeModel({
  model: 'gemini-pro',
  geminiConfig,
});



function App() {
  const [quote, setQuote] = useState('');
  const [loading,setLoading]=useState(false)

  const defaultQuote="Debugging is like being the detective in a crime movie where you're also the murderer. - Filipe Fortes" 




  const generate = async (req,res) => {    
    const prompt='generate a quote of the day'
    setLoading(true);
    try {
      const result = await geminiModel.generateContent(prompt);
      const response = result.response;

      console.log(response.candidates[0].content.parts[0].text)
      setQuote(response.candidates[0].content.parts[0].text) 
      setLoading(false);
    } catch (error) {
      console.log('response error', error);
        setLoading(false);
    }
  };
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Random Quote Generator</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mb-4"
          onClick={generate}
        >
          {
            loading ? 'Generating Quote..' : 'Generate Quote'
          }
        </button>
        {
          !quote ?
          <p className="text-center">{defaultQuote}</p> : null
        }
        
        {quote && <p className="text-center">{quote}</p>}
      </div>
    </div>
  );
}

export default App;
