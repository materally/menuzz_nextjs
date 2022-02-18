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
        crossOrigin="anonymous"
      />
      <Script
        src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
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
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-178471960-1', 'auto');
          ga('send', 'pageview');
        `}
      </Script>
    </>
  );
}

export default MyApp;
