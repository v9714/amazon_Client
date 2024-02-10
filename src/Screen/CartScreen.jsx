import { useContext, useEffect, useState } from "react";

import jwtDecode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { CookieContext } from "../Context/Cookies";
import apiHelper from "../Commn/ApiHelper";

export default function CartScreen() {
  const [CartData, setCartData] = useState([]);
  const [SummaryDetails, setSummaryDetails] = useState({
    totalAmount: 0,
    totalItems: 0,
    totalProducts: 0,
    delivery: 0,
    text: 0
  });

  let user
  const userData = useContext(CookieContext);
  const nagiget = useNavigate();


  console.log(CartData)
  const getCartData = async () => {
    try {
      if (!userData.cookiess.user) {
        nagiget("/login");
        return;
      }
      user = jwtDecode(userData?.cookiess?.user)
      const result = await apiHelper.GetCart(user._id)
      if (result && result.status === 200) {
        console.log(result)
        setCartData(result.data.productsCartByUserId)
      }

    } catch (error) {
      console.log(error)
    }
  }


  const handleDeleteItem = async (index, id) => {
    try {
      const result = await apiHelper.DeleteCart(id);
      if (result && result.status === 200) {
        const updatedCartData = CartData.filter((x) => x.productId !== id);
        setCartData(updatedCartData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityChange = (e, index) => {
    const newQuantity = parseInt(e.target.value);
    const updatedCartData = [...CartData];
    updatedCartData[index].quantity = newQuantity;
    setCartData(updatedCartData);
  };



  const ProcessToCheckout = async () => {
    try {
      if (!userData.cookiess.user) {
        nagiget("/login");
        return;
      }
      user = jwtDecode(userData?.cookiess?.user)

      const obj = CartData.reduce((acc, x) => {
        acc[x.productId] = x.quantity;
        return acc;
      }, {});

      console.log(obj);
      const result = await apiHelper.ChackOut(
        {
          userId: user._id,
          products: obj,
          totalIteams: SummaryDetails.totalItems,
          totalAmount: SummaryDetails.totalAmount
        })
      if (result && result.status === 200) {
        nagiget("/shipping")
      }

    } catch (error) {
      console.log(error);
    }
  };


  console.log(CartData)
  useEffect(() => {
    getCartData()
    // eslint-disable-next-line 
  }, [])


  useEffect(() => {
    let i = 0;
    let totalPrice = 0;
    let totalItems = 0;
    let totalProducts = 0;

    while (i < CartData.length) {
      console.log(CartData[i].product_data.countInstock)
      if (CartData[i].product_data.countInstock > 0) {
        totalItems += CartData[i].quantity;
        totalPrice += CartData[i].quantity * CartData[i].product_data.price;
        totalProducts++;
      }
      i++;
    }

    setSummaryDetails({ ...SummaryDetails, totalItems, totalAmount: totalPrice, totalProducts });
    // eslint-disable-next-line 
  }, [CartData]);

  console.log(SummaryDetails);

  return (
    <>
      <div className="container py-3 px-4">
        <div className="row">
          <div className="col-12 col-md-8 mb-2">
            <div className=" d-flex justify-content-between">
              <h5 className="fw-bold">Shopping Card</h5>
              <span className="text-secondary">Price</span>
            </div>
            <hr className="my-2 mb-4 d-md-block" />

            {
              CartData.map((x, index) => (
                <div className="row shadow py-3 mb-4" key={index}>
                  <div className="col-3 col-md-2">
                    <Link className={"link"} to={`/product/${x.productId}`}>
                      {/* eslint-disable-next-line */}
                      <img
                        src={x.product_data.image}
                        alt="Image not found"
                        width={"100%"}
                        style={{ maxWidth: "150px" }}
                      />
                    </Link>
                  </div>
                  <div className="col-9 col-md-10 d-flex justify-content-between">
                    <div className="w-100">
                      <Link className={"link"} to={`/product/${x.productId}`}>
                        <h6 className="fw-bold">{x.product_data.title}</h6>
                      </Link>
                      <p className="mb-1">Brand: {x.product_data.alias} </p>
                      <p className="mb-1">Category: {x.product_data.category} </p>
                      <div className="d-flex gap-2 align-items-center">
                        <span>Quantity:</span>
                        <select
                          value={x.quantity}
                          className="bg-gradient bg-light rounded"
                          style={{ minWidth: "70px" }}
                          onChange={(e) => handleQuantityChange(e, index)}
                        >
                          {[...Array(x.product_data.countInstock).keys()].map((n) => (
                            <option value={n + 1} key={n + 1}>{n + 1}</option>
                          ))}
                        </select>
                      </div>
                      <p className={x.product_data.countInstock > 0 ? "text-success mt-1" : "text-danger mt-1"}>
                        {x.product_data.countInstock > 0 ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>
                    <div>
                      <span className="fw-bold d-block text-end" style={{ color: "#b12704", width: "max-content" }}>
                        Rs {x.product_data.price}
                      </span>
                      <button className="btn mt-2 btn-warning bg-gradient border-secondary"
                        onClick={() => handleDeleteItem(index, x.product_data._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            }









          </div>
          <div className="col-12 col-md-4">
            <div className="card-header border-secondary border border-bottom-0">
              <h5 className="fw-bold">Summary</h5>
            </div>
            <div className="card-body border-secondary border">
              <div className="d-flex justify-content-between">
                <h6>Total Products:</h6>
                <span>{SummaryDetails.totalProducts}</span>
              </div>
              <div className="d-flex justify-content-between">
                <h6>Total Items:</h6>
                <span>{SummaryDetails.totalItems}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h6>Total Amount:</h6>
                <span>Rs {SummaryDetails.totalAmount}</span>
              </div>
              <div className="d-flex justify-content-between">
                <h6 className="fw-bold">Subtotal:</h6>
                <span className="fw-bold" style={{ color: "#b12704" }}>
                  Rs {SummaryDetails.totalAmount}
                </span>
              </div>
              <center>
                <button
                  onClick={ProcessToCheckout}
                  className="w-100 btn btn-warning border-secondary bg-gradient"
                >
                  Proccess to Chackout
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
