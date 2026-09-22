import React, { useState, useEffect } from 'react';
import { Reorder, motion } from 'framer-motion';
import { GripVertical, CheckCircle2, XCircle } from 'lucide-react';

const Ordering = ({ exercise }) => {
  const { title, instruction, items } = exercise;
  const [order, setOrder] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setOrder([...items].sort(() => Math.random() - 0.5));
  }, [items]);

  const checkAnswers = () => setIsSubmitted(true);

  let score = 0;
  if (isSubmitted) {
    order.forEach((item, idx) => {
      if (item === items[idx]) score++;
    });
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      {instruction && <p className="text-slate-600 mb-6">{instruction}</p>}

      <Reorder.Group axis="y" values={order} onReorder={isSubmitted ? () => {} : setOrder} className="space-y-3">
        {order.map((item, idx) => {
          const isCorrect = isSubmitted && item === items[idx];
          const isWrong = isSubmitted && !isCorrect;

          return (
            <Reorder.Item key={item} value={item} className={`flex items-center gap-3 p-4 bg-white border rounded-lg shadow-sm ${isSubmitted ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'} ${isCorrect ? 'border-green-500 bg-green-50' : ''} ${isWrong ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}>
              {!isSubmitted && <GripVertical className="text-slate-400 w-5 h-5" />}
              <span className="flex-1 font-medium text-slate-700">{item}</span>
              {isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              {isWrong && <XCircle className="w-5 h-5 text-red-500" />}
            </Reorder.Item>
          );
        })}
      </Reorder.Group>

      <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-6">
        <button onClick={checkAnswers} disabled={isSubmitted} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors">
          Check Order
        </button>
        {isSubmitted && (
          <div className="text-lg font-bold text-slate-800">
            Score: <span className={score === items.length ? 'text-green-500' : 'text-indigo-600'}>{score} / {items.length}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
export default Ordering;
