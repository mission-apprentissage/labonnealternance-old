import React, { useEffect } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

const MobileNavbar = () => {

  useScrollPosition(({ prevPos, currPos }) => {
    console.log(currPos.x)
    console.log(currPos.y)
  })

  // const [scrolled, setScrolled] = React.useState(false);

  // const handleScroll = () => {

  //   console.log('handing effect')
  //   const offset = window.scrollY;
  //   if (offset > 200) {
  //     setScrolled(true);
  //   } else {
  //     setScrolled(false);
  //   }

  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', useScrollPosition)
  // })

  let navbarClasses = ['navbar'];
  if (scrolled) {
    navbarClasses.push('scrolled');
  }

  return (
    <header className={navbarClasses.join(" ")}>

      <div className="logo">
        logofoo
      </div>
      <nav className="navigation">
        navfoo
      </nav>

    </header>
  )
};
export default MobileNavbar;
