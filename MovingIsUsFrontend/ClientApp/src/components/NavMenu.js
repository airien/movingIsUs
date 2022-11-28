import React from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { Button } from '@mui/material';

export function NavMenu() {

  const [collapsed, setCollapsed] = React.useState(true);
  function toggleNavbar () {
    setCollapsed(!collapsed)
  }
  const logOut = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
        <NavbarBrand tag={Link} to="/">MovingIsUs - The experts</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/addOrder">Add new order</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/orders">Orders</NavLink>
            </NavItem>
            <NavItem>
              <Button variant="contained" onClick={() => logOut()}>LogOut</Button>
            </NavItem>
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
}
