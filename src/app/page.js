import TaskBoardClient from "./TaskBoardClient";
import { Toaster } from "react-hot-toast";


export default function Home() {
  return (
    <main className="bg-gray-500 min-h-screen p-4">
      <div className="mb-4">
        <Toaster position="bottom-right" />
      </div>
      <TaskBoardClient />
    </main>
  );
}

export const dynamic = "force-dynamic";
