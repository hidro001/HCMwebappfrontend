
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import PostPerformer from './PostPerformer';
import ViewPerformer from './ViewPerformer';

const PostAndViewPerformers = () => {
  const [activeTab, setActiveTab] = useState('post');

  // Handlers for the child forms
  const handleFetch = () => alert(`Fetch clicked for ${activeTab} performer.`);
  const handleReset = () => alert(`Reset clicked for ${activeTab} performer.`);
  const handlePost = () => alert('Post Performer clicked!');

  // Common selects used in both PostPerformer & ViewPerformer:
  const monthSelect = (
    <select className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="" disabled>
        Select Month
      </option>
      <option value="Jan">January</option>
      <option value="Feb">February</option>
      <option value="Mar">March</option>
    </select>
  );

  const yearSelect = (
    <select className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="" disabled>
        Select Year
      </option>
      <option value="2023">2023</option>
      <option value="2024">2024</option>
    </select>
  );

  const designationSelect = (
    <select className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="" disabled>
        Select Designation
      </option>
      <option value="Saket">Saket</option>
      <option value="Noida">Noida</option>
      <option value="Delhi">Delhi</option>
    </select>
  );

  return (
    <div className="p-4 space-y-8">
      {/* ===== Tab Buttons ===== */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setActiveTab('post')}
          className={`
            px-6 py-2 rounded-full 
            border-2 border-purple-400
            text-purple-600
            hover:bg-purple-50 dark:hover:bg-gray-700
            transition-colors
            ${
              activeTab === 'post'
                ? 'bg-purple-100 dark:bg-purple-900'
                : ''
            }
          `}
        >
          Post Performer
        </button>
        <button
          onClick={() => setActiveTab('view')}
          className={`
            px-6 py-2 rounded-full 
            border-2 border-purple-400
            text-purple-600
            hover:bg-purple-50 dark:hover:bg-gray-700
            transition-colors
            ${
              activeTab === 'view'
                ? 'bg-purple-100 dark:bg-purple-900'
                : ''
            }
          `}
        >
          View Performer
        </button>
      </div>

      {/* ===== Tab Content ===== */}
      <AnimatePresence mode="wait">
        {activeTab === 'post' && (
          <PostPerformer
            monthSelect={monthSelect}
            yearSelect={yearSelect}
            designationSelect={designationSelect}
            handleFetch={handleFetch}
            handleReset={handleReset}
            handlePost={handlePost}
          />
        )}

        {activeTab === 'view' && (
          <ViewPerformer
            monthSelect={monthSelect}
            yearSelect={yearSelect}
            designationSelect={designationSelect}
            handleFetch={handleFetch}
            handleReset={handleReset}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostAndViewPerformers;

