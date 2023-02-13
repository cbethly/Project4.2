import { selectFields } from 'express-validator/src/select-fields';
import Carousel from 'react-bootstrap/Carousel';

function Slider({slides}) {
  return (
    <Carousel>
     {slides.map((slide) => {
        // <img className='d-block w-100' src='' alt="" />
        <Carousel.Caption>
            <h3>{slides.title}</h3>
            <p>{slides.subTitle}</p>
        </Carousel.Caption>

     })}
    </Carousel>
  );
}

export default Slider;