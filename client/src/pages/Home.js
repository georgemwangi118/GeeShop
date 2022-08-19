import React from "react";
import Header from "../components/Header";
import ShopSection from "../components/home/ShopSection";
import ContactInfo from "../components/home/ContactInfo";
import CalltoAction from "../components/home/CalltoAction";
import Footer from "../components/Footer";

const Home = ({ match }) => {
  window.scrollTo(0, 0);
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <>
      <Header />
      <ShopSection keyword={keyword} pagenumber={pagenumber} />
      <CalltoAction />
      <ContactInfo />
      <Footer />
    </>
  );
};

export default Home;
