"use client";

import { useState } from 'react';

const AddTaskForm = ({ onAddTask }) => {
  const [taskContent, setTaskContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskContent.trim()) {
      onAddTask(taskContent);
      setTaskContent('');
    }
  };

  return (
  <form onSubmit={handleSubmit} className="mb-4">
    <textarea
      value={taskContent}
      onChange={(e) => setTaskContent(e.target.value)}
      placeholder="Task description"
      required
      className="border text-black rounded px-3 py-2 w-full mb-2 min-h-[60px]"
    />
    <button 
      type="submit"
          className="bg-green-100 text-green-800 text-xs font-medium px-3 py-2 rounded-full hover:bg-green-200"
     >
      Add Task
    </button>
  </form>
);
};

export default AddTaskForm;