function  Footer(){
    const year = new Date().getFullYear()
    return (
      <>
        <footer className=" p-2 fixed bottom-0 w-full ">
          <h1 className="text-white text-center opacity-60 text-sm">Developed by Rainer &copy; {year}</h1>
        </footer>
      </>
    );
}
export default Footer