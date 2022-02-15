import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import { menuHours } from "../../service/menuhours";

const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const LatestRestaurants = ({ latestRestaurants }) => {
  const renderLatestRestaurants = () => {
    return (
      latestRestaurants.length > 0 &&
      latestRestaurants.map((r, index) => {
        const menuHour = menuHours.todayMenuHours(r.menu_hours);
        return (
          <div className="item" key={index} style={{ padding: 10 }}>
            <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
              <div className="carousel-image-wrapper">
                <Link href={`/restaurant/${r.slug}`} passHref>
                  <Image
                    src={`${r.logo_file}`}
                    className="carousel-image-img img-fluid"
                    alt={`${r.name} napi menü, heti menü`}
                    layout="fill"
                  />
                </Link>
              </div>
              <div className="p-3 position-relative">
                <div className="list-card-body">
                  <h6 className="mb-1">
                    <Link
                      href={`/restaurant/${r.slug}`}
                      className="text-black"
                      passHref
                    >
                      {r.name}
                    </Link>
                  </h6>
                  <p className="text-gray mb-3">
                    {r.address.city} {r.address.street} {r.address.address}
                  </p>
                  <p className="text-gray mb-3 time">
                    <span
                      className={menuHour.classname}
                      style={{ padding: 5, borderRadius: 5 }}
                    >
                      <b>MENÜ</b> {menuHour.time}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })
    );
  };

  return (
    <section className="section pt-5 pb-5 products-section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Legújabb éttermek</h2>
          <p>Frissen feltöltött menüzős éttermek a Menüzz.hu rendszerébe</p>
          <span className="line"></span>
        </div>{" "}
        {/* section-header text-center */}
        <div className="row">
          <div className="col-md-12">
            <OwlCarousel
              className="owl-carousel-category owl-theme"
              margin={10}
              items={4}
              {...options}
            >
              {renderLatestRestaurants()}
            </OwlCarousel>
          </div>
        </div>{" "}
        {/* row */}
      </div>{" "}
      {/* container */}
    </section>
  );
};

const options = {
  autoplay: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 4,
    },
    1200: {
      items: 4,
    },
  },
};

export default LatestRestaurants;
