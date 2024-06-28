import { useState } from "react";

export const useCounts = (initial, min, max) => {
    
    let [count, setCount] = useState(initial);


    const handleRestar = () => {
        if (count > min) setCount((prev) => prev - 1);
    }

    const handleSumar = () => {
        if (count < max) setCount((prev) => prev + 1);
    }

    const handleReset = () => {
        setCount(initial)
    }

  return { count, handleRestar, handleReset, handleSumar }
  
}



