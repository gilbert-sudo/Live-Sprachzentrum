import React from 'react';
import HomeworkPanel from '../components/HomeworkPanel';

export default function HomeworkPage() {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-6">
      <div className="bg-white dark:bg-[#18181B] border border-gray-200 dark:border-gray-800 rounded-3xl shadow-lg relative min-h-[80vh]">
        <HomeworkPanel roomId="" socket={null} isStandalonePage={true} />
      </div>
    </div>
  );
}
