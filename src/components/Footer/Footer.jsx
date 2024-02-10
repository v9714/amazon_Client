import React from 'react'
import { Link } from 'react-router-dom'


export default function Footer() {
    return (

        <>
            <footer>
            
                {/* <Link to={'/'} className="footer-title">Back to top</Link> */}
                <div className="footer-items">
                    <ul>
                        <h3>Get to Know Us</h3>
                        <li>
                            <Link to='#'>About us</Link>
                        </li>
                        <li>
                            <Link to='#'>Careers</Link>
                        </li>
                        <li>
                            <Link to='#'>Press Release</Link>
                        </li>
                        <li>
                            <Link to='#'>Amazon Science</Link>
                        </li>
                    </ul>
                    <ul>
                        <h3>Connect with Us</h3>
                        <li>
                            <Link to='#'>Facebook</Link>
                        </li>
                        <li>
                            <Link to='#'>Twitter</Link>
                        </li>
                        <li>
                            <Link to='#'>Instagram</Link>
                        </li>
                    </ul>
                    <ul>
                        <h3>Make Money with Us</h3>
                        <li>
                            <Link to='#'>Sell on Amazon</Link>
                        </li>
                        <li>
                            <Link to='#'>Sell under Amazon Accelerator</Link>
                        </li>
                        <li>
                            <Link to='#'>Protect and Build Your Brand</Link>
                        </li>
                        <li>
                            <Link to='#'>Amazon Global Selling</Link>
                        </li>
                        <li>
                            <Link to='#'>Become an Affiliate</Link>
                        </li>
                        <li>
                            <Link to='#'>Fulfillment by Amazon</Link>
                        </li>
                        <li>
                            <Link to='#'>Advertise Your Products</Link>
                        </li>
                        <li>
                            <Link to='#'>Amazon Pay on Merchants</Link>
                        </li>
                    </ul>
                    <ul>
                        <h3>Let Us Help You</h3>
                        <li>
                            <Link to='#'>COVID-19 and Amazon</Link>
                        </li>
                        <li>
                            <Link to='#'>Your Account</Link>
                        </li>
                        <li>
                            <Link to='#'>Return Centre</Link>
                        </li>
                        <li>
                            <Link to='#'>100% Purchase Protection</Link>
                        </li>
                        <li>
                            <Link to='#'>Amazon App Download</Link>
                        </li>
                        <li>
                            <Link to='#'>Help</Link>
                        </li>
                    </ul>
                </div>
            </footer>

        </>



    )
}
