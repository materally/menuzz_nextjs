import Script from "next/script";

import "../styles/globals.css";
import "../styles/MenuzzGlobal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Script
        src="https://kit.fontawesome.com/f3b761f592.js"
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
      <Script
        src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        strategy="lazyOnload"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossOrigin="anonymous"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
        strategy="lazyOnload"
        integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
        crossOrigin="anonymous"
      />
      <Script
        data-ad-client="ca-pub-0702538969981759"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        strategy="lazyOnload"
        async
      />
    </>
  );
}

export default MyApp;
