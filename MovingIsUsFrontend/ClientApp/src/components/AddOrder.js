import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom"
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Moment from 'moment';
import OrderApi from './../api/order';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import Save from '@mui/icons-material/Save';
import Close from '@mui/icons-material/Close';

export function AddOrder() {
    const navigate = useNavigate()
    const options = [
        'Moving',
        'Packing',
        'Cleaning',
    ];
    const [addressFrom, setAddressFrom] = React.useState('');
    const [addressTo, setAddressTo] = React.useState('');
    const [email, SetEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [services, setServices] = React.useState([]);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [note, setNote] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [editing, setEditing] = React.useState(null);
    const [error, setError] = React.useState('');
    const [adding, setAdding] = React.useState(null);
    const saveEditService = () => {
        let s = [...services]
        s.splice(editing.id, 1, editing)
        setServices(s)
        setEditing(null)
    }
    const saveAddService = () => {
        let s = [...services]
        s.push(adding)
        setServices(s)
        setAdding(null);
    }

    const deleteService = (index) => {
        let s = [...services]
        s.splice(index)
        setServices(s)
        setEditing(null);
    }
    
      const postOrder = async () => {
        setIsLoading(true)
        try {
            let response = await OrderApi.AddOrder({
                name : name,
                email : email,
                phoneNumber : phoneNumber,
                addressFrom : addressFrom,
                addressTo : addressTo,
                orderDate : Moment().toISOString(),
                services : services, 
                note : note,
            })  
            if (response.data && response.data.success === false) {
                setIsLoading(false)
                return setError(response.data.msg);
            } else {
                navigate("/orders")
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false)
            if (err.response) {
                return setError(err.response.data.msg);
            }
            return setError("There has been an error.");
        }
    }
    function renderEditRow() {
        return (
        <tr key={editing.serviceId}>
            <td component="th" scope="row">
            <Dropdown options={options} onChange={(event) => setEditing({...editing, name:event.value})} value={editing.name ? editing.name : options[0]} placeholder="Select a service" />
                    </td>
            <td align="right">
                <TextField
                    id="datetime-local"
                    label="Date and time"
                    type="datetime-local"
                    defaultValue={Moment(editing.serviceDate).format("yyyy-MM-DDThh:mm")}
                    style={{ width: 250 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={(event) => {
                        console.log("event editing", event.target.value)
                        setEditing({...editing, serviceDate:Moment(event.target.value).toISOString()})
                    }}
                />
            </td>
            <td align="right">
            <IconButton onClick={() => setEditing(null)} color="primary" aria-label="upload picture" component="label">
                    <Close />
                </IconButton>
            </td>
            <td align="right">
            </td>
            <td>
                <IconButton onClick={() => saveEditService()} color="primary" aria-label="upload picture" component="label">
                    <Save />
                </IconButton>
            </td>
        </tr>
        )
    }
    function renderAddRow() {
       return( 
       <tr key={adding.id}>
            <td component="th" scope="row">
                    <Dropdown options={options} onChange={(event) => setAdding({...adding, name:event.value})} value={adding.name ? adding.name : options[0]} placeholder="Select a service" />
            </td>
            <td align="right">
                <TextField
                    id="datetime-local"
                    label="Date and time"
                    type="datetime-local"
                    defaultValue={Moment().format("yyyy-MM-DDThh:mm")}
                    style={{ width: 250 }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={(event) => setAdding({...adding, serviceDate:Moment(event.target.value).toISOString()})}
                />
            </td>
            <td align="right">
            </td>
            <td align="right">
            <IconButton onClick={() => setAdding(null)} color="primary" aria-label="upload picture" component="label">
                    <Close />
                </IconButton>
            </td>
            <td>
                <IconButton onClick={() => saveAddService()} color="primary" aria-label="upload picture" component="label">
                    <Save />
                </IconButton>
            </td>
        </tr>
       )
    }
    function renderServicesTable() {
        let addContent = adding === null
        ? ""
        : renderAddRow();
        let editContent = editing == null
        ? ""
        : renderEditRow();
        return (
            <Paper style={{ width: '100%', paddingTop: 20, paddingBottom: 20 }}>
              <table className="table table-striped" aria-labelledby="tableLabel" style={{ width: '100%' }} size="small" aria-label="a dense table">
                  <thead>
                  <tr style={{width:'100%'}}>
                    <td style={{width:'20%', padding: 8, borderBottom: '1px solid rgb(224, 224, 224)'}}>Name</td>
                    <td style={{width:'20%', padding: 8, borderBottom: '1px solid rgb(224, 224, 224)'}} align="right">Date</td>
                    <td style={{width:'20%', padding: 8, borderBottom: '1px solid rgb(224, 224, 224)'}} align="right">Edit</td>
                    <td style={{width:'20%', padding: 8, borderBottom: '1px solid rgb(224, 224, 224)'}} align="right">Delete</td>
                    <td style={{width:'20%', padding: 8, borderBottom: '1px solid rgb(224, 224, 224)'}} align="right">
                        <IconButton onClick={() => {
                                setAdding({serviceId: uuidv4(), name:options[0], serviceDate: Moment().toISOString()})
                                console.log("adding", services.length)
                            }} color="primary" aria-label="upload picture" component="label">
                            <Add />
                        </IconButton>
                    </td>
                  </tr>
                  </thead>

                <tbody>
                  {services.map((row, index) => (
                    <tr key={row.name}>
                        <td component="th" scope="row">
                            {row.name}
                        </td>
                        <td align="right">{Moment(row.serviceDate).format('DD.MM.YYYY HH:mm')}</td>
                      <td align="right">
                             <IconButton onClick={() => setEditing({...row, serviceId: uuidv4(), serviceDate: Moment().toISOString()})} color="primary" aria-label="upload picture" component="label">
                                 <Edit />
                            </IconButton>
                        </td>
                        <td align="right">
                             <IconButton onClick={() => deleteService(index)} color="primary" aria-label="upload picture" component="label">
                                 <Delete />
                            </IconButton>
                        </td>
                        <td></td>
                    </tr>
                  ))}
                  {addContent}
                  {editContent}
                </tbody>
              </table>
            </Paper>
        );    
    }
    function renderAddOrderForm() {
        return (
            <Paper elevation={3} style={{padding:16}}>
                <TextField
                        style={{width:"100%"}}
                        id="input-with-icon-textfield"
                        name="name"
                        label="Name"
                        size="small"
                        margin="normal"
                        variant="standard"
                        onChange={(event) => setName(event.target.value)}
                    />
                <TextField
                        style={{width:"100%"}}
                        id="input-with-icon-textfield"
                        name="email"
                        label="EMail"
                        size="small"
                        margin="normal"
                        variant="standard"
                        onChange={(event) => SetEmail(event.target.value)}
                    />
                <TextField
                        style={{width:"100%"}}
                        id="input-with-icon-textfield"
                        name="phoneNumber"
                        label="Phone number"
                        size="small"
                        margin="normal"
                        variant="standard"
                        onChange={(event) => setPhoneNumber(event.target.value)}
                    />
                <TextField
                        style={{width:"100%"}}
                        id="input-with-icon-textfield"
                        name="addressFrom"
                        label="Address from"
                        size="small"
                        margin="normal"
                        variant="standard"
                        onChange={(event) => setAddressFrom(event.target.value)}
                    />
                <TextField
                        style={{width:"100%"}}
                        id="input-with-icon-textfield"
                        name="addressTo"
                        label="Address to"
                        size="small"
                        margin="normal"
                        variant="standard"
                        onChange={(event) => setAddressTo(event.target.value)}
                    />
                <TextField
                        style={{width:"100%"}}
                        id="input-with-icon-textfield"
                        name="note"
                        label="Note"
                        multiline
                        maxRows={4}
                        margin="normal"
                        variant="standard"
                        onChange={(event) => setNote(event.target.value)}
                    />
                    {renderServicesTable()}
                <Button
                    variant="contained"
                    onClick={async () => { postOrder(); } }
                    >Save</Button>

            </Paper>
        );
      }
    
    let contents = isLoading
    ? <p><em>Loading...</em></p>
    : renderAddOrderForm();
    let errorMsg = error ? <p style={{color : 'red'}}>{error}</p> : "";
    return (
        <div>
        <h1 id="tableLabel">Add Order</h1>
        <p>Please fill inn all info to add order</p>
        {contents}
        {errorMsg}
        </div>
    );
}