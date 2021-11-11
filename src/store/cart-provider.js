import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount + (action.item.amount * action.item.price);
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        
        let updatedItems;
        if(existingCartItem) {
            const updateItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updateItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        // let i,len = state.items.length;
        // console.log(state.items);
        // console.log(state.totalAmount);
        // for(i = 0 ;i < len; ++i) {
        //     if(state.items[i].id === action.item.id){
        //         state.items[i].amount += action.item.amount;
        //         break;
        //     }
        // }

        // console.log(action);

        // if(i === len){
        //     state.items.push(action.item);
        //     console.log(state.items);
        //     state.totalAmount = state.totalAmount + (action.item.amount*action.item.price);
        //     console.log(state.totalAmount);
        // }

        console.log("updateditems", updatedItems);
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if(action.type === 'REMOVE') {

        let updatedItems = [...state.items];
        console.log("updated items: ", updatedItems);

        let cartIndex = updatedItems.findIndex((item) => item.id === action.id);
        --updatedItems[cartIndex].amount;
        console.log("cart index: ", cartIndex);
        console.log("cart item amount: ", updatedItems[cartIndex]);

        if(updatedItems[cartIndex].amount === 0){
            updatedItems.splice(cartIndex,1);
        }

        console.log("updated items: ", updatedItems);
        const updatedAmount = updatedItems.reduce((tot, item) => {
            return tot = tot + (item.amount*item.price);
        }, 0);
        console.log("updated amount after removal: ",updatedAmount);
        
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