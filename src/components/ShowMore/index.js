//this file contains the code that enables the search page to show an infinte numeber of items.

//IMPORTS

//import react to enable the use of react components
import React from "react";
//button is inherited from other file. button is already styled for us.
import Buttons from "../forms/Button";

//contant
//onn the load/show more event- it shows the next 3 elements.
const ShowMore = ({ onLoadMoreEvt = () => {} }) => {
  // retruns the button- user can click to show more items -activate the load more event.
  return <Buttons onClick={() => onLoadMoreEvt()}>Show More</Buttons>;
};

//export this showmore so it can be used on varoois diffrent places ont he website.
export default ShowMore;
