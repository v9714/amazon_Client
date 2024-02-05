import axios from "axios"

class ApiHelper {
    constructor() {
        // this.baseUrl = "http://localhost:5000";
        this.baseUrl = process.env.REACT_APP_APIUrl;
        console.log(process.env.REACT_APP_APIUrl)

    }


    // Product 
    getProduct() {
        return axios.get(`${this.baseUrl}/product/`,
            {
                withCredentials: true,
            }
        )
    }
    getProductById(id) {
        return axios.post(`${this.baseUrl}/product/${id}`)
    }

    productLike(data) {
        return axios.post(`${this.baseUrl}/product/like`, data)
    }
    getproductLike() {
        return axios.get(`${this.baseUrl}/product/getlike`)
    }


    // User 
    registerUser(userData) {

        return axios.post(`${this.baseUrl}/user/createuser`, userData, { withCredentials: true });
    }

    loginUser(userData) {
        return axios.post(`${this.baseUrl}/user/loginUser`, userData, { withCredentials: true });
    }






}
const apiHelper = new ApiHelper();
export default apiHelper


