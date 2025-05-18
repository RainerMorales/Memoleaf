function  Footer(){
    const year = new Date().getFullYear()
    return (
      <>
        <footer className="h-10 fixed bottom-0 w-full ">
          <h1 className="text-white text-center opacity-60 text-sm">Developed by Rainer Morales &copy; {year}</h1>
        </footer>
      </>
    );
}
export default Footer