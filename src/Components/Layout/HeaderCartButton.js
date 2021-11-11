import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const cartContext = useContext(CartContext);
    const [isButtonHighlighted, setIsButtonHighlighted] = useState(false);

    const {items} = cartContext;

    const totalItems = items.reduce((tot, item) =>{
        return tot = tot + item.amount
    }, 0);
    
    const btnClasses = `${classes.button} ${isButtonHighlighted ? classes.bump: ''}`;

    useEffect(() => {
        if(items.length === 0) return;
        
        setIsButtonHighlighted(true);

        const timer = setTimeout(() => {
            setIsButtonHighlighted(false);
        }, 300)

        return () => {
            clearTimeout(timer);
        }
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.showCart} >
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{totalItems}</span>
        </button>
    );
}

export default HeaderCartButton;