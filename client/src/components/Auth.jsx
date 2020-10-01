import React, { Component } from "react";
// import Axios from 'axios';

class Auth extends Component {
  constructor(props) {
    super();
    this.state = {
      code: "",
      token: "",
    };
  }

  async componentDidMount() {
    const code = await this.getCode();
    this.setState({
      code: code,
    });
    console.log("Code is " + this.state.code);

  }

  async getCode() {
    var query = window.location.search.substring(1);
    console.log(query);
    var vars = query.split("&");
    var pair = vars[0].split("=");
    console.log(pair);
    return pair[1];
  }

  render() {
    return <div>This is a change...</div>;
  }
}

export default Auth;
