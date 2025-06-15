import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { auth } from "@/firebase";
import { BlurFade } from "@/components/magicui/blur-fade";
// import { LuCirclePlus } from "react-icons/lu";
// import { RiPushpinFill } from "react-icons/ri";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  doc,
  addDoc,
  query,
  collection,
  onSnapshot,
  orderBy,
  serverTimestamp,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
interface Todo {
  id: string;
  text: string;
  createdAt: Date | null;
}
function Home() {
  const [task, setTask] = useState("");
  const [newTask, setNewTask] = useState("");

  const [list, setList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const authuser = auth.currentUser;
  if (!authuser?.uid) {
    return;
  }
  const userid = authuser.uid;
  const add = async () => {
    const todosRef = collection(db, "users", userid, "todos");
    setTask("");
    if (!task) {
      toast.dismiss("w");
      toast.error("Type Something!", {
        id: "w",
      });
    } else {
      try {
        await addDoc(todosRef, {
          text: task,
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  const del = async (memoid: string) => {
    try {
      await deleteDoc(doc(db, "users", userid, "todos", memoid));
      toast.success("Deleted!");
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!");
    }
  };
  const edit = async (memoid: string) => {
    try {
      await updateDoc(doc(db, "users", userid, "todos", memoid), {
        text: newTask,
        createdAt: serverTimestamp(),
      });
      toast.success("Changes Saved!");
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!");
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
      <main className="max-w-6xl p-2 m-auto ">
        <BlurFade className=" flex m-auto w-full max-w-sm space-x-2 space-y-4">
          <Input
            className="bg-white"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            placeholder="Type Here"
          />
          <Button
            onClick={add}
            className="cursor-pointer bg-green-800"
            type="submit"
          >
            <FaPlus className="" />
          </Button>
        </BlurFade>
        {/* <div className="flex  m-auto w-full max-w-sm space-x-2 ">
          <div className="flex flex-wrap items-center gap-2 md:flex-row ">
            <Button className="bg-white text-black hover:bg-green-800 hover:text-white">
              <LuCirclePlus />
              My Memo
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:flex-row ">
            <Button className="bg-white text-black hover:bg-green-800 hover:text-white">
              <RiPushpinFill />
              Pin
            </Button>
          </div>
        </div> */}
        {!loading ? (
          list.length > 0 ? (
            <ul className="grid lg:grid-cols-2 gap-4 ">
              {list.map((item, index) => (
                <BlurFade
                  className="bg-white rounded-2xl min-h-50 shadow-xl transition-colors "
                  key={item.id}
                  delay={index * 0.1}
                  inView={true}
                  direction="up"
                >
                  <div className="flex p-4 bg-green-800 text-white rounded h-6 text-xs items-center justify-between  ">
                    <div>
                      <span>
                        {item.createdAt?.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long", // e.g., June
                          day: "numeric",
                        })}{" "}
                        |{" "}
                      </span>
                      <span>
                        {item.createdAt?.toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                    {/* <Modal id={item.id}></Modal> */}
                    <Dialog>
                      <form>
                        <DialogTrigger asChild>
                          <div
                            onClick={() => setNewTask(item.text)}
                            className="cursor-pointer"
                          >
                            Edit
                          </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit </DialogTitle>
                            <DialogDescription>
                              Make changes to your Memo here. Click save when
                              you&apos;re done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label>Text</Label>
                              <Input
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                onClick={() => del(item.id)}
                                variant="outline"
                                className="bg-red-600 text-white hover:bg-red-700 hover:text-white"
                              >
                                Delete
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                onClick={() => edit(item.id)}
                                className="bg-white border border-green-900 text-green-900 hover:bg-green-900 hover:text-white"
                                type="submit"
                              >
                                Save changes
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </form>
                    </Dialog>
                  </div>
                  <div className="p-2">{item.text}</div>
                </BlurFade>
              ))}
            </ul>
          ) : (
            <div className="bg-white font-bold shadow-xl text-center mt-10 rounded-lg text-2xl  h-100 flex justify-center items-center">
              Add one to get started! 📝
            </div>
          )
        ) : (
          <div className="flex h-100 justify-center items-center">
            <span className="loading loading-spinner loading-lg text-green-400"></span>
          </div>
        )}
      </main>
    </>
  );
}
export default Home;
