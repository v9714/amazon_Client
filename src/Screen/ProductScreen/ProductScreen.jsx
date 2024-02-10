import React, { useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import './ProductScreen.css'
import Zoom from 'react-img-zoom'
import jwtDecode from 'jwt-decode';
import { CookieContext } from '../../Context/Cookies';
import apiHelper from '../../Commn/ApiHelper';


export default function ProductScreen() {

  let { id } = useParams();
  const userData = useContext(CookieContext);
  const nagiget = useNavigate()

  // let user = jwtDecode(userData?.cookiess?.user || null)
  // console.log(user)

  let user
  const [Product, setProduct] = useState({})

  const [quantity, setQuantity] = useState({
    product_id: id,
    userId: null,
    productQuantity: 1,

  });

  console.log(quantity)
  const getProductById = async () => {
    try {
      const result = await apiHelper.getProductById(id)
      setProduct(result.data.productById)
    } catch (error) {
      console.log(error)

    }
  }

  const addToCart = async () => {
    try {
      if (!userData.cookiess.user) {
        nagiget("/login");
        return;
      }
      user = jwtDecode(userData?.cookiess?.user)
      const result = await apiHelper.addCart({ ...quantity, userId: user._id });
      console.log(result)
      if (result && result.status === 200) {
        nagiget("/cart");
      }
    } catch (error) {
      console.log(error);
      if (error && error.response && error.response.data && error.response.data.message) {
        nagiget("/cart");
      }
    }

  };


  useEffect(() => {
    getProductById()


    // eslint-disable-next-line
  }, [])


  return (
    <div className="card-wrapper productScreen">
      <div className="card">
        {/* card left */}
        <div className="product-imgs">
          <div className="img-display">
            <div className="img-showcase">
              {Product.image ? (
                <Zoom
                  img={Product.image}
                  zoomScale={3}
                  width={600}
                  height={300}
                />
              ) : (
                <p>No image available</p>
              )}

              {/* <img src={Product.image} alt="N/A" /> */}
              {/* <img src={Product.image} alt="N/A" />
                    <img src={Product.image} alt="N/A" />
                    <img src={Product.image} alt="N/A" /> */}
            </div>
          </div>
          <div className="img-select">

            {/* Image Renderring  */}
            {Product.images !== undefined ? (
              Product.images.map((x, index) => (
                <div className="img-item" key={index}>
                  <Link to="##" data-id={1}>
                    <img style={{ height: "120px", width: "200px" }} src={x} alt="N/A" />
                  </Link>
                </div>
              ))
            ) : (
              <p style={{ color: "ff726f", margin: "auto", padding: "10px" }}>Photos Not Available</p>
            )}

          </div>
        </div>
        {/* card right */}
        <div className="product-content">
          <h2 className="product-title">{Product.title}</h2>
          <div className='d-flex justify-content-between conpniy_name'>

            <Link to="##" className="product-link"> {Product.category}</Link>
            <span className='float-right In_stock'>

              {Product.countInstock <= 0 ? (
                <p className='Out_stock'><span>Out of stock</span> : Available </p>
              ) : (
                <p className='In_stock'><span>In stock</span> : Available</p>
              )}

            </span>
          </div>


          <div className="product-rating">
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>

            {Product.rating ? (
              <span>{Product.rate}({Product.NumReviews})</span>
            ) : (
              <span>No rating available</span>
            )}

          </div>
          <div className="product-price">
            <p className="last-price">
              Old Price: <span>Rs.{Product.price + 100}</span>
            </p>
            <p className="new-price">
              New Price: <span>Rs.{Product.price} (Lees -100)</span>
            </p>
          </div>
          <div className="product-detail">
            <h2>about this item: </h2>
            <p>
              {Product.description}
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
              perferendis eius. Dignissimos, labore suscipit. Unde.
            </p>
            <ul>
              <li> Color:

                <ul className="variant">
                  <li className='colors_iteam1'></li>
                  <li className='colors_iteam2'></li>
                  <li className='colors_iteam3'></li>
                  <li className='colors_iteam4'></li>
                </ul>

              </li>
              {Product.category === "clothing" ? (
                <li> Size :
                  <ul className="variant">
                    <li>S</li>
                    <li>L</li>
                    <li>XL</li>
                    <li>2XL</li>
                    <li>3XL</li>
                  </ul>
                </li>
              ) : Product.category === "shoes" ? (
                <>
                  <li> Size :</li>
                  <span className="select" tabIndex={1}>
                    <input
                      className="select-opt"
                      name="test"
                      type="radio"
                      id="opt1"
                      defaultChecked=""
                    />
                    <label htmlFor="opt1" className="option">
                      5 UK(5.5 US)
                    </label>
                    <input className="select-opt" name="test" type="radio" id="opt2" />
                    <label htmlFor="opt2" className="option">
                      6 UK(5.5 US)
                    </label>
                    <input className="select-opt" name="test" type="radio" id="opt3" />
                    <label htmlFor="opt3" className="option">
                      7 UK(5.5 US)
                    </label>
                    <input className="select-opt" name="test" type="radio" id="opt4" />
                    <label htmlFor="opt4" className="option">
                      8 UK(5.5 US)
                    </label>
                    <input className="select-opt" name="test" type="radio" id="opt5" />
                    <label htmlFor="opt5" className="option">
                      8 UK(5.5 US)
                    </label>
                  </span>
                </>
              ) : null}
              <li> Category : <span> {Product.category}</span></li>
              <li> Shipping Area: <span> All over the world</span></li>
              <li>Shipping Fee: <span> Free</span></li>
            </ul>
          </div>
          <div className="purchase-info">

            {Product.countInstock < 1 || Product.countInstock === undefined ?
              (
                <label for='Quantity'> Quantity:
                  <input type="number" id="Quantity" min={0} max={0} defaultValue={0} />
                </label>
              ) : (
                <label for='Quantity'> Quantity:
                  {Product.countInstock < 1 ?
                    (<input type="number" id="Quantity" disabled />) :
                    (<input type="number" id="Quantity" value={quantity?.productQuantity} min={0} max={Product.countInstock} onChange={(e) => setQuantity((pre) => ({ ...pre, productQuantity: e.target.value }))} />)
                  }
                </label>
              )
            }

            {Product.countInstock < 1 ?
              (<button type="button" className="btn" disabled >
                Add to Cart <i className="fas fa-shopping-cart" />
              </button>) :
              (<button type="button" className="btn" onClick={addToCart}>
                Add to Cart <i className="fas fa-shopping-cart" />
              </button>)
            }

          </div>
          <div className="social-links">
            <p>Share At: </p>
            <Link to="##">  <i className="bi bi-facebook"></i>
            </Link>
            <Link to="##"><i className="bi bi-twitter" />
            </Link>
            <Link to="##"><i className="bi bi-instagram" />
            </Link>
            <Link to="https://wa.me/1XXXXXXXXXX" target="_blank">
              <i className="bi bi-whatsapp" />
            </Link>
            <Link to="##"> <i className="bi bi-pinterest" />
            </Link>
          </div>
        </div>
      </div>
    </div >

  )
}
