import React, { Component } from "react";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";

export default class AppNavbar extends Component<{}, any> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = { isOpen: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand tag={Link} to="/">
          Home
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            
            {/* <NavItem>
              <NavLink href="/sign-in">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/sign-up">Sign up</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink href="https://github.com/oktadeveloper/okta-spring-boot-react-crud-example">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
