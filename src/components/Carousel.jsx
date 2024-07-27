
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';

const MyCarousel = () => {
  const items = [
    {
      headline: "Color My Dreams",
      size: "9 W x 9 H x 0.1 D in",
      artist:"Pranab Phauzdar",
      price:"Rs.2,10,220",
      
      image: image1,
    },
    {
        headline: "Color My Dreams",
        size: "9 W x 9 H x 0.1 D in",
        artist:"Pranab Phauzdar",
        price:"Rs.2,10,220",
      image: image2,
    },
    {
        headline: "Color My Dreams",
        size: "9 W x 9 H x 0.1 D in",
        artist:"Pranab Phauzdar",
        price:"Rs.2,10,220",
      image: image3,
    },
    {
        headline: "Color My Dreams",
        size: "9 W x 9 H x 0.1 D in",
        artist:"Pranab Phauzdar",
        price:"Rs.2,10,220",
      image: image4,
    },
    {
        headline: "Color My Dreams",
        size: "9 W x 9 H x 0.1 D in",
        artist:"Pranab Phauzdar",
        price:"Rs.2,10,220",
      image: image5,
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={responsive}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {items.map((item, index) => (
        <div key={index} className="p-4">
          <div className=''><img src={item.image} alt={item.headline} className="w-full h-56 object-cover rounded-md shadow-lg" /></div>
          <div>
            <div>
                <h2 className="text-base font-semibold mt-2">{item.headline}</h2>
                <p className="text-sm text-gray-600">{item.size}</p>
            </div>
            <div>
                <h2 className="text-sm mt-2">{item.artist}</h2>
                <p className="text-sm text-gray-600">{item.price}</p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default MyCarousel;
