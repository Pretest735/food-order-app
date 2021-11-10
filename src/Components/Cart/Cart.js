import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';

const Cart = (props) => {
    const cartContext = useContext(CartContext);

    const cartItems=(
    <ul className={classes['cart-items']}>{
        cartContext.items.map((item) =>
            (<li key={item.id}>{item.name}</li>
        ))}
    </ul>);

    const totalPrice = cartContext.items.reduce((tot, item) => {
        return tot = tot + (item.amount*item.price);
    }, 0 )
    return (
        <Modal closeCart={props.closeCart}>
            {cartItems}
            <div className={classes.total}>Total</div>
            <div>{totalPrice}$</div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.closeCart}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
}

export default Cart;