import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getTasks, updateTask, deleteTask } from "../utils/api";

interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      const sortedTasks = res.data.sort((a: Task, b: Task) => a.id - b.id); // Sort by ID
      setTasks(sortedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  
  const toggleCompletion = async (id: number, completed: boolean) => {
    try {
      await updateTask(id, { completed: !completed });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Todo List</h1>
           {/* Create Task Button */}
        <button
          onClick={() => router.push("/create")}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 mb-6"
        >
          + Create Task
        </button>
        {/* Task Summary */}
        <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg mb-4">
          <p className="text-lg font-semibold text-gray-700">
            Tasks: <span className="text-blue-600">{tasks.length}</span>
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Completed:{" "}
            <span className="text-green-600">
              {tasks.filter((task) => task.completed).length} of {tasks.length}
            </span>
          </p>
        </div>

        {/* Task List */}
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex justify-between items-center p-4 rounded-lg shadow-md transition-all duration-200 ${
                task.color === "red"
                  ? "bg-red-100 border-l-4 border-red-500"
                  : task.color === "blue"
                  ? "bg-blue-100 border-l-4 border-blue-500"
                  : "bg-green-100 border-l-4 border-green-500"
              } hover:shadow-lg`}
            >
              {/* Left Section: Checkbox & Task Title */}
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task.id, task.completed)}
                  className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-400 cursor-pointer"
                />
                <span
                  className={`text-lg font-medium ${
                    task.completed ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {task.title}
                </span>
              </div>

              {/* Right Section: Edit & Delete Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => router.push(`/edit/${task.id}`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
