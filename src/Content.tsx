import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";
import { useState } from "react";

function Content() {
  const [task, setTask] = useState("");
  const [arr, setArr] = useState<string[]>([]);
  const Addtask = () => {
    if(!task.trim()){
      alert("bro type something")
      setTask("")
    }else{
      setArr([...arr,task])
       setTask("");
       localStorage.setItem("task",task)
       storage()
    }
  };
  const storage=()=>{
    localStorage.getItem("task")
  }
  storage()
  return (
    <>
      <main className="max-w-2xl border-2 rounded-md p-2 m-auto mt-25">
        <div className="flex m-auto w-full max-w-sm  space-x-2">
          <Input
            value={task}
            type="text"
            onChange={(e) => setTask(e.target.value)}
            placeholder="AddTask"
          />
          <Button type="submit" onClick={Addtask}>
            Add
          </Button>
        </div>
        <ul>
          {arr.map((item, index) => (
            <li
              className="p-2 border-2 m-2 rounded-md flex justify-between"
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
export default Content;
