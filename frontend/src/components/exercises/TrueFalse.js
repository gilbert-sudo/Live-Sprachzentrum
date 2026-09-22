import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

const TrueFalse = ({ exercise }) => {
  const { title, instruction, questions } = exercise;
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (idx, value) => {
    setAnswers({ ...answers, [idx]: value });
  };

  const checkAnswers = () => setIsSubmitted(true);

  let score = 0;
  if (isSubmitted) {
    questions.forEach((q, idx) => {
      if (answers[idx] === q.isTrue) score++;
    });
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      {instruction && <p className="text-slate-600 mb-6">{instruction}</p>}

      <div className="space-y-4">
        {questions.map((q, idx) => {
          const userAnswer = answers[idx];
          const isCorrect = isSubmitted && userAnswer === q.isTrue;
          const isWrong = isSubmitted && userAnswer !== undefined && userAnswer !== q.isTrue;

          return (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-100 gap-4">
              <span className="text-slate-700 font-medium flex-1">{q.statement}</span>
              
              <div className="flex items-center gap-2">
                <button
                  disabled={isSubmitted}
                  onClick={() => handleSelect(idx, true)}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${userAnswer === true ? 'bg-indigo-600 text-white shadow' : 'bg-white text-slate-600 border border-slate-200 hover:bg-indigo-50'} ${isSubmitted && q.isTrue === true ? 'bg-green-500 text-white' : ''} ${isSubmitted && userAnswer === true && !isCorrect ? 'bg-red-500 text-white' : ''}`}
                >
                  Richtig
                </button>
                <button
                  disabled={isSubmitted}
                  onClick={() => handleSelect(idx, false)}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${userAnswer === false ? 'bg-indigo-600 text-white shadow' : 'bg-white text-slate-600 border border-slate-200 hover:bg-indigo-50'} ${isSubmitted && q.isTrue === false ? 'bg-green-500 text-white' : ''} ${isSubmitted && userAnswer === false && !isCorrect ? 'bg-red-500 text-white' : ''}`}
                >
                  Falsch
                </button>
                {isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500 ml-2" />}
                {isWrong && <XCircle className="w-5 h-5 text-red-500 ml-2" />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-6">
        <button onClick={checkAnswers} disabled={isSubmitted} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors">
          Check Answers
        </button>
        {isSubmitted && (
          <div className="text-lg font-bold text-slate-800">
            Score: <span className={score === questions.length ? 'text-green-500' : 'text-indigo-600'}>{score} / {questions.length}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
export default TrueFalse;
