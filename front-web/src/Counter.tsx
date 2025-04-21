import { useState } from "react";

function Counter() {
    const [counter, setCounter] = useState(0);

    const handleIncrease = () => {
        setCounter(counter + 1);
    }

    const handleDecrease = () => {
        setCounter(counter - 1);
    }


    return (
        <div>
            <button onClick={handleIncrease}>Incrementar</button>
            <button onClick={handleDecrease}>Decrementar</button>
            <h2>Valor do contador: {counter}</h2>
        </div>
    )
}

export default Counter;