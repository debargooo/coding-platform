import React, { useState } from 'react';
import { LANGUAGE_VERSIONS } from '../constants';

const LanguageSelector = ({language,onSelect}) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = Object.entries(LANGUAGE_VERSIONS);
  
  return (
    <div className="relative w-48">
      <button 
        onClick={() => setIsOpen(!isOpen)}

        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg flex justify-between items-center"
      >
        {language}
        <span className="ml-2">▼</span>
      </button>
      {isOpen && (
        <ul className="absolute left-0 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg z-50">
          {languages.map(([lang,version]) => (
            <li 
              key={lang} 
              onClick={() => { onSelect(lang); setIsOpen(false); }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              {lang}&nbsp;
              <span className='text-gray-500'>{version}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
