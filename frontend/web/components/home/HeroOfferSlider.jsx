import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export default function HeroOfferSlider({ campaigns }) {
  const PrevArrowButton = (props) => {
    const { className, onClick } = props
    return (
      <div
        className={className}
        onClick={onClick}>
        <i className={`fa-light fa-chevron-right text-white`}></i>
      </div>
    )
  }

  const NextArrowButton = (props) => {
    const { className, onClick } = props
    return (<div className={className} onClick={onClick} style={{ color: 'white' }}>Next</div>)
  }

  const settings = {
    dots: false,
    lazyLoad: true,
    autoplay: true,
    infinite: true,
    speed: 300,
    slidesToShow: campaigns?.length ? (campaigns?.length < 4 ? campaigns?.length : 4) : 0,
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
      {
        campaigns?.length ? <Slider {...settings}>
          {
            campaigns?.length && campaigns?.map((campaign, index) => {
              return (
                <div key={index}>
                  <div className="bg-white my-4 mx-1 p-1 rounded-lg shadow-md flex flex-col">
                    <div className="h-32 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${campaign?.image?.url})`, backgroundSize: '100% 100%' }}></div>
                    <p className="font-semibold text-center mt-1">Offer: {campaign?.discount || 0}%</p>
                    <Link passHref href={`/campaign/${campaign?._id}`}>
                      <button className="bg-[#D23E41] text-white px-2 py-1 text-sm mt-1">Details</button>
                    </Link>
                  </div>
                </div>
              )
            })
          }
        </Slider> : <center className="my-3 text-white">Campaigns Not Found!.Wait for this. </center>
      }

    </div>
  );
}