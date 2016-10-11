import React from 'react';

// import { Nav, Navbar, NavItem, Header, Brand } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';
import css from '../../styles/style.css';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { OverlayTrigger, Button, Popover } from 'react-bootstrap';

import Main from '../Main';
import SignUpPopover from './SignUpPopover';
import LoginPopover from './LoginPopover';

import { signUpUser, loginUser, logoutUser } from '../../actionCreators/accountActions';

class Header extends React.Component {

  constructor(){
    super();
    this.state = {
      signUpEmail: '',
      signUpPassword: '',
      loginEmail: '',
      loginPassword: ''
    }
    // this.handleInputChange = this.handleInputChange.bind(this);
    this.logoutSubmit = this.logoutSubmit.bind(this);
  }

  handleInputChange(input) {
    var stateObj = {};
    stateObj[input.target.name] = input.target.value;
    this.setState(stateObj);
  }

  logoutSubmit(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  renderLinks(){
    if(this.props.authenticated){
      return <li className="nav-item">
        <Button onClick={this.logoutSubmit}>Logout</Button>
      </li>
    } else {
      return [
      <li className="nav-item" key={1}>

        {/* SIGNUP POPOVER */}
          <SignUpPopover signUpUser={this.props.signUpUser} handleInputChange={this.handleInputChange} />
      </li>,
      <li className="nav-item" key={2}>

        {/* LOGIN POPOVER */}
        <LoginPopover loginUser={this.props.loginUser} handleInputChange={this.handleInputChange} />
      </li>

      ];
    }
  }



 render(){
  return (
    <nav className="navbar navbar-light">
      <ul className="nav navbar-nav">
        {this.renderLinks()}
      </ul>
      <h1 className="title">
        <Link to="/">seekPad</Link>
      </h1>
      {this.props.authenticated ?
        <Button
          bsStyle="success"
          style={{'display':'inline', 'float': 'right'}}
          onClick={() => {browserHistory.push('/profile')}}
        >
          Profile
        </Button>

        :
        ''
      }
    </nav>
  );
 }

}

function mapStateToProps(state) {
  return {
    authenticated: state.auth
  }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ signUpUser, logoutUser, loginUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
