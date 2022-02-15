import React, { Fragment } from "react";
import Head from "next/head";

// Components
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Head>
        <meta
          name="description"
          content="Ebédelnél valami finomat? Keress a városodban menüzős éttermet! Menü rendelés, heti menü, napi menü."
        />
        <link rel="apple-touch-icon" href="/logo192.png" />

        <meta
          property="og:image"
          content="https://menuzz.hu/api/public/city/debrecen.jpg"
        />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="533" />
        <meta
          property="og:title"
          content="Menüzz - Találd meg a legjobb ebédet a városodban!"
        />
        <meta
          property="og:description"
          content="Keress ebédet a közeledben! Heti menü, napi menü a városodban"
        />
        <meta property="og:url" content="http://www.menuzz.hu/" />
        <meta property="fb:app_id" content="1613042828876052" />
        <meta property="og:type" content="website" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
