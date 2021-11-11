import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
    const cartContext = useContext(CartContext);
    const addItemToCartFunc = (item) => {
        cartContext.addItem({...item, amount:1});
    }

    const removeItemFromCartFunc = (id) => {
        console.log("removal id: ",id);
        cartContext.removeItem(id);
    }

    const cartItems=(
    <ul className={classes['cart-items']}>{
        cartContext.items.map((item) =>
            (<CartItem
                key={item.id} 
                name={item.name}
                amount={item.amount}
                price={item.price}
                onAdd={addItemToCartFunc.bind(null,item)}
                onRemove={removeItemFromCartFunc.bind(null, item.id)}
            />
        ))}
    </ul>);
    
    return (
        <Modal closeCart={props.closeCart}>
            {cartItems}
            <div className={classes.total}>Total</div>
            <div>{cartContext.totalAmount.toFixed(2)}$</div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.closeCart}>Close</button>
                <button className={classes.button} disabled={!cartContext.items.length}>Order</button>
            </div>
        </Modal>
    );
}

export default Cart;