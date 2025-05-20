import { useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { auth } from "@/firebase";
import { doc, deleteDoc } from "firebase/firestore";

import { db } from "@/firebase";
import { Item } from "@radix-ui/react-dropdown-menu";
function Modal() {
    const authuser=auth.currentUser;
  const modalRef = useRef<HTMLDialogElement>(null);
  const openmodal = () => {
    if (modalRef.current) {
      modalRef.current?.showModal();
    }
  
  };
  const deleteTask=async()=>{
    if(!authuser){
        return
    }
    const userid=authuser.uid
    const todosRef=doc(db,"users",userid,"todos",id)
    try{
        await deleteDoc(todosRef)
    }catch(err){
        console.log(err)
    }
  }
  return (
    <>
      <button className="cursor-pointer" onClick={openmodal}>
        <BsThreeDots size={20} />
      </button>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box bg-zinc-900 rounded">
          <h3 className="font-bold text-lg text-center">Are you sure you want to delete?</h3>
          <div className="modal-action justify-center items-center">
            <form method="dialog" className="space-x-4">
              <button onClick={()=>deleteTask(item.id)} className="btn bg-teal-600 border-none rounded-lg text-white">Yes</button>
              <button className="btn bg-teal-600 border-none rounded-lg text-white">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Modal;
