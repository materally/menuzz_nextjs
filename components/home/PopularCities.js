import Link from "next/link";
import Image from "next/image";
import { API_URL } from "../../service/api";

const PopularCities = ({ popularCities }) => {
  const renderCities = () => {
    return (
      popularCities.length > 0 &&
      popularCities.map((c, index) => {
        if (c.image_url) {
          return (
            <div className="col-md-3 col-6" key={index}>
              <div className="IndexCity products-box">
                <Link href={`/city/${c.url}`} passHref>
                  <a>
                    <Image
                      src={`${API_URL}city/${c.image_url}`}
                      className="img-fluid bordered"
                      alt={`${c.city_name} napi menü, heti menü`}
                      layout="fill"
                    />
                    <div className="IndexCity__City">
                      <h6 className="IndexCity__H6">{c.city_name}</h6>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          );
        }
      })
    );
  };

  return (
    <section className="section pt-5 pb-5 bg-white homepage-add-section">
      <div className="container">
        <div className="row">{renderCities()}</div>
      </div>
    </section>
  );
};

export default PopularCities;
