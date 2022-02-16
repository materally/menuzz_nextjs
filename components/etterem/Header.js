import React from "react";
import Image from "next/image";

import styles from "./Etterem.module.css";
// Components

const Header = (props) => {
  const { data } = props;
  const { zip, city, street, address } = data.address;
  const headerImage =
    data.images && data.images.length > 0
      ? data.images[0].image
      : process.env.NEXT_PUBLIC_BASE_URL + "img/hero.jpeg";

  return (
    <section className="restaurant-detailed-banner">
      <div
        style={{
          backgroundImage: "url(" + headerImage + ")",
          height: "424px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div className="restaurant-detailed-header">
          <div className="container">
            <div className="row d-flex align-items-end">
              <div className="col-md-8">
                <div className="restaurant-detailed-header-left">
                  <Image
                    className="img-fluid mr-3 float-left"
                    alt={data.name}
                    src={data.logo_file}
                    width={100}
                    height={100}
                  />
                  <h2 className="text-white">{data.name}</h2>
                  <p className="text-white mb-1" style={{ fontSize: 14 }}>
                    <i className="fas fa-map-marker-alt"></i> {zip} {city}{" "}
                    {street} {address}{" "}
                    <a
                      href={
                        "https://www.google.com/maps/search/?api=1&query=" +
                        zip +
                        "+" +
                        city +
                        "+" +
                        street +
                        "+" +
                        address
                      }
                      target="_blank"
                      style={{ marginLeft: 5, fontSize: 14 }}
                      className={`badge badge-primary ${styles.maps_link}`}
                      rel="noopener noreferrer"
                    >
                      útvonal
                    </a>
                  </p>
                  <p className={`text-white mb-0`}>
                    <span className={`${props.menuHour.classname} p-1 rounded`}>
                      <i className="fas fa-utensils"></i> <b>MENÜ</b>{" "}
                      {props.menuHour.time}
                    </span>
                  </p>
                </div>{" "}
                {/* restaurant-detailed-header-left */}
              </div>
              <div className="col-md-4">
                <div className="restaurant-detailed-header-right text-right">
                  <span
                    className={props.openHour.classname}
                    style={{ cursor: "auto", fontWeight: "bold", fontSize: 20 }}
                  >
                    {props.openHour.time}
                  </span>

                  {data.delivery.can_order === "1" && (
                    <h6 className="text-white mb-0 restaurant-detailed-ratings">
                      <span
                        className="rounded text-white"
                        style={{
                          backgroundColor: "#3ecf8e",
                          padding: 5,
                          fontSize: 12,
                        }}
                      >
                        <i className="fas fa-truck"></i> KISZÁLLÍTÁS
                      </span>
                    </h6>
                  )}
                </div>{" "}
                {/* restaurant-detailed-header-right */}
              </div>
            </div>
          </div>{" "}
          {/* container */}
        </div>{" "}
        {/* restaurant-detailed-header */}
      </div>
    </section>
  );
};

export default Header;
