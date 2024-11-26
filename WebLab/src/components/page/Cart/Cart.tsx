import React, { FC, useEffect, useState } from 'react';
import './Cart.css';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store.config";
import { Link } from "react-router-dom";
import reminderPhoto from "../../../assets/reminder.svg";
import {getCart, getDestinations} from "../../../store";
import CartServices from "../../../services/CartService";
import {Cart} from "../../assets/utils/Cart";

const CartPage: FC = () => {
    const { cart } = useSelector((state: RootState) => state.cartReducer);
    const { destination } = useSelector((state: RootState) => state.destinationReducer);
    const dispatch = useDispatch<AppDispatch>();
    const [quantity, setQuantity] = useState<number>();

    useEffect(() => {
        dispatch(getCart()).then(() => {
            dispatch(getDestinations({
                search: "",
                price: undefined,
                continent: undefined,
                rate: undefined,
                sort: "",
                id: "",
            }));
        });
    }, [dispatch]);

    useEffect(() => {
        console.log(cart);
    }, [cart]);

    const handleItemDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault();
        CartServices.deleteCart(id).then(() => {
            dispatch(getCart());
        });
        console.log(id);
    }

    const handleItemEdit = (e: React.MouseEvent<HTMLButtonElement>, id: string, gap: number) => {
        e.preventDefault();
        const item = cart?.find(item => item.id === id);
        if (item) {
            if (item.amount + gap <= 0){
                alert("Cant go 0 or lower");
                return;
            }
            setQuantity(item.amount + gap);
            CartServices.updateCart(id, { ...item, amount: item.amount + gap, destinationId: item.destination.id }, localStorage.getItem('token') as string).then(() => dispatch(getCart()));
        }
        setQuantity(0);
    }

    const calculateTotalPrice = () => {
        return cart?.reduce((total, item) => {
            const dest = destination?.find(dest => dest.id === item.destination.id);
            const price = dest ? dest.price : 0;
            return total + (price * item.amount);
        }, 0);
    }

    return (
        <section className={"cart"}>
            <h1>Your cart</h1>
            <div className={"cart-items"}>
                {cart && (
                    cart.slice()
                        .sort((a, b) => {
                            const destA = destination?.find(dest => dest.id === a.destination.id)?.title || "";
                            const destB = destination?.find(dest => dest.id === b.destination.id)?.title || "";
                            return destA.localeCompare(destB);
                        }).map((item: Cart) => (
                            <div key={item.id} className={"cart-item"}>
                                <Link to={`/catalog/${item.destination.id}`}><img src={"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"} alt={"Link"} /></Link>
                                <div className={"cart-item-info"}>
                                    <h3>{destination && destination.find(dest => dest.id === item.destination.id)?.title}</h3>
                                    <p>Is Hot: {item.isHot.toString()}</p>
                                </div>
                                <div className={"cart-item-actions"}>
                                    <button className={"quantity-button"} onClick={(e) => handleItemEdit(e, item.id, 1)}>+</button>
                                    <h3>{item.amount}</h3>
                                    <button className={"quantity-button"} onClick={(e) => handleItemEdit(e, item.id, -1)}>-</button>
                                </div>
                                <div className={"cart-item-info"}>
                                    <h3>{destination && (destination.find(dest => dest.id === item.destination.id)?.price ?? 0) * item.amount} $</h3>
                                </div>
                                <button className={"delete-button"} onClick={(e) => handleItemDelete(e, item.id)}>x</button>
                            </div>
                        ))
                )}
            </div>
            <h2 className={"total-price"}>Total price: {calculateTotalPrice()} $</h2>
            <div className={"cart-navigation"}>
                <Link to={"/catalog"}>Back to catalog</Link>
                <Link to={'/checkout'}>Continue</Link>
            </div>
        </section>
    );
};

export default CartPage;