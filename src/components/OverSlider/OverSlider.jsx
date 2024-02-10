import React from 'react'
import './c.css'
import { Link } from 'react-router-dom'
export default function OverSlider() {
    return (
        < div className='overimg'>
            <div className="product-comp">
                <div className="box">
                    <h3>Gaming Accessories</h3>
                    <div className="box-a">
                        <div>
                            <img src="./image/slider/OverImage/ga1.jpg" alt="" />
                            <span>Headsets</span>
                        </div>
                        <div>
                            <img src="./image/slider/OverImage/ga2.jpg" alt="" />
                            <span>Keyboards</span>
                        </div>
                        <div>
                            <img src="./image/slider/OverImage/ga3.jpg" alt="" />
                            <span>Computer mice</span>
                        </div>
                        <div>
                            <img src="./image/slider/OverImage/ga4.jpg" alt="" />
                            <span>Chairs</span>
                        </div>
                    </div>
                    <Link to={'#'}>See More</Link>
                </div>
                <div className="box">
                    <h3>Shop By Category</h3>
                    <div className="box-a">
                        <div>
                            <img src="./image/slider/OverImage/sc1.jpg" alt="" />
                            <span>Laptop</span>
                        </div>
                        <div>
                            <img src="./image/slider/OverImage/sc2.jpg" alt="" />
                            <span>Video Games</span>
                        </div>
                        <div>
                            <img src="./image/slider/OverImage/sc3.jpg" alt="" />
                            <span>Baby</span>
                        </div>
                        <div>
                            <img src="./image/slider/OverImage/sc4.jpg" alt="" />
                            <span>Toy &amp; Games</span>
                        </div>
                    </div>
                    <Link to={'#'}>Shop Now</Link>
                </div>
                <div className="box box-c c-boxx">
                    <h3>Amazon Basics</h3>
                    <div>
                        <img src="./image/slider/OverImage/basics.jpg" alt="" />
                    </div>
                    <Link to={'#'}>See More</Link>
                </div>
                <div className="box-b s_box">
                    <div className="best">
                        <h3>Sign up for the Best Experience</h3>
                        <button>Sign in securely</button>
                    </div>
                    <div>
                        <img src="./image/slider/OverImage/banner.jpg" alt="" />
                    </div>
                </div>
            </div>

            <div className="product-comp product-2  oc-2">
                <div className="box box-c">
                    <h3>Shop Valentine's Day</h3>
                    <div>
                        <img src="./image/slider/OverImage/valentine's.jpg" alt="" />
                    </div>
                    <Link to={'#'}>See More</Link>
                </div>
                <div className="box box-c">
                    <h3>Electronics</h3>
                    <div>
                        <img src="./image/slider/OverImage/electronics.jpg" alt="" />
                    </div>
                    <Link to={'#'}>See More</Link>
                </div>
                <div className="box box-c c-boxx">
                    <h3>Find your ideal TV</h3>
                    <div>
                        <img src="./image/slider/OverImage/find your deal.jpg" alt="" />
                    </div>
                    <Link to={'#'}>See More</Link>
                </div>
                <div className="box box-c s_box">
                    <h3>Easy Returns</h3>
                    <div>
                        <img src="./image/slider/OverImage/easy return.jpg" alt="" />
                    </div>
                    <Link to={'#'}>See More</Link>
                </div>
            </div>
        </div>

    )
}
