import React, { Component } from "react";
import Axios from 'axios';

class Auth extends Component {
  constructor(props) {
    super();
    this.state = {
      code: "",
      token: "",
      status_msg: ""
    };
  }

  async componentDidMount() {
    const code = await this.getCode();
    this.setState({
      code: code,
    });
    console.log("Code " + this.state.code);
    const dataToSend = {
      code: code
    }
    Axios.post('http://localhost:5000/google/getToken', dataToSend).then(res => {
      console.log(res.data)
        if(res.data.status === 400){
            this.setState({
                status_msg: res.data.msg
            })
            console.log(this.state.status_msg)
        }else if(res.data.status === 200){
          this.setState({
            status_msg: res.data.msg
        })
        console.log(this.state.status_msg)
            this.props.history.push(`/functions`)
        }else{
            this.setState({
                status_msg: "Something went wrong!!"
            })
            console.log(this.state.status_msg)
        }
    })
  }

  async getCode() {
    var query = window.location.search.substring(1);
    console.log(query);
    var vars = query.split("&");
    var pair = vars[0].split("=");
    // console.log(pair);
    return pair[1];
  }

  render() {
    return (
    <div className="container">
      This is a change...

    Status: <p>{this.state.status_msg}</p>
    </div>
    );
  }
}

export default Auth;
