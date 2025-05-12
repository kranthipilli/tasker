"use client";
import { useState, useEffect } from "react";
import TaskColumn from "./TaskColumn";
import AddColumnForm from "./AddColumnForm";
import toast from "react-hot-toast";

const TaskBoard = () => {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState({});


  useEffect(() => {
    console.log("useEffect");

    const savedColumns = localStorage.getItem("taskColumns");
    const savedTasks = localStorage.getItem("tasks");
    if (savedColumns?.length > 0 && savedTasks?.length > 0) {
      console.log("if");
      setColumns(JSON.parse(savedColumns));
      setTasks(JSON.parse(savedTasks));
    } else {
      const now = new Date().toISOString(); // consistent timestamp
      const initialColumns = [
        { id: "todo", name: "To do" },
        { id: "inProgress", name: "In Progress" },
        { id: "done", name: "Done" },
      ];

      const initialTasks = {
        todo: [
          { id: "1", content: "Set up project repo and CI/CD", createdAt: now },
          { id: "2", content: "Write feature specs for login", createdAt: now },
        ],
        inProgress: [
          { id: "3", content: "Develop user authentication", createdAt: now },
          {
            id: "4",
            content: "Build project structure with Redux Toolkit",
            createdAt: now,
          },
        ],
        done: [
          { id: "5", content: "Design UI mockups", createdAt: now },
          { id: "6", content: "Set up linting and Prettier", createdAt: now },
        ],
      };

      setColumns(initialColumns);
      setTasks(initialTasks);
      localStorage.setItem("taskColumns", JSON.stringify(initialColumns));
      localStorage.setItem("tasks", JSON.stringify(initialTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("taskColumns", JSON.stringify(columns));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [columns, tasks]);

  const addColumn = (columnName) => {
    const newColumn = { id: Date.now().toString(), name: columnName };
    setColumns([...columns, newColumn]);
    setTasks({ ...tasks, [newColumn.id]: [] });
  };

  const deleteColumn = (columnId) => {
    const columnToDelete = columns.find((col) => col.id === columnId);
    const tasksToDelete = tasks[columnId];

    const newColumns = columns.filter((col) => col.id !== columnId);
    const newTasks = { ...tasks };
    delete newTasks[columnId];

    setColumns(newColumns);
    setTasks(newTasks);

    toast(
      (t) => (
        <div>
          <span>Column deleted</span>
          <button
            onClick={() => {
              setColumns((prev) => [...prev, columnToDelete]);
              setTasks((prev) => ({ ...prev, [columnId]: tasksToDelete }));
              toast.dismiss(t.id);
            }}
            className="ml-4 text-blue-500 underline"
          >
            Undo
          </button>
        </div>
      ),
      { duration: 5000 }
    );
  };

  const addTask = (columnId, taskContent) => {
    const timestamp = Date.now().toString();
    const newTask = {
      id: timestamp,
      content: taskContent,
      createdAt: new Date().toISOString(),
    };
    setTasks({
      ...tasks,
      [columnId]: [...tasks[columnId], newTask],
    });
  };

  const deleteTask = (columnId, taskId) => {
    const deletedTask = tasks[columnId].find((task) => task.id === taskId);
    const updatedTasks = tasks[columnId].filter((task) => task.id !== taskId);

    setTasks({
      ...tasks,
      [columnId]: updatedTasks,
    });

    toast(
      (t) => (
        <div>
          <span>Task deleted</span>
          <button
            onClick={() => {
              setTasks((prev) => ({
                ...prev,
                [columnId]: [...prev[columnId], deletedTask],
              }));
              toast.dismiss(t.id);
            }}
            className="ml-4 text-blue-500 underline"
          >
            Undo
          </button>
        </div>
      ),
      { duration: 5000 }
    );
  };

  const moveTask = (taskId, fromColumnId, toColumnId) => {
    const fromTasks = tasks[fromColumnId].filter((task) => task.id !== taskId);
    const taskToMove = tasks[fromColumnId].find((task) => task.id === taskId);

    setTasks({
      ...tasks,
      [fromColumnId]: fromTasks,
      [toColumnId]: [...tasks[toColumnId], taskToMove],
    });
  };

  return (
    <div className="max-w-full mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-6 font-sans first-letter:text-5xl first-letter:text-blue-500 :">Tasker</h1>
      <AddColumnForm onAddColumn={addColumn} />
      
      <div className={`flex w-full gap-4 mt-5 overflow-x-auto `} >
        {columns.map((column) => (
          <TaskColumn
            key={column.id}
            column={column}
            tasks={tasks[column.id] || []}
            onAddTask={addTask}
            onDeleteColumn={deleteColumn}
            onDeleteTask={deleteTask}
            onMoveTask={moveTask}
            otherColumns={columns.filter((col) => col.id !== column.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
