import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Transformation = ({ exercise }) => {
  const { title, instruction, items } = exercise;
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const checkAnswers = () => setIsSubmitted(true);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      {instruction && <p className="text-slate-600 mb-6">{instruction}</p>}

      <div className="space-y-6">
        {items.map((item, idx) => (
          <div key={idx} className="bg-slate-50 p-5 rounded-lg border border-slate-200">
            <p className="text-slate-700 font-medium mb-3">{item.prompt}</p>
            <textarea
              disabled={isSubmitted}
              value={answers[idx] || ''}
              onChange={(e) => setAnswers({ ...answers, [idx]: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none min-h-[80px]"
              placeholder="Your answer..."
            />
            {isSubmitted && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800 font-semibold mb-1">Model Answer:</p>
                <p className="text-green-900">{item.modelAnswer}</p>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 pt-6 mt-6">
        <button onClick={checkAnswers} disabled={isSubmitted} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors">
          Show Answers
        </button>
      </div>
    </motion.div>
  );
};
export default Transformation;
