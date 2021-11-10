import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        let i,len = state.items.length;
        console.log(state.items);
        console.log(state.totalAmount);
        for(i = 0 ;i < len; ++i) {
            if(state.items[i].id === action.item.id){
                state.items[i].amount += action.item.amount;
                break;
            }
        }

        console.log(action);

        if(i === len){
            state.items.push(action.item);
            console.log(state.items);
            state.totalAmount = state.totalAmount + (action.item.amount*action.item.price);
            console.log(state.totalAmount);
        }
        
        const updatedItems = state.items;
        const updatedAmount = state.totalAmount;
        return {
            items: updatedItems,
            totalAmount: updatedAmount
        };
    }

    if(action.type === 'REMOVE') {
        state.items.filter((item) => item.id !== action.id);
        state.totalAmount = state.items.reduce((tot, item) => {
            return tot = tot + (item.amount*item.price);
        },0)

        const updatedItems = state.items;
        const updatedAmount = state.totalAmount;
        return {
            items: updatedItems,
            totalAmount: updatedAmount
        };
    }

    return defaultCartState;
};

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addNewItemFunc = (item) => {
        dispatchCartAction({
            type: 'ADD',
            item: item
        })
    };

    const removeItemFunc = (id) => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id
        })
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addNewItemFunc,
        removeItem: removeItemFunc
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;