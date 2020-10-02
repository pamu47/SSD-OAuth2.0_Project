import React, {Component} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class Homepage extends Component{
    constructor(props){
        super()
        this.state = {
            redirect_uri: ''
        }
        this.revokeToken = this.revokeToken.bind(this)
    }

    componentDidMount(){
        Axios.get('http://localhost:5000/').then(res => {
            this.setState({
                redirect_uri: res.data.url
            })
        })
        console.log(this.state.redirect_uri)
    }

    revokeToken(){
        Axios.get('http://localhost:5000/google/deleteToken').then(res => {
            console.log("Done")
        })
    }

    render(){
        return(
            <div className="container">
                <h2>Homepage!</h2>
                <br/>
                <a href={this.state.redirect_uri} className="btn btn-block btn-primary"><span className="fa fa-google"></span> Login</a>

                <Link to='/auth'>Auth</Link>
                <button className="btn btn-danger" onClick={this.revokeToken}>Logout</button>
                
            </div>
        )
    }
}

export default Homepage