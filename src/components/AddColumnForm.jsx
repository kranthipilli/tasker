"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const AddColumnForm = ({ onAddColumn }) => {
  const [columnName, setColumnName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (columnName.trim()) {
      onAddColumn(columnName);
      setColumnName("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 p-2 bg-gray-700 rounded-full shadow-md max-w-md"
    >
      <input
        type="text"
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
        placeholder="New column name"
        required
        className="flex-1 bg-transparent text-white placeholder-gray-300 border-none focus:ring-0 focus:outline-none px-4 py-2 rounded-full"
      />
      <button
        type="submit"
        className="flex items-center justify-center w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md transition duration-150"
      >
        <Plus className="w-5 h-5" />
      </button>
    </form>
  );
};

export default AddColumnForm;
