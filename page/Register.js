import React,{Component} from "react";
// melakukan request http
import axios from "axios";
// memberi informasi dalam bentuk text
import Toast from "../component/Toast";
import $ from "jquery";
import {Link} from 'react-router-dom';
import "../Css/CSS.css"
class Register extends Component {
  constructor() { // fungsi yang pertama kali di jalankan
    super();
    this.state = { // inisiasi state ( menyiapkan tempat data yang dibutuhkan )
      username: "",
      email: "",
      password:"",
      role:"member",
      message: ""
    }
  }

  bind = (event) => { // menghubungkan state dan elemen
    this.setState({[event.target.name]: event.target.value});
  }

  Save = (event) => {
    event.preventDefault();

    if (this.state.password == this.state.repassword ){
      let url = "http://localhost/lapangan/public/register";
      let form = new FormData();
      form.append("username", this.state.username)
      form.append("email", this.state.email)
      form.append("password", this.state.password)

      axios.post(url, form)
      .then(response => {
        this.setState ({message: response.data.message})
        this.get_users()

    })
    .catch(error => {
      console.log(error); // menampilkan pesan error
    })
    alert(this.state.message)
    alert("Register Berhasil")
    window.location="/login";
  }
  else{
    alert("Register Gagal")
    window.location="/register";

  }

  }

  render(){ // menampilkan elemen pada halaman web
    return(
  <body>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">

            <div class="card-body">
              <h5 class="card-title text-center">Sign Up</h5>
              <form class="form-signin" onSubmit={this.Save}>
                <div class="form-label-group">
                  <input type="text" name="username" class="form-control" placeholder="Username" value={this.state.nama_user} onChange={this.bind} required />
                  <label for="username">Username</label>
                </div>
                <div class="form-label-group">
                  <input type="email" name="email" class="form-control" placeholder="Email address" value={this.state.email} onChange={this.bind} required />
                  <label for="email">Email address</label>
                </div>

                <div class="form-label-group">
                  <input type="password" name="password" class="form-control" placeholder="Password" value={this.state.password} onChange={this.bind} required/>
                  <label for="inputPassword">Password</label>
                </div>
                <div class="form-label-group">
                  <input type="password" name="repassword" class="form-control" placeholder="rePassword" value={this.state.repassword} onChange={this.bind} required/>
                  <label for="inputPassword">rePassword</label>
                </div>

                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
                <hr class="my-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
    );
  }
}
export default Register;
