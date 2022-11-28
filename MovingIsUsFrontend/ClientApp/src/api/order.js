import axios from "./index";

class OrderApi {
    static GetOrders = () => {
        return axios.get('api/orders');
    };
    static GetOrder = (id) => {
        return axios.get('api/orders/'+id);
    };
    static AddOrder = (order) => {
        return axios.post('api/orders', order)
    }

    static DeleteOrder = (id) => {
        return axios.delete('api/orders/'+id);
    };
    static UpdateOrder = (id, order) => {
        return axios.put('api/orders/'+id, order);
    };

  // don't forget to add the register and logout methods
}

export default OrderApi;