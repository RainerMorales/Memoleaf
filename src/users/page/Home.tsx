import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { auth } from "@/firebase";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { getAuth } from "firebase/auth";
function Home() {
  const authuser = auth.currentUser;
  const [task, setTask] = useState("");
  const [list, setList] = useState<string[]>([]);
  const add = async () => {
    if (!authuser) {
      return alert("login first");
    }
    const userid = authuser.uid;
    const todosRef = collection(db, "users", userid, "todos");
    try {
      await addDoc(todosRef, {
        text: task,
      });
      const querySnapshot = await getDocs(todosRef);
      const data = querySnapshot.docs.map((doc) => doc.data().text);
      setList(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetch = async()=>{
      
    }
    fetch()
  }, []);
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
        <ul>
          {list.map((todo, index) => (
            <li
              className="p-2 border-2 m-2 rounded flex max-h-16  overflow-auto justify-between items-center"
              key={index}
            >
              {todo}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
export default Home;