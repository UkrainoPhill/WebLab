import React, {FC, useEffect, useState} from 'react';
import './CartElement.css';

interface CartElementProps{
    title: string,
    price: number,
    amount: number,
    isHot: boolean
}

const CartElement: FC<CartElementProps> = (props) => {
    const [amount, setAmount] = useState(props.amount);
    const [price, setPrice] = useState(0);
    const handlePlus = () => {
        setAmount(amount + 1);
    }
    const handleMinus = () => {
        setAmount(amount - 1);
    }
    useEffect(() => {
        setPrice(props.price * amount);
    }, [amount, props.price]);

    return (
        <div>
            <img src={"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"} alt={"Cart Element Image"}/>
            <h2>{props.title}</h2>
            <div>
                <button onClick={handlePlus}>+</button>
                <h2>{amount}</h2>
                <button onClick={handleMinus}>-</button>
            </div>
            <h2>{price}</h2>
        </div>
    );
};

export default CartElement;