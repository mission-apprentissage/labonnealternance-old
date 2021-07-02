import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";

import Footer from "components/footer";

const Catalog = () => {
  return (
  <div>

    <ScrollToTop />
    <Navigation />
    <Breadcrumb forPage="catalog" label="Catalogue" />
    
    <h1>Catalogue</h1>
    
    <Footer />

  </div>
)}

export default Catalog
