import axios from "axios"

class ApiHelper {
    constructor() {
        this.baseUrl = "http://localhost:5000";
        // this.baseUrl = process.env.REACT_APP_APIUrl;
        // console.log(process.env.REACT_APP_APIUrl)
    }

    // Product 
    getProduct() {
        return axios.get(`${this.baseUrl}/product/`,
            // {
            //     withCredentials: false ,
            // }
        )
    }
    getProductById(id) {
        return axios.post(`${this.baseUrl}/product/${id}`)
    }
    productLike(data) {
        return axios.post(`${this.baseUrl}/product/like`, data)
    }
    getproductLike(id) {
        return axios.get(`${this.baseUrl}/product/getlike/${id}`)
    }
    // User 
    registerUser(userData) {

        return axios.post(`${this.baseUrl}/user/createuser`, userData, { withCredentials: true });
    }
    loginUser(userData) {
        return axios.post(`${this.baseUrl}/user/loginUser`, userData, { withCredentials: true });
    }

    // cart 
    addCart(data) {
        return axios.post(`${this.baseUrl}/cart/add`, data);
    }
    GetCart(id) {
        return axios.get(`${this.baseUrl}/cart/get/${id}`);
    }
    DeleteCart(id) {
        return axios.delete(`${this.baseUrl}/cart/delete/${id}`);
    }

    ChackOut(data) {
        return axios.post(`${this.baseUrl}/chackout/add`, data);
    }
    addAddress(data) {
        return axios.post(`${this.baseUrl}/address/add`, data);
    }
    // get Address 
    GetAddress(id) {
        return axios.get(`${this.baseUrl}/address/get/${id}`);
    }
    getChackout(id) {
        return axios.get(`${this.baseUrl}/chackout/get/${id}`);
    }
    getproductByCarts(data) {
        return axios.post(`${this.baseUrl}/product/bycarts`, data);
    }
    // PlaceOrder
    addPlaceOrder(data) {
        return axios.post(`${this.baseUrl}/PlaceOrder/add`, data);
    }

    PaymentVerfy(details) {
        return axios.post(this.baseUrl + "/PlaceOrder/paymentverify", details)
    }









}
const apiHelper = new ApiHelper();
export default apiHelper


