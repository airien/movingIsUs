import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import OrderApi from '../api/order';
import Moment from 'moment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';

export function Orders() {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(true);
  const [orders, setOrders] = React.useState([]);
  const [isSearch, setIsSearch] = React.useState(false);
  const [searchedOrders, setSearchedOrders] = React.useState([]);
  const [error, setError] = React.useState('');
    
  useEffect(() => {
    populateData();
  },[]);
  const populateData = async() => {
    let response = await OrderApi.GetOrders();
    if (response.data && response.data.success === false) {
      setOrders([]);
      setLoading(false);
      return;
    }
    setOrders(response.data);
    setLoading(false);
  }
  const updateSearch = (event) => {
    let term = event.target.value
    if (term && term.length > 0) {
      console.log("orders", orders);
      let searched = orders.filter(order => (order.name && order.name.startsWith(term))|| (order.email && order.email.startsWith(term)));
      setSearchedOrders(searched);
      setIsSearch(true);
    } else {
      setIsSearch(false);
      setSearchedOrders([]);
    }
    console.log("searchedOrders", searchedOrders);
  } 
  const deleteOrder = async (id) => {
    setLoading(true)
    try {
        let response = await OrderApi.DeleteOrder(id)  
        if (response.data && response.data.success === false) {
            setLoading(false)
            return setError(response.data.msg);
        } else {
          setLoading(false);
          populateData();
        }
    } catch (err) {
        console.log(err);
        setLoading(false)
        if (err.response) {
            return setError(err.response.data.msg);
        }
        return setError("There has been an error.");
    }
}

  function renderOrderTable(orders) {
    return (
      <div>
 <TextField
        style={{width:"100%"}}
        id="input-with-icon-textfield"
        name="search"
        label="Search"
        size="small"
        margin="normal"
        variant="standard"
        onChange={updateSearch}
    />
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>Services</th>
            <th>Note</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {(isSearch?searchedOrders:orders).map(order =>
            <tr key={order.orderDate}>
              <td>{Moment(order.orderDate).format('DD.MM.YYYY hh:mm')}</td>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{order.services?order.services.map(x => x.name).toString():""}</td>
              <td>{order.note}</td>
              <td>       
                <IconButton onClick={() => navigate('/editOrder', {state: {id: order.orderId}})} color="primary" aria-label="upload picture" component="label">
                      <Edit />
                </IconButton>
              </td>
              <td>
              <IconButton onClick={() => deleteOrder(order.id)} color="primary" aria-label="upload picture" component="label">
                    <Delete />
              </IconButton>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
     
    );
  }

    let contents = loading
      ? <p><em>Loading...</em></p>
      : renderOrderTable(orders);
      let errorMsg = error ? <p style={{color : 'red'}}>{error}</p> : "";
    
    return (
      <div>
        <h1 id="tableLabel">Orders</h1>
        <p>These are the current active orders</p>
        {contents}
        {errorMsg}
      </div>
    );
}
