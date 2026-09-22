import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

const FillInTheBlanks = ({ exercise }) => {
  const { title, instruction, text, wordBank, answers } = exercise;
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (index, value) => {
    setUserAnswers({
      ...userAnswers,
      [index]: value,
    });
  };

  const checkAnswers = () => {
    setIsSubmitted(true);
  };

  // Split text by placeholders like {0}, {1}
  const parts = text.split(/(\{\d+\})/g);

  let score = 0;
  if (isSubmitted) {
      Object.keys(answers).forEach(key => {
          if (userAnswers[key]?.toLowerCase().trim() === answers[key].toLowerCase().trim()) {
              score++;
          }
      });
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      {instruction && <p className="text-slate-600 mb-6">{instruction}</p>}

      {wordBank && wordBank.length > 0 && (
        <div className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
          <p className="text-sm font-medium text-slate-500 mb-2 uppercase tracking-wider">Word Bank</p>
          <div className="flex flex-wrap gap-2">
            {wordBank.map((word, idx) => (
              <span key={idx} className="bg-white border border-slate-200 px-3 py-1 rounded-full text-sm text-slate-700 shadow-sm">
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="text-lg text-slate-800 leading-loose mb-8">
        {parts.map((part, idx) => {
          const match = part.match(/\{(\d+)\}/);
          if (match) {
            const blankIndex = match[1];
            const isCorrect = isSubmitted && userAnswers[blankIndex]?.toLowerCase().trim() === answers[blankIndex].toLowerCase().trim();
            const isWrong = isSubmitted && !isCorrect;

            return (
              <span key={idx} className="inline-flex items-center mx-1">
                {wordBank && wordBank.length > 0 ? (
                    <select
                        value={userAnswers[blankIndex] || ''}
                        onChange={(e) => handleInputChange(blankIndex, e.target.value)}
                        disabled={isSubmitted}
                        className={`appearance-none bg-slate-50 border-b-2 px-3 py-1 text-center font-medium focus:outline-none focus:border-indigo-500 min-w-[120px] transition-colors rounded-t-md
                            ${isCorrect ? 'border-green-500 text-green-700 bg-green-50' : ''}
                            ${isWrong ? 'border-red-500 text-red-700 bg-red-50' : ''}
                            ${!isSubmitted ? 'border-slate-300' : ''}
                        `}
                    >
                        <option value=""></option>
                        {wordBank.map((word, wIdx) => (
                            <option key={wIdx} value={word}>{word}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="text"
                        value={userAnswers[blankIndex] || ''}
                        onChange={(e) => handleInputChange(blankIndex, e.target.value)}
                        disabled={isSubmitted}
                        className={`bg-slate-50 border-b-2 px-3 py-1 text-center font-medium focus:outline-none focus:border-indigo-500 min-w-[120px] transition-colors rounded-t-md
                            ${isCorrect ? 'border-green-500 text-green-700 bg-green-50' : ''}
                            ${isWrong ? 'border-red-500 text-red-700 bg-red-50' : ''}
                            ${!isSubmitted ? 'border-slate-300' : ''}
                        `}
                    />
                )}
                
                {isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 ml-1" />}
                {isWrong && <XCircle className="w-5 h-5 text-red-500 ml-1" />}
              </span>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <button
          onClick={checkAnswers}
          disabled={isSubmitted}
          className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200
            ${isSubmitted 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md active:transform active:scale-95'
            }`}
        >
          Check Answers
        </button>

        {isSubmitted && (
            <div className="text-lg font-semibold">
                Score: <span className={score === Object.keys(answers).length ? 'text-green-600' : 'text-indigo-600'}>
                    {score} / {Object.keys(answers).length}
                </span>
            </div>
        )}
      </div>
    </motion.div>
  );
};

export default FillInTheBlanks;
