//The file contains the code that imports our products results(browse page).

//import react
import React from "react";
//inherit our product results
import BrowseProducts from "../../components/ProductsResults";
//constant
const Browse = ({}) => {
  return (
    <div className=" browse__page">
      {/*return our products results component to display it on the page. */}
      <BrowseProducts />
    </div>
  );
};
//export to use it on app.js
export default Browse;
