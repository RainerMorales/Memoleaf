import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { auth } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { getAuth } from "firebase/auth";
function Home() {
  const authuser =auth.currentUser
  const [task, setTask] = useState("");
  const [list,setList]=useState("")
  const add = async () => {
    if (!authuser) {
      return alert("login first");
    }
    const userid=authuser.uid
    console.log(userid)
    try{
      const todosRef =collection(db,"users",userid,"todos")
      await addDoc(todosRef,{
        text:task
      })
    }catch(err){
      console.log(err)
    }
   
  };
  return (
    <>
      <Toaster></Toaster>
      <Header></Header>
      <main className="max-w-2xl p-2 m-auto">
        <div className="flex m-auto w-full max-w-sm space-x-2">
          <Input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            placeholder="Type Here"
          />
          <Button onClick={add} className="cursor-pointer" type="submit">
            <FaPlus />
          </Button>
        </div>
        <ul></ul>
      </main>
    </>
  );
}
export default Home;

// className = "p-2 border-2 m-2 rounded-md flex justify-between";
{
  /* {tasks.length == 0 ? (
            <li className="flex justify-center items-center h-100 text-xl  text-center border-2 m-2 rounded  overflow-auto ">
              No Available Task
            </li>
          ) : (
            tasks.map((task, index) => (
              <li
                className="p-2 border-2 m-2 rounded flex max-h-16  overflow-auto justify-between items-center "
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
          )} */
}
