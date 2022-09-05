import React, { useEffect, useState } from "react";
import Navigation from "components/navigation";
import Breadcrumb from "components/breadcrumb";
import ScrollToTop from "components/ScrollToTop";
import { NextSeo } from "next-seo";
import baseUrl from "utils/baseUrl";
import axios from "axios";
import { NotionRenderer } from "react-notion-x";
import Footer from "components/footer";
import { Spinner, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

const FAQ = (props) => {


  const [isLoading, setIsLoading] = useState(true);
  const [recordMapNotion, setRecordMapNotion] = useState(null);
  const [recordMapNotionRecruteur, setRecordMapNotionRecruteur] = useState(null);
  const [recordMapNotionOrganisme, setRecordMapNotionOrganisme] = useState(null);
  const [recordMapNotionCandidat, setRecordMapNotionCandidat] = useState(null);
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const notionFAQ = await axios.get(baseUrl + '/api/faq');
      setRecordMapNotion(notionFAQ.data);
      
      const notionFAQrecruteur = await axios.get(baseUrl + '/api/faq/recruteur');
      setRecordMapNotionRecruteur(notionFAQrecruteur.data);

      const notionFAQorganisme = await axios.get(baseUrl + '/api/faq/organisme');
      setRecordMapNotionOrganisme(notionFAQorganisme.data);

      const notionFAQcandidat = await axios.get(baseUrl + '/api/faq/candidat');
      setRecordMapNotionCandidat(notionFAQcandidat.data);

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="c-faq">
      <NextSeo
        title="F.A.Q | La bonne alternance | Trouvez votre alternance"
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
                <div><Spinner /><span className="ml-2">Chargement en cours...</span></div>
              </>
              :
              <>

                <div>
                  <Nav tabs>
                    <NavItem>
                      <NavLink className={activeTab == '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
                        Recruteur
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={activeTab == '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                        Candidat
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={activeTab == '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
                        Organisme
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <NotionRenderer
                        recordMap={recordMapNotionRecruteur}
                        fullPage={false}
                        darkMode={false}
                        disableHeader={true}
                        rootDomain={process.env.REACT_APP_BASE_URL}
                      />
                    </TabPane>
                    <TabPane tabId="2">
                      <NotionRenderer
                        recordMap={recordMapNotionCandidat}
                        fullPage={false}
                        darkMode={false}
                        disableHeader={true}
                        rootDomain={process.env.REACT_APP_BASE_URL}
                      />
                    </TabPane>
                    <TabPane tabId="3">
                      <NotionRenderer
                        recordMap={recordMapNotionOrganisme}
                        fullPage={false}
                        darkMode={false}
                        disableHeader={true}
                        rootDomain={process.env.REACT_APP_BASE_URL}
                      />
                    </TabPane>
                  </TabContent>
                </div>


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
