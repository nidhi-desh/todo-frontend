import { useState } from "react";
import { useRouter } from "next/router";
import { createTask } from "../utils/api";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("red");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }
    await createTask({ title, color });
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Create Task</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border p-3 w-full rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            required
          />
          <select
            className="border p-3 w-full rounded-md"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="red">🔴 Red</option>
            <option value="blue">🔵 Blue</option>
            <option value="green">🟢 Green</option>
          </select>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
