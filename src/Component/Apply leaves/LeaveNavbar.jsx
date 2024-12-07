// src/components/Navbar.js

import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const LeaveNavbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isManager = user && user.isManager;

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Leave Management System</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/dashboard">
            <Nav.Link>My Dashboard</Nav.Link>
          </LinkContainer>
          {isManager && (
            <LinkContainer to="/manager">
              <Nav.Link>Manager Dashboard</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default LeaveNavbar;
