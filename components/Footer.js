import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { FacebookProvider, Page } from "react-facebook";

import API, { API_SECRET } from "../service/api";

const Footer = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    API.get(`home/home_cities`, { params: { API_SECRET: API_SECRET } })
      .then((res) => {
        setCities(res.data);
      })
      .catch((error) => console.log("Error: " + error));
  }, []);

  const renderCities = () => {
    return (
      cities.length > 0 &&
      cities.map((c, index) => (
        <Fragment key={index}>
          <Link href={`/city/${c.url}`}>{c.city_name}</Link> |{" "}
        </Fragment>
      ))
    );
  };

  return (
    <Fragment>
      <section className="footer pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-12 col-sm-12">
              <h6 className="mb-3">Éttermed van?</h6>
              <p>
                Írj nekünk a <Link href="/contact">Kapcsolatfelvétel</Link>{" "}
                menüpont alatt bármilyen kérdés, kérés esetén és felvesszük
                Veled a kapcsolatot!
              </p>
            </div>
            <div className="col-md-4 col-sm-6">
              <h6 className="mb-3" style={{ textAlign: "center" }}>
                Rólunk
              </h6>
              <ul style={{ textAlign: "center" }}>
                <li>
                  <Link href="/contact">Kapcsolatfelvétel</Link>
                </li>
              </ul>
            </div>
            <div
              className="col-md-4 col-sm-12 col-xs-12"
              style={{ textAlign: "center" }}
            >
              <FacebookProvider appId="1613042828876052">
                <Page href="https://www.facebook.com/menuzzhu" />
              </FacebookProvider>
            </div>
          </div>
        </div>
      </section>
      <section className="footer-bottom-search pt-4 pb-4 bg-white">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <p className="text-black">VÁROSOK</p>
              <div className="search-links">{renderCities()}</div>
            </div>
          </div>
        </div>
      </section>
      <footer className="pt-4 pb-4 text-center">
        <div className="container">
          <p className="mt-0 mb-0">&copy; Minden jog fenntartva! - Menuzz.hu</p>
          <p>
            <small className="mt-0 mb-0">
              {" "}
              Verzió: 3.0 - 2022.03.01. -{" "}
              <Link href="/privacy">Adatvédelmi nyilatkozat</Link>
            </small>
          </p>
          <p>
            <small className="mt-0 mb-0">
              {" "}
              Az esetleges elírásokért felelősséget nem vállalunk!
            </small>
          </p>
          <p>
            <small className="mt-0 mb-0">
              {" "}
              Powered by{" "}
              <a
                href="https://kulcsarcodes.hu"
                target="_blank"
                rel="noreferrer"
              >
                Kulcsar Codes
              </a>
            </small>
          </p>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
