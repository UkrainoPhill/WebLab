import React, {useEffect, useState} from 'react';
import './ItemPage.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Destination} from "../../assets/utils/Destination";
import DestinationServices from "../../../services/DestinationServices";
import Select from "../../common/Select/Select";
import PrimaryButton from "../../common/PrimaryButton/PrimaryButton";
import CartServices from "../../../services/CartService";
import {CartDto} from "../../assets/utils/Cart";

const ItemPage = () => {
    const {id} = useParams<{ id: string }>();
    const [destination, setDestination] = useState<Destination | null>(null)
    const [continent, setContinent] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [isHot, setIsHot] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        try {
            if (id != null) {
                DestinationServices.getDestinations({id: id}).then(({data}) => setDestination(data[0]));
            }
        } catch (e) {
        }
    }, [id]);


    useEffect(() => {
        if (destination) {
            switch (destination.continent) {
                case 0:
                    setContinent("Africa");
                    break;
                case 1:
                    setContinent("Asia");
                    break;
                case 2:
                    setContinent("Europe");
                    break;
                case 3:
                    setContinent("North America");
                    break;
                case 4:
                    setContinent("South America");
                    break;
                case 5:
                    setContinent("Australia");
                    break;
                case 6:
                    setContinent("Antarctica");
                    break;
                default:
                    setContinent("");
            }
        }
    }, [destination]);

    if (!destination) {
        return <div className='item-page'>Destination not found</div>;
    }
    const handleCreateCart = async () => {
        if (id === undefined){
            alert("Bug");
            return;
        } else if (amount === undefined){
            alert("Bug");
            return;
        } else if (isHot === undefined){
            alert("Bug");
            return;
        }
        if (amount < 0 || amount % 1 !== 0 ){
            alert("Wrong number");
            return;
        }
        const dto: CartDto = {
            destinationId: id,
            amount: amount,
            isHot: isHot,
        }
        await CartServices.createCart(dto, localStorage.getItem('token') as string);
        alert("Created");
    }

    return (
        <section className='item-page'>
            <div className='info'>
                <img className='avatar' src={destination.image} alt={destination.title}/>
                <div className='details'>
                    <div className='filters'>
                        <div className='rate-item-page'>Rate: {destination.rate}</div>
                        <div className='continent-item-page'>Continent: {continent}</div>
                    </div>
                    <h1 className={'title-item-page'}>{destination.title}</h1>
                    <p className={'description-item-page'}>{destination.description}</p>
                    <p className={'price-item-page'}>Price: {destination.price} $</p>
                    <p className={'last-updated-item-page'}>Last Updated: {destination.last_updated.slice(0, 10)}</p>
                    <div className={"select-item-page"}>
                        <input type={"number"} className={"input-number-item-page"} placeholder={"Amount"} onChange={e => {setAmount(Number(e.target.value))}}/>
                        <Select name={"Is Hot"} options={[["True", "True"], ["False", "False"]]} onChange={e => {
                            if (e.target.value === "True"){
                                setIsHot(true);
                            }
                            else if (e.target.value === "False"){
                                setIsHot(false);
                            }
                        }}/>
                    </div>
                    <div>
                        <div className={'navigation-item-page'}>
                            <button className={"create_button-cart"} onClick={handleCreateCart}>Create Button</button>
                            <Link to={'..'} className='go-back-button' onClick={(e) => {e.preventDefault();
                            navigate(-1)}}>Go Back</Link>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default ItemPage;