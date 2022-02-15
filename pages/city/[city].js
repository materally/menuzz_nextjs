import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import AdSense from "react-adsense";

import API, { API_SECRET } from "../../service/api";

import Restaurants from "../../components/city/Restaurants";
import Filter from "../../components/city/Filter";

export default function City({ restaurants }) {
  const router = useRouter();
  const { city } = router.query;
  let now = moment();
  let nowDay = moment().format("dddd").toLowerCase();
  let day_start = nowDay + "_open_at";
  let day_stop = nowDay + "_close_at";
  let day_start_menu = nowDay + "_start";
  let day_stop_menu = nowDay + "_stop";
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [menuFilter, setMenuFilter] = useState(false);

  const handleSearchInput = (val) => {
    setSearch(val);
    const fData = restaurants.filter((element) => {
      return element.name.toLowerCase().includes(val.toLowerCase());
    });
    return setFilteredRestaurants(fData);
  };

  useEffect(() => {
    if (deliveryFilter || openFilter || menuFilter) {
      let newData = restaurants.filter(function (r) {
        let open_at = moment(r.opening_hours[day_start], "hh:mm:ss");
        let close_at = moment(r.opening_hours[day_stop], "hh:mm:ss");
        let start_at = moment(r.menu_hours[day_start_menu], "hh:mm:ss");
        let stop_at = moment(r.menu_hours[day_stop_menu], "hh:mm:ss");
        return (
          (deliveryFilter ? r.delivery.can_order === "1" : 1) &&
          (openFilter ? now.isBetween(open_at, close_at) : 1) &&
          (menuFilter ? now.isBetween(start_at, stop_at) : 1)
        );
      });
      setFilteredRestaurants(newData);
    } else {
      setFilteredRestaurants(restaurants);
    }
  }, [deliveryFilter, openFilter, menuFilter, restaurants]);

  const renderSEORestaurants = () => {
    return restaurants.map((r) => (
      <Link key={r.restaurant_id} href={`/etterem/${r.slug}`}>
        <a>{r.name} rendelés | </a>
      </Link>
    ));
  };

  return (
    <div>
      <Head>
        <title>
          {city} napi menü, menü rendelés {city}!
        </title>
        <meta
          name="description"
          content={`Napi menü ${city}, heti menü ${city}, olcsó menü ${city}, ${city} menü, menü rendelés ${city}`}
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}city/${city}`}
        />
        <meta
          property="og:title"
          content={`${city} heti menü, ${city} napi menü, menü rendelés ${city}!`}
        />
        <meta
          property="og:description"
          content={`Napi menü ${city}, heti menü ${city}, olcsó menü ${city}, ${city} menü, menü rendelés ${city}`}
        />
        <meta
          property="og:url"
          href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}city/${city}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section
        className="section pb-2 products-listing"
        style={{ paddingTop: 20 }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="font-weight-bold mt-0 mb-3">
                <i
                  onClick={() => router.back()}
                  className="fas fa-arrow-left"
                  style={{ marginRight: 10, cursor: "pointer" }}
                ></i>
                ÉTTERMEK{" "}
                <small className="h6 mb-0 ml-2">
                  {restaurants.length} étterem{" "}
                  <span
                    style={{
                      color: "#F0A500",
                      fontWeight: "bold",
                      fontSize: 22,
                    }}
                  >
                    {city}
                  </span>{" "}
                  területén
                </small>
              </h2>
            </div>{" "}
            {/* col-md-12 */}
          </div>{" "}
          {/* row d-none-m */}
          <div className="row">
            <Filter
              search={search}
              handleSearchInput={handleSearchInput}
              deliveryFilter={deliveryFilter}
              setDeliveryFilter={setDeliveryFilter}
              openFilter={openFilter}
              setOpenFilter={setOpenFilter}
              menuFilter={menuFilter}
              setMenuFilter={setMenuFilter}
            />
            <AdSense.Google
              client="ca-pub-0702538969981759"
              slot="4187493889"
              style={{ display: "block", width: "100%" }}
              format="auto"
              responsive="true"
            />
            <Restaurants restaurants={filteredRestaurants} />
          </div>{" "}
          {/* row */}
        </div>{" "}
        <div className="container">
          <p>
            Menü rendelés {city}. Keress menüzős éttermet {city} városában. Itt
            egy helyen megtalálod azokat az éttermeket, melyek kínálnak napi
            menüt, illetve heti menüt {city} városában! {city} menü rendelés.
          </p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="search-links">{renderSEORestaurants()}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await API.get(`info/restaurantLocations`, {
    params: { API_SECRET: API_SECRET },
  });
  const cities = await res.data;
  const paths = cities.map((c) => ({ params: { city: c.city } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const city = encodeURIComponent(params.city);
  const res = await API.get(`restaurant/listingCity`, {
    params: { API_SECRET: API_SECRET, city },
  });
  const rest = await res.data;

  return {
    props: {
      restaurants: rest,
    },
    revalidate: 10,
  };
}
