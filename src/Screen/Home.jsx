import React, { useContext } from "react";
import Cart from "../components/Cart/Cart";
import ImageSlider from "../components/Slider/Slider";
import apiHelper from "../Commn/ApiHelper";
import { useEffect } from "react";
import { useState } from "react";
import Loder from "../components/Loder/Loder";
import MessageBox from "../components/MessageBox";
import { CookieContext } from "../Context/Cookies";
import jwtDecode from "jwt-decode";

export default function Home() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const coo = useContext(CookieContext);
  const userdata = coo.cookiess.user;
  let uid;
  if (coo.cookiess.user) {
    uid = jwtDecode(coo.cookiess.user)
  }

  console.log(uid?._id)


  const getProduct = async () => {
    try {
      setIsLoading(true);
      let promises = [apiHelper.getProduct()];
      if (userdata) {
        promises.push(apiHelper.getproductLike(uid?._id));
      }
      const [productResult, likeResult] = await Promise.all(promises);
      if (productResult.status === 200) {
        console.log(likeResult)
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
      return prevProducts.map((p) => (p._id === productId ? { ...p, isLiked: true } : p));
    });
  };


  console.log("test", "home")

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line 
  }, []);

  return (
    <div>

      <Loder isLoding={isLoading} />
      <MessageBox error={error} seterror={setError} />

      <>
        <div >
          <ImageSlider />
        </div>
        <div className="container-fluid pt-4">
          <h2 className="pro_title ps-5" >New Products</h2>
          <div className="row d-flex align-items-start">
            {
              product.map((x) => (
                <Cart key={x._id} product={x} isLiked={x.isLiked} updateIsLiked={updateIsLiked} />
              ))
            }
          </div>
        </div>
      </>
    </div>
  );
}
