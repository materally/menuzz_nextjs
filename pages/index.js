import Head from "next/head";
import Hero from "./home/Hero";
import PopularCities from "./home/PopularCities";
import LatestRestaurants from "./home/LatestRestaurants";
import API, { API_SECRET } from "../service/api";

export default function Home({ cities, popularCities, latestRestaurants }) {
  return (
    <div>
      <Head>
        <title>Menüzz - Heti menü, napi menü a városodban!</title>
        <meta
          name="description"
          content={`Ebédelnél valami finomat? Keress a városodban menüzős éttermet! Napi menü Debrecen, heti menü Nyíregyháza, olcsó menü Miskolc, Szeged menü, menü rendelés Hajdúszoboszló`}
        />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_FRONTEND_URL} />
        <meta
          property="og:title"
          content={`Menüzz - Heti menü, napi menü a városodban!`}
        />
        <meta
          property="og:description"
          content={`Ebédelnél valami finomat? Keress a városodban menüzős éttermet! Napi menü Debrecen, heti menü Nyíregyháza, olcsó menü Miskolc, Szeged menü, menü rendelés Hajdúszoboszló`}
        />
        <meta property="og:url" href={process.env.NEXT_PUBLIC_FRONTEND_URL} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero cities={cities} />
      <PopularCities popularCities={popularCities} />
      <LatestRestaurants latestRestaurants={latestRestaurants} />
    </div>
  );
}

export async function getStaticProps() {
  const apiCities = await API.get(`info/restaurantLocations`, {
    params: { API_SECRET: API_SECRET },
  });
  const resCities = await apiCities.data.map((a, i) => {
    return {
      key: i,
      value: a.city,
      label: a.city,
    };
  });

  const apiPopularCities = await API.get(`home/home_cities`, {
    params: { API_SECRET: API_SECRET },
  });
  const resPopularCities = await apiPopularCities.data;

  const apiLatestRestaurants = await API.get(`restaurant/getForCarousel`, {
    params: { API_SECRET: API_SECRET },
  });
  const resLatestRestaurants = await apiLatestRestaurants.data;

  return {
    props: {
      cities: resCities,
      popularCities: resPopularCities,
      latestRestaurants: resLatestRestaurants,
    },
    revalidate: 10,
  };
}
