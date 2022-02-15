import React from "react";
import Link from "next/link";
import Image from "next/image";

// Components
import styles from "./RestaurantItem.module.css";

const RestaurantItem = (props) => {
  const menu_url = props.menu_url;

  return (
    <div className={"col-md-3 col-sm-6 mb-4 pb-2 " + styles.RestaurantItem}>
      <div className="list-card bg-white h-100 rounded overflow-hidden position-relative">
        <div className="list-card-image">
          {props.delivery === "1" && (
            <div className="star position-absolute">
              <span className="badge badge-success">
                <i className="fas fa-truck"></i> KISZÁLLÍTÁS
              </span>
            </div>
          )}
          <div className="favourite-heart text-danger position-absolute">
            <a href={"tel: " + props.phone}>
              <i className="fas fa-phone"></i> {props.phone}
            </a>
          </div>
          {menu_url !== null && menu_url !== undefined && menu_url !== "" && (
            <div className="member-plan position-absolute z-index-9999">
              <a href={menu_url} rel="noreferrer" target="_blank">
                <span className="badge badge-primary">
                  <i className="fas fa-utensils"></i> MENÜ
                </span>
              </a>
            </div>
          )}

          <div className="carousel-image-wrapper" style={{ cursor: "pointer" }}>
            <Link href={`/etterem/${props.slug}`} passHref>
              <Image
                src={props.image}
                className="carousel-image-img img-fluid"
                title={`${props.name} napi menü, heti menü`}
                alt={`${props.name} napi menü, heti menü`}
                layout="fill"
              />
            </Link>
          </div>
        </div>
        <div className="p-3 position-relative">
          <div className="list-card-body">
            <h6 className="mb-1">
              <Link
                href={`/etterem/${props.slug}`}
                className="text-black"
                passHref
              >
                {props.name}
              </Link>
            </h6>
            <p className="text-gray mb-3">
              {props.address.street} {props.address.address}
            </p>
            <p className="text-gray mb-3 time">
              <span
                className={props.menuHour.classname}
                style={{ padding: 5, borderRadius: 5 }}
              >
                <b>MENÜ</b> {props.menuHour.time}
              </span>
            </p>
          </div>
          <div className="list-card-badge" style={{ textAlign: "right" }}>
            {
              <span className={props.openHour.classname}>
                {props.openHour.time}
              </span>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
