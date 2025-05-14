import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const navigate=useNavigate()
  const add = () => {
    if (task.trim() === "") {
      toast.dismiss("error");
      toast.error("Type Something!", {
        id: "error",
        duration: 1000,
      });

      setTask("");
    } else {
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      toast.dismiss("w");
      toast.success("Task has been added!", {
        id: "w",
        duration: 1000,
      });
      setTask("");
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };
  const remove = (taskToRemove: string) => {
    const values = JSON.parse(localStorage.getItem("tasks") || "[]");
    const arr = values.filter((task: string) => task !== taskToRemove);
    localStorage.setItem("tasks", JSON.stringify(arr));
    setTasks(arr);
    toast.dismiss("n");
    toast.success("Deleted!", {
      id: "n",
      duration: 1000,
    });
  };
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login")

    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);
  return (
    <>
      <Toaster></Toaster>
      <Header></Header>

      <main className="max-w-2xl border-2 rounded-md p-2 m-auto mt-25">
        <div className="flex m-auto w-full max-w-sm  space-x-2">
          <Input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            placeholder="Type Here"
          />
          <Button className="cursor-pointer" onClick={add} type="submit">
            <FaPlus />
          </Button>
        </div>
        <ul>
          {tasks.length == 0 ? (
            <li className="p-10 text-xl  text-center border-2 m-2 rounded-md  overflow-auto ">
              No Available Task 🙂
            </li>
          ) : (
            tasks.map((task, index) => (
              <li
                className="p-2 border-2 m-2 rounded-md flex max-h-16  overflow-auto justify-between items-center "
                key={index}
              >
                {task}
                <span
                  key={index}
                  onClick={() => {
                    remove(task);
                  }}
                  className="flex items-center text-red-400 cursor-pointer "
                >
                  Delete
                </span>
              </li>
            ))
          )}
        </ul>
        <button className="text-white" onClick={logout}>
          logout
        </button>
       
      </main>
    </>
  );
}
export default Home;

// className = "p-2 border-2 m-2 rounded-md flex justify-between";
