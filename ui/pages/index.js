import React, { useEffect } from "react";
import Navigation from "components/navigation";
import HomeHero from "components/HomeHero";
import HowTo from "components/HowTo";
import HomeReview from "components/HomeReview";
import { initParametersFromQuery } from "services/config";
import DescriptionMissionApprentissage from "components/DescriptionMissionApprentissage";
import Footer from "components/footer";
import { useDispatch } from "react-redux";
import ScrollToTop from "components/ScrollToTop";
import howtocircle1 from "public/images/howtocircle1.svg";
import howtocircle2 from "public/images/howtocircle2.svg";
import howtocircle3 from "public/images/howtocircle3.svg";
import howtocircle4 from "public/images/howtocircle4.svg";
import howtocircle5 from "public/images/howtocircle5.svg";
import axios from "axios";
import csvToArray from "utils/csvToArray.js"
import { some } from "lodash";

const Home = (props) => {
  console.log('props', props);
  const dispatch = useDispatch();

  useEffect(() => {
    initParametersFromQuery({ dispatch, shouldPush: "shouldPushPathname" });
  }, []);

  return (
    <div>
      <ScrollToTop />
      <Navigation />
      <div className="c-homebg">
        <img src={howtocircle1} className="c-homebg-img c-homebg-img--circle c-homebg-img--circle1" alt="Cercle" />
        <img src={howtocircle2} className="c-homebg-img c-homebg-img--circle c-homebg-img--circle2" alt="Cercle" />
        <img src={howtocircle3} className="c-homebg-img c-homebg-img--circle c-homebg-img--circle3" alt="Cercle" />
        <img src={howtocircle4} className="c-homebg-img c-homebg-img--circle c-homebg-img--circle4" alt="Cercle" />
        <img src={howtocircle5} className="c-homebg-img c-homebg-img--circle c-homebg-img--circle5" alt="Cercle" />
        <HomeHero />
        <HowTo />
      </div>

      <HomeReview reviews={props.reviews} />
      
      <DescriptionMissionApprentissage />
      <Footer />
    </div>
  );
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get reviews.
  // You can use any data fetching library
  const reviews = await getAllReviews()
  console.log('reviews', reviews);

  // By returning { props: { reviews } }, the Blog component
  // will receive `reviews` as a prop at build time
  return {
    props: {
      reviews,
    },
  }
}

async function getAllReviews() {
  const response = await axios.get('https://raw.githubusercontent.com/mission-apprentissage/labonnealternance/datasets/ui/config/review.csv');
  console.log('response.data', response.data);
  const csv = csvToArray(response.data)

  /*
    [
      {
        PETIT_TITRE_1: 'Un petit titre',
        GROS_TITRE_2: 'Un gros titre',
        TEXTE_1_NON_GRAS: ' Un texte non gras',
        TEXTE_2_GRAS: ' Un texte gras',
        LIBELLE_CTA: ' Visitez le site',
        URL_CTA: 'https://mission-apprentissage.gitbook.io/general/',
        '': ''
      },
      {
        PETIT_TITRE_1: '',
        GROS_TITRE_2: undefined,
        TEXTE_1_NON_GRAS: undefined,
        TEXTE_2_GRAS: undefined,
        LIBELLE_CTA: undefined,
        URL_CTA: undefined,
        '': undefined
      }
    ]
  */

  const cleanedCsv = csv
                      // the filter will clear the object with falsy-only values
                      .filter((e) => {
                        return some(e, (k) => !!k)
                      })
                      // the map will clear the property ''
                      .map((e) => {
                        delete e['']
                        // trim all values
                        Object.keys(e).forEach(k => e[k] = e[k].trim());
                        return e
                      })

  let result = cleanedCsv[0] || {}
  console.log('result', result);

  return result;
}



export default Home;
