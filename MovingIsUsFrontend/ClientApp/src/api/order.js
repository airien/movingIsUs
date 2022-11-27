import axios from "./index";

class OrderApi {

  static GetOrders = () => {
    return axios.get('api/orders');
  };

  // don't forget to add the register and logout methods
}

export default OrderApi;