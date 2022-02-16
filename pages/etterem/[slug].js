import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import { FacebookProvider, Page } from "react-facebook";

import API, { API_SECRET } from "../../service/api";
import { menuHours, openHours } from "../../service";

import Header from "../../components/etterem/Header";
import Ratings from "../../components/etterem/Ratings";
import Info from "../../components/etterem/Info";
import GoogleAds from "../../components/etterem/GoogleAds";
import MenuHours from "../../components/etterem/MenuHours";
import OpenHours from "../../components/etterem/OpenHours";

export default function Etterem({ restaurant }) {
  const router = useRouter();
  const { slug } = router.query;
  const r = restaurant;
  const menuHour = menuHours.todayMenuHours(r.menu_hours);
  const openHour = openHours.todayOpenHours(r.opening_hours, "header");

  return (
    <div>
      <Head>
        <title>
          {r.name} {r.address.city} menü rendelés
        </title>
        <meta
          name="description"
          content={`${r.name} napi menü, ${r.name} heti menü, ${r.name} menü rendelés`}
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}etterem/${slug}`}
        />
        <meta
          property="og:title"
          content={`${r.name} ${r.address.city} menü rendelés`}
        />
        <meta
          property="og:description"
          content={`${r.name} napi menü, ${r.name} heti menü, ${r.name} menü rendelés`}
        />
        <meta
          property="og:url"
          href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}etterem/${slug}`}
        />
        <meta property="og:image" content={r.logo_file} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header data={r} menuHour={menuHour} openHour={openHour} />
      <section className="offer-dedicated-nav bg-white border-top-0 shadow-sm">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul className="nav" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="pills-info-tab"
                    data-toggle="pill"
                    href="#pills-info"
                    role="tab"
                    aria-controls="pills-info"
                    aria-selected="true"
                  >
                    Étterem információk
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="pills-ratings-tab"
                    data-toggle="pill"
                    href="#pills-ratings"
                    role="tab"
                    aria-controls="pills-ratings"
                    aria-selected="false"
                  >
                    Értékelések
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section
        className="offer-dedicated-body pt-4 pb-4"
        style={{ backgroundColor: "#F3F7F8" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="offer-dedicated-body-left">
                <div className="tab-content" id="pills-tabContent">
                  <Info data={r} />
                  <Ratings slug={r.slug} />
                </div>{" "}
                {/* tab-content */}
              </div>{" "}
              {/* offer-dedicated-body-left */}
            </div>{" "}
            {/* col-md-8 */}
            <div className="col-md-4">
              <GoogleAds />
              <p style={{ textAlign: "center" }}>
                <Link href={"/city/" + r.address.city} passHref>
                  <a>
                    további éttermek <b>{r.address.city}</b> területén
                  </a>
                </Link>
              </p>

              {r.contact.facebook && (
                <div style={{ textAlign: "center", paddingBottom: 20 }}>
                  <FacebookProvider appId="1613042828876052">
                    <Page href={r.contact.facebook} tabs="timeline" />
                  </FacebookProvider>
                </div>
              )}

              <MenuHours menu_hours={r.menu_hours} />
              <OpenHours open_hours={r.opening_hours} />
              {/* <LocalAds /> */}
            </div>{" "}
            {/* col-md-4 */}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await API.get(`restaurant`, {
    params: { API_SECRET: API_SECRET },
  });
  const restaurants = await res.data;
  const paths = restaurants.map((r) => ({ params: { slug: r.slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const restaurant = params.slug;
  const res = await API.get(`restaurant/${restaurant}`, {
    params: { API_SECRET: API_SECRET },
  });
  const rest = await res.data;

  return {
    props: {
      restaurant: rest,
    },
    revalidate: 10,
  };
}
