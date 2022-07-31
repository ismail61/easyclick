
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";

export default function HeroSlider({ banners }) {

  const PrevArrowButton = (props) => {
    const { className, onClick } = props
    return (<div
      className={className}
      onClick={onClick}>
      <i className={`fa-chevron-right`}></i>
    </div>)
  }
  const NextArrowButton = (props) => {
    const { className, onClick } = props
    return (
      <div className={className} onClick={onClick}>
        Next
      </div>
    )
  }

  const settings = {
    dots: true,
    lazyLoad: true,
    autoplay: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrowButton />,
    nextArrow: <NextArrowButton />,
    customPaging: (index) => {
      return <div></div>
    },
    dotsClass: 'slick-dots custom-indicator'
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {
          banners?.length !== 0 ? banners?.map((banner, index) => {
            return (
              <span key={index}>
                <Link passHref href={banner?.redirect_url || '/'}>
                  <div>
                    {
                      banner?.redirect_url &&
                      <Image
                        src={banner?.image?.url}
                        width="100%"
                        height="40%"
                        layout="responsive"
                        objectFit="contain"
                        alt="Banner Image"
                      />
                    }
                  </div>
                </Link>
              </span>
            )
          }) : null
        }
      </Slider>
    </div>
  );
}