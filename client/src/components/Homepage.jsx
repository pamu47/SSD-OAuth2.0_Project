import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

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
          OAuth is an open standard for access delegation, commonly used as a
          way for Internet users to grant websites or applications access to
          their information on other websites but without giving them the
          passwords.[1] This mechanism is used by companies such as Amazon,[2]
          Google, Facebook, Microsoft and Twitter to permit the users to share
          information about their accounts with third party applications or
          websites. Generally, OAuth provides clients a "secure delegated
          access" to server resources on behalf of a resource owner. It
          specifies a process for resource owners to authorize third-party
          access to their server resources without sharing their credentials.
          Designed specifically to work with Hypertext Transfer Protocol (HTTP),
          OAuth essentially allows access tokens to be issued to third-party
          clients by an authorization server, with the approval of the resource
          owner. The third party then uses the access token to access the
          protected resources hosted by the resource server.[3] OAuth is a
          service that is complementary to and distinct from OpenID. OAuth is
          unrelated to OATH, which is a reference architecture for
          authentication, not a standard for authorization. However, OAuth is
          directly related to OpenID Connect (OIDC), since OIDC is an
          authentication layer built on top of OAuth 2.0. OAuth is also
          unrelated to XACML, which is an authorization policy standard. OAuth
          can be used in conjunction with XACML, where OAuth is used for
          ownership consent and access delegation whereas XACML is used to
          define the authorization policies (e.g., managers can view documents
          in their region).
        </p>
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
