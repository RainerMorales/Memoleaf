import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
function Content() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const add = () => {
    if (task.trim() === "") {
      toast.error("Type Something!");
      setTask("");
    } else {
      toast.success("Add task Success!");
      setTasks([...tasks, task]);
      setTask("");
    }
  };
  return (
    <>
      <Toaster></Toaster>
      <main className="max-w-2xl border-2 rounded-md p-2 m-auto mt-25">
        <div className="flex m-auto w-full max-w-sm  space-x-2">
          <Input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            placeholder="AddTask"
          />
          <Button onClick={add} type="submit">
            Add
          </Button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li
              className="p-2 border-2 m-2 rounded-md flex max-h-16  overflow-auto justify-between "
              key={index}
            >
              {task}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
export default Content;

// className = "p-2 border-2 m-2 rounded-md flex justify-between";
