import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const cartContext = useContext(CartContext);

    const totalItems = cartContext.items.reduce((tot, item) =>{
        return tot = tot + item.amount
    }, 0);
    
    return (
        <button className={classes.button} onClick={props.showCart} >
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{totalItems}</span>
        </button>
    );
}

export default HeaderCartButton;