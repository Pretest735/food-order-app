import {Fragment} from 'react';
import classes from './Header.module.css';
import foodImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>React meals</h1>
                <HeaderCartButton showCart={props.showCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={foodImage} alt="Foods" />
            </div>
        </Fragment>
    )
};

export default Header;