import React, { useEffect, useState } from "react";
import Navigation from "components/navigation";
import Breadcrumb from "components/breadcrumb";
import ScrollToTop from "components/ScrollToTop";
import { NextSeo } from "next-seo";
import baseUrl from "utils/baseUrl";
import axios from "axios";
import { NotionRenderer } from "react-notion-x";
import Footer from "components/footer";

const FAQ = (props) => {


  const [isLoading, setIsLoading] = useState(true);
  const [recordMapNotion, setRecordMapNotion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const notionFAQ = await axios.get(baseUrl + '/api/faq');
      setRecordMapNotion(notionFAQ.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="c-faq">
      <NextSeo
        title="F.A.Q | La Bonne Alternance | Trouvez votre alternance"
        description="Questions fréquemment posées. Résultats entreprises, résultats formations, etc."
      />

      <ScrollToTop />
      <Navigation bgcolor="is-white" />

      <Breadcrumb forPage="faq" label="FAQ" />

      <div className="c-page-container container my-0 mb-sm-5 p-5">
        <div className="row">
          <div className="col-12 col-md-5">
            <h1>
              <span className="d-block c-page-title is-color-1">Questions</span>
              <span className="d-block c-page-title is-color-2">fréquemment</span>
              <span className="d-block c-page-title is-color-2">posées</span>
            </h1>
            <hr className="c-page-title-separator" align="left" />
          </div>
          <div className="col-12 col-md-7">
            {isLoading ? 
            <>
                <div>Chargement en cours...</div> 
            </>
            :
            <>
                <NotionRenderer
                  recordMap={recordMapNotion}
                  fullPage={false}
                  darkMode={false}
                  disableHeader={true}
                  rootDomain={process.env.REACT_APP_BASE_URL}
                  bodyClassName="notion-body"
                />
            </>
            }
          </div>
        </div>
      </div>
      <div className="mb-3">&nbsp;</div>
      <Footer />
    </div>
  );
};

export default FAQ;
