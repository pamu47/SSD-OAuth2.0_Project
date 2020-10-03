import React, { Component } from "react";
import Axios from "axios";

class FunctionsPage extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      picture: "",
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:5000/google/getProfile").then((res) => {
      console.log(res.data);
      this.setState({
        name: res.data.name,
        picture: res.data.picture,
      });
    });
  }

  render() {
    return (
      <div className="container text-center">
        <div className="row" style={{ paddingTop: 50 }}>
          <div className="col-6">
            <div className="container text-left">
              <h2 style={{ fontFamily: "Ubuntu" }}>{this.state.name}</h2>
              <br />
              <img
                src={this.state.picture}
                style={{ width: 250, height: 250 }}
                alt="profile"
              />
            </div>
          </div>
          <div className="col-6" style={{ paddingTop: 50 }}>
          <a href="/" class="btn btn-block btn-lg btn-success"><span class="fa fa-cloud-upload"></span> Upload Files</a>
          <br/><hr/><br/>
          <a href="/" class="btn btn-block btn-lg btn-info"><span class="fa fa-folder-open"></span> View Files</a>
          </div>
        </div>
      </div>
    );
  }
}

export default FunctionsPage;
