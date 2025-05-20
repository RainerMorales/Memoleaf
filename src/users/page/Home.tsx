import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { auth } from "@/firebase";
import Modal from "@/components/ui/Modal";
import {
  addDoc,
  query,
  collection,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
interface Todo {
  id: string;
  text: string;
  createdAt: Date | null;
}
function Home() {
  const authuser = auth.currentUser;
  const [task, setTask] = useState("");
  const [list, setList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const add = async () => {
    if (!authuser) {
      return;
    }
    const userid = authuser.uid;
    const todosRef = collection(db, "users", userid, "todos");
    setTask("");
    try {
      await addDoc(todosRef, {
        text: task,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!auth.currentUser) {
      return;
    }
    setLoading(true);
    const userid = auth.currentUser.uid;
    const todosRef = collection(db, "users", userid, "todos");
    const todoQuery = query(todosRef, orderBy("createdAt", "desc"));
    const unsubcribe = onSnapshot(todoQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          text: docData.text,
          createdAt: docData.createdAt?.toDate(),
        };
      });
      setList(data);
      setLoading(false);
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
            placeholder="Add Task"
      
          />
          <Button onClick={add} className="cursor-pointer" type="submit">
            <FaPlus />
          </Button>
        </div>
        {!loading ? (
          list.length > 0 ? (
            <ul className="grid mt-10 ">
              {list.map((item) => (
                <li
                  className="p-2 m-2 border-2 border-zinc-800 rounded min-h-50 bg-zinc-900 text-gray-100 hover:border-zinc-700 transition-colors"
                  key={item.id}
                >
                  <div className="flex h-6 text-xs items-center justify-between text-zinc-500 ">
                    <div>
                      <span>{item.createdAt?.toLocaleDateString()} | </span>
                      <span>
                        {item.createdAt?.toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                    <Modal></Modal>
                  </div>
                  {item.text}
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
