function  Footer(){
    const year = new Date().getFullYear()
    return (
      <>
        <footer className="h-10 fixed bottom-0 w-full ">
          <div className="text-center opacity-60 text-xs">
            Developed by Rainer Morales | v1.0 &copy; {year}
          </div>
        </footer>
      </>
    );
}
export default Footer