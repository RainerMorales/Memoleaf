import { useState } from "react"
import { Button } from "./components/ui/button";
function Hooks(){

    const [color, Setcolor] = useState(0);
    return (
      <>
        <div>My crush is {color}</div>
        <Button
          className="btn"
          type="button"
          onClick={() => Setcolor(color +1)}
        >
          click
        </Button>
      </>
    );
}
export default Hooks  