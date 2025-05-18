import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { auth } from "@/firebase";

import {
  addDoc,
  query,
  collection,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
function Home() {
  const authuser = auth.currentUser;
  const [task, setTask] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const add = async () => {
    if (!authuser) {
      return alert("login first");
    }
    const userid = authuser.uid;
    const todosRef = collection(db, "users", userid, "todos");
    try {
      await addDoc(todosRef, {
        text: task,
        createdAt: serverTimestamp(),
      });
      setTask("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!auth.currentUser) {
      return console.log("login first");
    } 
    setLoading(true)
    const userid = auth.currentUser.uid;
    const todosRef = collection(db, "users", userid, "todos");
    const todoQuery = query(todosRef, orderBy("createdAt", "asc"));
    const unsubcribe = onSnapshot(todoQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data().text);
      setList(data);
      setLoading(false)
    });
    return () => unsubcribe();
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
        {!loading ? (
          list.length > 0 ? (
            <ul className="grid lg:grid-cols-2  md:grid-cols-2 mt-10 ">
              {list.map((todo, index) => (
                <li
                  className="p-4 border-2 border-zinc-700 m-2 rounded-xl min-h-30 bg-zinc-950 text-gray-100 hover:border-teal-400 transition-colors"
                  key={index}
                >
                  {todo}
                </li>
              ))}
            </ul>
          ) : (
            <div className="border text-center mt-10 rounded-lg text-2xl  h-100 flex justify-center items-center">
              No tasks yet. Add one to get started!
            </div>
          )
        ) : (
          <div className="h-screen flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </main>
    </>
  );
}
export default Home;
