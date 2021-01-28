import React, { useEffect } from 'react';

const MobileNavbar = ({ scrolled }) => {


  // const [referenceNode, setReferenceNode] = useState();
  // const [listItems] = useState(Array.from(Array(30).keys(), (n) => n + 1));

  // useEffect(() => {
  //   return () => referenceNode.removeEventListener('scroll', handleScroll);
  // }, []);

  // function handleScroll(event) {
  //   var node = event.target;
  //   const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
  //   if (bottom) {
  //     console.log('BOTTOM REACHED:', bottom);
  //   }
  // }

  // const paneDidMount = (node) => {
  //   if (node) {
  //     node.addEventListener('scroll', handleScroll);
  //     setReferenceNode(node);
  //   }
  // };

  // // const [scrolled, setScrolled] = React.useState(false);

  // // const handleScroll = () => {

  // //   console.log('handing effect')
  // //   const offset = window.scrollY;
  // //   if (offset > 200) {
  // //     setScrolled(true);
  // //   } else {
  // //     setScrolled(false);
  // //   }

  // // }

  // useEffect(() => {
  //   console.log('use scroll pos')
  //   window.addEventListener('scroll', useScrollPosition)
  // })
  console.log(scrolled)
  let navbarClasses = ['navbar'];
  // // if (scrolled) {
  // //   navbarClasses.push('scrolled');
  // // }

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
