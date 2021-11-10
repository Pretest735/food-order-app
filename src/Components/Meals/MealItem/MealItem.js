import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
    const cartContext = useContext(CartContext);

    const addItemToCart = (amount) => {
        cartContext.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            description: props.description,
            price: props.price
        });
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description} >{props.description}</div>
                <div className={classes.price}>{props.price}</div>
            </div>
            <MealItemForm 
                id={props.id}
                onAddToCart={addItemToCart}
            />
        </li>
    );
}

export default MealItem;