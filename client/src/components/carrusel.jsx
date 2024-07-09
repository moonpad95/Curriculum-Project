import React, { useState } from 'react';
import './Carousel.css';

const Carousel = ({ items }) => {
    // const [currentIndex, setCurrentIndex] = useState(0);

    // const goToSlide = (index) => {
    //     setCurrentIndex(index);
    // }

    // const prevSlide = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    // }

    // const nextSlide = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    // }

    return (
        <div className="carousel-container">
            {/* <div className="carousel">
                {items.map((item, index) => (
                    <div key={index} className={index === currentIndex ? 'carousel-item active' : 'carousel-item'}>
                        {item}
                    </div>
                ))}
            </div>
            <button className="prev-button" onClick={prevSlide}>Anterior</button>
            <button className="next-button" onClick={nextSlide}>Siguiente</button> */}
            <p>
                PROXIMAMENTE, EDICION DE DOCUMENTOS
            </p>
        </div>
    );
}

export default Carousel;
