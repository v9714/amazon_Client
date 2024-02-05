import React, { useContext } from "react";
import Cart from "../Cart/Cart";
import ImageSlider from "../Slider/Slider";
import OverSlider from "../OverSlider/OverSlider";
import apiHelper from "../Commn/ApiHelper";
import { useEffect } from "react";
import { useState } from "react";
import Loder from "../Commn/Loder";
import MessageBox from "../Commn/MessageBox";
import { CookieContext } from "../../Context/Cookies";

export default function Home() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const coo = useContext(CookieContext);

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const userdata = coo.cookiess.user;
      let promises = [apiHelper.getProduct()];
      if (userdata) {
        promises.push(apiHelper.getproductLike());
      }
      const [productResult, likeResult] = await Promise.all(promises);
      if (productResult.status === 200) {
        let productData = productResult.data.Product;
        if (likeResult && likeResult.status === 200) {
          const likeData = likeResult.data.Product;
          if (productData && likeData) {
            for (let i = 0; i < likeData.length; i++) {
              for (let j = 0; j < productData.length; j++) {
                if (likeData[i].productId === productData[j]._id) {
                  productData[j].isLiked = true;
                }
              }
            }
          }
        }
        setProduct(productData);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      if (error && error.response && error.response.data && error.response.data.message) {
        console.log(error.response.data.message, "dfdfdfdf")
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  };



  const updateIsLiked = (productId) => {
    setProduct((prevProducts) => {
      return prevProducts.map((p) => (p._id === productId ? { ...p, isLiked :true} : p));
    });
  };


  console.log("test", "home")

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>

      <Loder isLoding={isLoading} />
      <MessageBox error={error} seterror={setError} />

      {/* <div className="over-slider" style={{ marginBottom: "calc(32vw + 10px)" }}> */}
      <div className="over-slider" >
        <ImageSlider />
        <div className="Over_slider_carts">
          {/* <OverSlider /> */}
        </div>
      </div>
      <div className="cart">
        <>
          <div className="container-fluid">
            <div className="row d-flex align-items-start">
              {/* {
                product.map((x) => (
                  <Cart key={x._id} product={x} isLiked={x.isLiked}  setProduct={setProduct} />
               
                ))
              } */}


              
                {
                  product.map((x) => (
                    <Cart key={x._id} product={x} isLiked={x.isLiked} updateIsLiked={updateIsLiked} />
                  ))
                }


            </div>
          </div>
        </>
      </div>
    </div>
  );
}
