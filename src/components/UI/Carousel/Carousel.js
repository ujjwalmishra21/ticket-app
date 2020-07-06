import React, {Component} from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';
import Slider from 'react-slick';
import Aux from '../../../hoc/Aux/Aux';

class Carousel extends Component {

  render() {
    var settings = {
      dots: true,
      infinite: true,
      autoplay:true,
      speed: 500,
      autoplaySpeed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    let slider = null;
    if(this.props.data.length > 0){
         slider = (
        <Slider {...settings}>
            {
                this.props.data.map(slide => {
                    
                    return (
                        <div className='slide'>
                            <div className='image-slide'>
                                <img src={slide.image} alt={slide.text} className='image'/>
                            </div>
                            <div className='text-slide'>
                                {slide.text}
                            </div>
                            
                        </div>
                    )
                })
            }
       
        </Slider>
        );
    }


    return (
        <Aux>
            {slider}
        </Aux>
    );
  }
}

export default Carousel;