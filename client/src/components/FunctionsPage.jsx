import React, { Component } from "react";
import Axios from "axios";
import swal from "sweetalert2";
import './stylesheets/functions.css'

class FunctionsPage extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      picture: "",
      showForm: false,
      file: "",
    };
    this.displayForm = this.displayForm.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  displayForm() {
    this.setState({
      showForm: true,
    });
  }

  onChange(e) {
    // console.log(e.target.files[0]);
    this.setState({
      file: e.target.files[0],
    });
    console.log(this.state.file);
  }

  onSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.file);
    Axios.post("http://localhost:5000/google/upload", data).then((res) => {
      if (res.data.status === 500) {
        console.log(res.data);        
        swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data.msg
        });
      } else if (res.data.status === 200) {
        console.log(res.data);
        swal.fire({
          title: "Success",
          text: res.data.msg,
          icon: "success",
        });
      } else {
        swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data.msg
        });
      }
    });
  }

  render() {
    return (
      <div
        className="container text-center"
        style={{ fontFamily: "Monospace" }}
      >
        <div className="row" style={{ paddingTop: 50 }}>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="container text-left">
              <h2 style={{ fontFamily: "Monospace" }}>{this.state.name}</h2>
              <br />
              <img
                src={this.state.picture}
                style={{ width: 250, height: 250 }}
                alt="profile"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12" style={{ paddingTop: 50 }}>
            <button
              onClick={this.displayForm}
              class="btn btn-block btn-lg btn-success"
            >
              <span class="fa fa-cloud-upload"></span> Upload Files
            </button>
            <br />
            <hr />
            <br />
            {this.state.showForm ? (
              <div className="container card" style={{ padding:50 }}>
                <h2 className="heading text-left text-uppercase">Upload</h2>
                <br />
                <form
                  noValidate
                  onSubmit={this.onSubmit}
                  enctype="multipart/form-data"
                >
                  <div class="form-group text-left">
                    <label htmlFor="exampleFile" className="font-weight-bold">
                      Select a file to upload :
                    </label>
                    <br />
                    <br />
                    <input
                      type="file"
                      id="exampleFile"
                      name="file"
                      onChange={this.onChange}
                    />
                  </div>
                  <input
                    className="btn btn-success"
                    type="submit"
                    value="Upload"
                  />
                </form>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* Form container */}
        <div className="row">
          <div className="col-6"></div>
          <div className="col-6"></div>
        </div>
      </div>
    );
  }
}

export default FunctionsPage;
