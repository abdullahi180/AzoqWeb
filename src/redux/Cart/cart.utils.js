//handles when there is an existing cart item
export const existingCartItem = ({ prevCartItems, nextCartItem }) => {
  return prevCartItems.find(
    (cartItem) => cartItem.documentID === nextCartItem.documentID
  );
};
//handles the add to cart functionlity
//util function
//expect two things- previous item and next item
export const handleAddToCart = ({ prevCartItems, nextCartItem }) => {
  //increase quantity by 1 when product is added to bakset
  const quantityIncrement = 1;
  //cart item exists
  const cartItemExists = existingCartItem({ prevCartItems, nextCartItem });
  //if cart item exists
  //either returns true or false
  // if true code below will run
  if (cartItemExists) {
    //return cart items
    //hanldes quatity- increases quatity if item aleady exists
    //or just adds item to basket if it doesnt exist
    return prevCartItems.map((cartItem) =>
      //if item is already exits - unique id
      //evaulate the doc id ahaist next item id - if it matches then it means item is already in basket- then icrease quantity
      cartItem.documentID == nextCartItem.documentID
        ? {
            //increment when user adds new product to their cart
            //increment Quantity
            ...cartItem,
            quantity: cartItem.quantity + quantityIncrement,
          }
        : cartItem
    );
  }
  //return the prev basket item
  //add new product to basket
  //pass in prrevious cart items
  return [
    ...prevCartItems,
    {
      //create new basket item- all of the data from next casrt item
      ...nextCartItem,
      quantity: quantityIncrement,
    },
  ];
};
//handles removing products from basket
//takes in prev cart items and next
//return prev items and filter- compare item to doc id and enusre it is not equal to the cart item to remove doc
//only return cart items that do not match items id i attempt to remvoe
export const handleRemoveCartItem = ({ prevCartItems, cartItemToRemove }) => {
  return prevCartItems.filter(
    (item) => item.documentID !== cartItemToRemove.documentID
  );
};
//handles reducing quantity if poducts in the basket
//helper utlity function
//fucntion expects prev and cart item to reudce
export const handleReduceCartItem = ({ prevCartItems, cartItemToReduce }) => {
  //existing cart time
  //find method applied on prev items- fidn current item

  const existingCartItem = prevCartItems.find(
    //compare the current items doc id to check if it matched with cart item to reduc doucment id
    (cartItem) => cartItem.documentID === cartItemToReduce.documentID
  );
  //scenario 1
  //when  cliking reduce quantity when there is only 1 item in the basket
  //essentially remove item from basket
  if (existingCartItem.quantity === 1) {
    //rerun prev items

    return prevCartItems.filter(
      //get cart item- only return where doc id doesnt matchh existing item id- essentially eeving item from cart
      (cartItem) => cartItem.documentID !== existingCartItem.documentID
    );
  }
  //if there quanity is more than one
  //get current item
  //map through basket items
  return prevCartItems.map((cartItem) =>
    //if docID matches exiditng cart item doc id
    cartItem.documentID === existingCartItem.documentID
      ? {
          //return cart item
          ...cartItem,
          //update he quanity, return -1 qauntity
          quantity: cartItem.quantity - 1,
        }
      : //return cart item
        cartItem
  );
};
