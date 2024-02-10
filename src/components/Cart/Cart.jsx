
import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import { CookieContext } from "../../Context/Cookies";
import jwtDecode from "jwt-decode";
import apiHelper from "../../Commn/ApiHelper";
import toast, { Toaster } from "react-hot-toast";

export default function Cart({ product, isLiked = false, updateIsLiked }) {


  const [linkPath, setLinkPath] = useState("##")
  const coo = useContext(CookieContext);

  const likeToCart = async (id) => {
    try {
      const userdata = jwtDecode(coo.cookiess.user)._id;
      if (!userdata || !id) return window.location.href = "/";
      const result = await apiHelper.productLike({ userid: userdata, productId: id });
      if (result && result.status === 200) {
        // console.log(result);
        updateIsLiked(product._id, true);
      }

    } catch (error) {
      console.log(error)
      if (error && error.response && error.response.data && error.response.data.message) {
        console.log(error.response.data.message, "dfdfdfdf")
        toast.success(error.response.data.message)
      }
    }
  }


  useEffect(() => {
    if (!coo.cookiess.user) {
      return setLinkPath("/login")
    }

  }, [coo.cookiess.user])

  return (
    <div className="col">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <Link to={`/product/${product._id}`}>
        <div className="product-card">
          <div className="product-tumb">
            <img src={product.image} alt="" />
          </div>
          <div className="product-details">
            <span className="product-catagory">{product.category}</span>
            <h4>{product.title}</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero,
              possimus nostrum!
            </p>
            <div className="product-bottom-details">
              <div className="product-price">
                <small>$96.00</small>
                {product.price}
              </div>

              <div className="product-links">
                <Link to={"#"}>
                  <i className="bi bi-cart-check-fill"></i>
                </Link>

                <Link to={linkPath} onClick={() => likeToCart(product._id)}>
                  {isLiked ?
                    (<i className="bi bi-heart-fill" style={{ color: "#ff7089" }}></i>)
                    : (<i className='bi bi-heart'> </i>)
                  }
                </Link>
              </div>

            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}


