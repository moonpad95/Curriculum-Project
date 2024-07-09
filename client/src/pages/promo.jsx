import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from '../components/carrusel';

const Promo = () => {
    const items = ["Contenido 1", "Contenido 2"];

    return (
        <div>
            <h1>Mi Carrusel</h1>
            <Carousel items={items} />
        </div>
    );
}
export default Promo;
ReactDOM.render(<Promo />, document.getElementById('root'));

