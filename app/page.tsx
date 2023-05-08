"use client"
import { useState } from 'react';

export default function CaesarCipher() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [shiftAmount, setShiftAmount] = useState(0);
  const [isEncryptMode, setIsEncryptMode] = useState(true);

  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  };

  const handleShiftAmountChange = (event:any) => {
    setShiftAmount(Number(event.target.value));
  };

  const handleEncryptButtonClick = () => {
    setIsEncryptMode(true);
    setOutputText(caesarCipher(inputText, shiftAmount, true));
  };

  const handleDecryptButtonClick = () => {
    setIsEncryptMode(false);
    setOutputText(caesarCipher(inputText, shiftAmount, false));
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
  };

  const caesarCipher = (text: string, shift: number, isEncrypt: boolean) => {
    let result = '';
    let shiftFactor = isEncrypt ? shift : -shift;

    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);

      if (charCode >= 65 && charCode <= 90) {
        result += String.fromCharCode(((charCode - 65 + shiftFactor + 26) % 26) + 65);
      } else if (charCode >= 97 && charCode <= 122) {
        result += String.fromCharCode(((charCode - 97 + shiftFactor + 26) % 26) + 97);
      } else {
        result += text.charAt(i);
      }
    }

    return result;
  };

  return (
    <div className="container mx-auto max-w-md my-10 px-4 py-6 bg-gray-200 rounded-md shadow-lg">
      <h1 className="text-5xl text-center font-bold mb-6 text-black">Caesar Cipher</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="inputText">
            Input Text
          </label>
          <textarea
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
            id="inputText"
            value={inputText}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="shiftAmount">
            Shift Amount
          </label>
          <input
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
            id="shiftAmount"
            type="number"
            min="0"
            max="25"
            value={shiftAmount}
            onChange={handleShiftAmountChange}
          />
        </div>
        <div className="flex justify-between mb-4">
          <button
            className={`py-2 px-4 rounded-lg text-white font-bold ${
              isEncryptMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
            }`}
            type="button"
            onClick={handleEncryptButtonClick}
          >
            Encrypt
          </button>
          <button
            className={`py-2 px-4 rounded-lg text-white font-bold ${
              isEncryptMode ? 'bg-gray-400 hover:bg-gray-500': 'bg-gray-400 hover:bg-gray-500'
            }`}
            type="button"
            onClick={handleDecryptButtonClick}
          >
            Decrypt
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="outputText">
            Output Text
          </label>
          <textarea
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
            id="outputText"
            value={outputText}
            readOnly
          />
        </div>
        
      </form>
    </div>
    );
  }