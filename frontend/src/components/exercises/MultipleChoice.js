import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MultipleChoice = ({ exercise }) => {
  const { title, instruction, questions } = exercise;
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (questionId, option) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: option,
    });
  };

  const checkAnswers = () => {
    setIsSubmitted(true);
  };

  let score = 0;
  if (isSubmitted) {
      questions.forEach(q => {
          if (userAnswers[q.id] === q.correctAnswer) {
              score++;
          }
      });
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      {instruction && <p className="text-slate-600 mb-6">{instruction}</p>}

      <div className="space-y-8">
        {questions.map((q, idx) => {
          const userAnswer = userAnswers[q.id];
          const isCorrect = isSubmitted && userAnswer === q.correctAnswer;
          const isWrong = isSubmitted && userAnswer && userAnswer !== q.correctAnswer;

          return (
            <div key={q.id} className="bg-slate-50/50 rounded-lg p-5 border border-slate-100">
              <p className="font-medium text-slate-800 mb-4 flex items-start gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold mt-0.5">{idx + 1}</span>
                  {q.question}
              </p>
              
              <div className="space-y-3 pl-9">
                {q.options.map((option, oIdx) => {
                  const isSelected = userAnswer === option;
                  let optionClass = "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30";
                  
                  if (isSelected) {
                      optionClass = "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500";
                  }

                  if (isSubmitted) {
                      if (option === q.correctAnswer) {
                          optionClass = "border-green-500 bg-green-50 ring-1 ring-green-500";
                      } else if (isSelected && option !== q.correctAnswer) {
                          optionClass = "border-red-500 bg-red-50 ring-1 ring-red-500 opacity-70";
                      } else {
                          optionClass = "border-slate-200 opacity-50";
                      }
                  }

                  return (
                    <label 
                        key={oIdx} 
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${optionClass}`}
                    >
                      <div className="relative flex items-center justify-center">
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={option}
                            checked={isSelected}
                            onChange={() => handleSelect(q.id, option)}
                            disabled={isSubmitted}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                              ${isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-slate-300 bg-white'}
                              ${isSubmitted && option === q.correctAnswer ? 'border-green-500 bg-green-500' : ''}
                              ${isSubmitted && isSelected && option !== q.correctAnswer ? 'border-red-500 bg-red-500' : ''}
                          `}>
                              {((isSelected && !isSubmitted) || (isSubmitted && option === q.correctAnswer)) && (
                                  <div className="w-2 h-2 rounded-full bg-white" />
                              )}
                          </div>
                      </div>
                      <span className={`text-slate-700 ${isSelected ? 'font-medium text-slate-900' : ''}`}>
                          {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-6">
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
                Score: <span className={score === questions.length ? 'text-green-600' : 'text-indigo-600'}>
                    {score} / {questions.length}
                </span>
            </div>
        )}
      </div>
    </motion.div>
  );
};

export default MultipleChoice;
