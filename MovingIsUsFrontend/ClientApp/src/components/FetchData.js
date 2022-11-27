import React, { Component } from 'react';
import OrderApi from '../api/order';
export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { orders: [], loading: true };
  }

  componentDidMount() {
    this.populateData();
  }

  static renderOrderTable(orders) {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order =>
            <tr key={order.orderDate}>
              <td>{order.date}</td>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{order.notes}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderOrderTable(this.state.orders);

    return (
      <div>
        <h1 id="tableLabel">Orders</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateData() {
    let response = await OrderApi.GetOrders();
    if (response.data && response.data.success === false) {
      this.setState({ orders: null, loading: false });
        //display error coming from server
        return;
    }
    this.setState({ orders: response.data, loading: false });
  }
}
