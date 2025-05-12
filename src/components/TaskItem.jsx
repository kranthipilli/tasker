"use client";

import { useState } from "react";

const TaskItem = ({
  task,
  columnId,
  onDeleteTask,
  onMoveTask,
  otherColumns,
}) => {
  const [isMoving, setIsMoving] = useState(false);
  const [targetColumn, setTargetColumn] = useState("");

  const handleMove = () => {
    if (targetColumn) {
      onMoveTask(task.id, columnId, targetColumn);
      setIsMoving(false);
    }
  };

  return (
    <div className="bg-gray-100 rounded p-3 border-l-4 border-green-500 text-black">
      <div className="mb-1 text-black font-sans">{task.content}</div>
      <div className="text-gray-600 text-sm">
        <small className="font-sans">
          {new Date(task.createdAt).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </small>
      </div>
      <div className="flex gap-1 mt-2">
        <button
          onClick={() => onDeleteTask(columnId, task.id)}
          className="text-red-500 hover:text-red-700 p-1"
          title="Delete story"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
        {!isMoving ? (
          <button
            onClick={() => setIsMoving(true)}
            className="text-blue-500 hover:text-blue-800 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="5 9 2 12 5 15" />
              <polyline points="19 9 22 12 19 15" />
              <polyline points="9 5 12 2 15 5" />
              <polyline points="9 19 12 22 15 19" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="12" y1="2" x2="12" y2="22" />
            </svg>
          </button>
        ) : (
          <div className="flex gap-1">
            <select
              value={targetColumn}
              onChange={(e) => setTargetColumn(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="">Select column</option>
              {otherColumns.map((col) => (
                <option className="text-black" key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleMove}
              className="bg-green-500 text-white px-2.5   text-xl rounded-4xl hover:bg-green-600"
            >
              ✓
            </button>
            <button
              onClick={() => setIsMoving(false)}
              className="bg-gray-500 text-white px-3 py-1 text-xl rounded-4xl hover:bg-gray-600"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
