import React, { Component } from "react";
import Axios from "axios";

class Homepage extends Component {
  constructor(props) {
    super();
    this.state = {
      redirect_uri: "",
    };
    this.revokeToken = this.revokeToken.bind(this);
  }

  componentDidMount() {
    Axios.get("http://localhost:5000/").then((res) => {
      this.setState({
        redirect_uri: res.data.url,
      });
    });
    console.log(this.state.redirect_uri);
  }

  revokeToken() {
    Axios.get("http://localhost:5000/google/deleteToken").then((res) => {
      console.log("Done");
    });
  }

  render() {
    return (
      <div className="container">
        <h2 style={{ paddingTop: 40 }}>oAuth 2.0</h2>
        
        <p className="text-justify">
        The application is capable of using google authentication and google drive functionalities to perform simple file uploading tasks. The application is implemented using Nodejs and Reactjs and the googleapis npm package is used in the backend Nodejs server to access google services APIs. The Google APIs are accessed after performing a successful oAuth 2.0 authorization and retrieving the tokens. 
        </p>
        <br/>
        <a href={this.state.redirect_uri} className="btn btn-block btn-primary">
          <span className="fa fa-google"></span> Login
        </a>

        {/* <Link to='/auth'>Auth</Link> */}
        {/* <button className="btn btn-danger" onClick={this.revokeToken}> 
          Logout
        </button> */}
      </div>
    );
  }
}

export default Homepage;
