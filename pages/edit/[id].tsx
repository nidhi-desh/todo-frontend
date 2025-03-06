import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getTasks, updateTask } from "../../utils/api";

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("red");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const res = await getTasks();
      const task = res.data.find((t: any) => t.id === Number(id));
      if (task) {
        setTitle(task.title);
        setColor(task.color);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching task:", error);
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }
    await updateTask(Number(id), { title, color });
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Edit Task</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
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
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
