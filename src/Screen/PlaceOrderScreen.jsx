// key_id,key_secret
// rzp_test_YIHdAJpQRK0nR9,96KT5E750qQ5WaLfABCgCr0w




import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import jwtDecode from "jwt-decode"
import HandlePayment from "../Commn/LoadRazorpay"
import { CookieContext } from "../Context/Cookies"
import apiHelper from "../Commn/ApiHelper"
import CheckOutSteps from "../components/CheckOutSteps"



export default function PlaceOrderScreen(props) {



    const [getAddress, setGetAddress] = useState([])
    const location = useLocation();
    const userData = useContext(CookieContext);
    const nagiget = useNavigate();
    let user;

    const redirect = location.search.split("?redirect=")[1]
    const navigate = useNavigate()

    const [cart, setCart] = useState([]);
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(false); // eslint-disable-next-line
    const [error, setError] = useState("")

    const [SummaryDetails, setSummaryDetails] = useState({
        address: "",
        chackout: false,
        paymet: null,
        products: {},
        totalAmount: 0,
        totalIteams: 0,


    })

    const GETCart = async () => {
        try {
            if (!userData.cookiess.user) {
                nagiget("/login");
                return;
            }
            user = jwtDecode(userData?.cookiess?.user)
            setIsLoading(true)
            const [adress, chackOut] = await Promise.all([apiHelper.GetAddress(user._id), apiHelper.getChackout(user._id)])
            if (adress && adress.status === 200) {
                setGetAddress(adress.data.address[0]);
                setIsLoading(false)
            }
            if (chackOut && chackOut.status === 200) {
                setSummaryDetails(chackOut.data.chackoutById[0])
            }
        } catch (error) {
            setCart([])
            setIsLoading(false)
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            }
            setError(error.message)
            return
        }
    }

    useEffect(() => {
        GETCart()// eslint-disable-next-line
    }, [])

    const caldata = async (tmp) => {
        try {
            // const result = await apiHelper.getproductByCarts({ data: tmp });
            const result = await apiHelper.getproductByCarts(tmp);
            if (result && result.status === 200) {
                setCart(result.data.Product)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        let tmp = [];
        if (SummaryDetails && SummaryDetails.products) {
            const productKeys = Object.keys(SummaryDetails.products);
            for (const key of productKeys) {
                tmp.push(key);
            }
            caldata(tmp);
        }
    }, [SummaryDetails]);

    const PlaceOrderHandle = async () => {
        try {
            if (!userData.cookiess.user) {
                nagiget("/login");
                return;
            }
            user = jwtDecode(userData?.cookiess?.user)
            const paymentMethod = redirect && redirect === "online" ? "online" : "cod"
            const OrderDetails = {
                userInfo: user,
                products: SummaryDetails.products,
                Items: SummaryDetails.totalIteams,
                totalPrice: SummaryDetails.totalAmount,
                shippingAddress: getAddress,
                paymentMethod: paymentMethod,
            }
            //eslint-disable-next-line
            const result = await apiHelper.addPlaceOrder(OrderDetails)
            console.log(result)


            if (!result.data.order.RazorpayDetails) {
                return navigate("/order/" + result.data.order._id)
            } else {

                const data = result.data.order
                const Options = {
                    name: data.shippingAddress.fullName,
                    phone: data.shippingAddress.mobile,
                    email: data.shippingAddress.email,
                    address: data.shippingAddress.Address,
                    apikey: data.RazorpayDetails.apikey,
                    amount: data.RazorpayDetails.amount,
                    currency: data.RazorpayDetails.currency,
                    razorpayOrderId: data.RazorpayDetails.id,
                    orderId: data._id,
                    userid: user._id,
                    produs_delete: SummaryDetails.products,
                    showError: setError,
                    navigate: navigate
                }
                HandlePayment(Options)
                console.log(Options);
            }

        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
                return
            }
            setError(error.message)
        }
    }

    return (
        <>
            <section className="h-100 gradient-custom">
                <div className="container py-4">
                    <CheckOutSteps signin={true} shipping={true} payment={true} placeorder={true} />
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-8">
                            <div className=" mb-4 shadow">
                                <div className="card-header py-3 ">
                                    <h5 className="mb-0">Review Your Order</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col  mb-lg-0">
                                            <h5>Shipping Imformation</h5>

                                            <div className="address d-flex mb-0 mt-3 mb-0">
                                                <h6>FullName :</h6>
                                                <p className="ms-3">{getAddress.fullName}</p>
                                            </div>

                                            <div className="address d-flex mb-0 mb-0 " style={{ marginTop: "-10px", marginBottom: "-20px" }}>
                                                <h6>Email :</h6>
                                                <p className="ms-3">{getAddress.email}</p>
                                            </div>

                                            <div className="address d-flex " style={{ marginTop: "-10px", marginBottom: "-20px" }}>
                                                <h6>Address :</h6>
                                                <p className="ms-3">{getAddress.Address}</p>
                                            </div>

                                            <div className="address d-flex  mb-0 mt-2 mb-0" style={{ marginTop: "-10px", marginBottom: "-20px" }}>
                                                <h6>Phone No :</h6>
                                                <p className="ms-3">{getAddress.mobile}</p>
                                            </div>

                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="row">
                                        <div className="col  mb-lg-0">
                                            <h5>Payment Imformation</h5>
                                            <div className="address d-flex align-items-center mb-0 mt-3 mb-0">
                                                <h6>Payment Method: -</h6>
                                                <p className="ms-3 text-danger fw-bold">{redirect && redirect === "online" ? "online" : "cod"}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4 " />
                                    <h5 className="mb-4">Order Imformation</h5>

                                    {
                                        cart.filter((x) => x.countInstock > 0).map((x) => {
                                            return (
                                                <>
                                                    <section className="h-100" style={{ backgroundColor: "#eee" }}>
                                                        <div className="container py-1 mb-2 h-100">
                                                            <div className="row d-flex justify-content-center align-items-center h-100">
                                                                <div className="col">
                                                                    {/* <div className="card shadow"> */}
                                                                    <div className="card-body p-1 pt-3">

                                                                        <div className="row">
                                                                            <div className="col-12 col-md-3">
                                                                                <img
                                                                                    src={x.image}
                                                                                    className="img-fluid"
                                                                                    alt="Shopping item"
                                                                                    style={{ maxWidth: "100%", height: "auto" }}
                                                                                />
                                                                            </div>
                                                                            <div className="col-12 col-md-3">
                                                                                <h5 className="mb-3">Name</h5>
                                                                                <h5>{x.title}</h5>
                                                                            </div>
                                                                            <div className="col-12 col-md-3">
                                                                                <h5 className="mb-3">Quantity</h5>
                                                                                <h5>{SummaryDetails.products[x._id]}</h5>
                                                                            </div>
                                                                            <div className="col-12 col-md-3">
                                                                                <h5 className="mb-3">Price </h5>
                                                                                <h5>$ {x.price}</h5>
                                                                            </div>
                                                                        </div>



                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </>
                                            )
                                        })
                                    }

                                    <hr className="my-4" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className=" mb-4 shadow">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Order Summary</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                            Items
                                            <span>{SummaryDetails.totalIteams}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0  px-0">
                                            Delivery
                                            <span>{SummaryDetails.delivery}</span>
                                        </li>

                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 ">
                                            Total
                                            <span>{SummaryDetails.totalAmount}</span>
                                        </li>
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center px-0 mb-3">
                                            Discount
                                            <span>₹ 53.98</span>
                                        </li>
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div>
                                                <strong>Order Total </strong>

                                            </div>
                                            <span><strong>₹ {SummaryDetails.totalAmount}</strong></span>
                                        </li>
                                    </ul>

                                    <div className="button justify-content-center ">

                                        <button type="button " onClick={PlaceOrderHandle} className="btn btn-warning btn-lg w-100" >Place your order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}