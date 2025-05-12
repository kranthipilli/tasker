"use client";

import { useState } from 'react';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';

const TaskColumn = ({ column, tasks, onAddTask, onDeleteColumn, onDeleteTask, onMoveTask, otherColumns }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleAddTask = (content) => {
    onAddTask(column.id, content);
    setIsAddingTask(false);
  };

return (
  <div className="bg-white rounded-lg p-4 min-w-[20.5rem]">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-[1rem] text-black font-bold first-letter:text-2xl ">{column.name}</h2>
      <div className="flex gap-1">
        <button 
          onClick={() => setIsAddingTask(!isAddingTask)}
          className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full hover:bg-blue-200"
        >
          {isAddingTask ? 'Cancel' : '+ Task'}
        </button>
        <button 
          onClick={() => onDeleteColumn(column.id)}
          className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full hover:bg-red-200"
        >
          Delete
        </button>
      </div>
    </div>
    
    {isAddingTask && <AddTaskForm onAddTask={handleAddTask} />}
    
    <div className="flex flex-col gap-2  rounded-t-4xl">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          columnId={column.id}
          onDeleteTask={onDeleteTask}
          onMoveTask={onMoveTask}
          otherColumns={otherColumns}
        />
      ))}
    </div>
  </div>
);
};

export default TaskColumn;