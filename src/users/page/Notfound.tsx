import { Link } from "react-router-dom"
function Notfound(){
    return (
      <>
        <div className="h-screen flex flex-col gap-4 items-center justify-center ">
          <h1 className="text-4xl">404 Not Found</h1>
          <Link className=" text-zinc-300" to={"/"}>Go Back</Link>
        </div>
      </>
    );
}
export default Notfound