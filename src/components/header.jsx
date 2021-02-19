import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">
          <img  src="https://getmasari.org/images/icons/logo.png" width="59" height="59" className="d-inline-block align-top" alt="" /> <h1>masari gift card generator</h1>
          </a>
        </nav>
      </>
    )
  }
}

export default Header;