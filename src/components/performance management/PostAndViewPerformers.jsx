
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import PostPerformer from './PostPerformer';
import ViewPerformer from './ViewPerformer';

const PostAndViewPerformers = () => {
  const [activeTab, setActiveTab] = useState('post');

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
            ${activeTab === 'post' ? 'bg-purple-100 dark:bg-purple-900' : ''}
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
            ${activeTab === 'view' ? 'bg-purple-100 dark:bg-purple-900' : ''}
          `}
        >
          View Performer
        </button>
      </div>

      {/* ===== Tab Content ===== */}
      <AnimatePresence mode="wait">
        {activeTab === 'post' && <PostPerformer key="postForm" />}
        {activeTab === 'view' && <ViewPerformer key="viewForm" />}
      </AnimatePresence>
    </div>
  );
};

export default PostAndViewPerformers;

