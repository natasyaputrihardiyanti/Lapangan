import React,{Component} from "react";
// melakukan request http
import axios from "axios";
// memberi informasi dalam bentuk text
import Toast from "../component/Toast";
import $ from "jquery";
import {Link} from 'react-router-dom';
import "../Css/Login.css"

class Login extends Component {
  constructor() { // fungsi yang pertama kali di jalankan
    super();
    this.state = { // inisiasi state ( menyiapkan tempat data yang dibutuhkan )
      username: "",
      password: "",
      role:"",
      message: ""
    }
  }

  bind = (event) => { // menghubungkan state dan elemen
    this.setState({[event.target.name]: event.target.value});
  }

  Login = (event) => {
    event.preventDefault();

    let url = "http://localhost/lapangan/public/login";

    // memanggil file
    let form = new FormData();
    // membungkus data yang akan dikirim melalui API
    form.append("username", this.state.username); // append : memasukkan item ke form data
    form.append("password", this.state.password);
    axios.post(url, form) // mengirim data
    .then(response => { // mendapat response
      let logged = response.data.status; // mengecek status berhasil atau tidak
      if (logged) {
        // jika login berhasil
        this.setState({message: "Login Berhasil"});
        //menyimpan data token pada local storage
        localStorage.setItem("Token", response.data.token);
        //menyimpan data login user ke local storage
        localStorage.setItem("users", JSON.stringify(response.data.users));
        //direct ke halaman data siswa
        window.location = "/home";
      } else {
        // jika login gagal
        this.setState({message: "Login Gagal"});
      }
      $("#message").toast("show"); // menampilkan pesan
    })
    .catch(error => {
      console.log(error); // menampilkan pesan error
    })
  }

  render(){ // menampilkan elemen pada halaman web
    return(
      <body>
        <div class="container">
          <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div class="card card-signin my-5">

                <div class="card-body">
                  <h5 class="card-title text-center">Sign In</h5>
                  <form class="form-signin" onSubmit={this.Login}>
                    <div class="form-label-group">
                      <input type="text" name="username" class="form-control" placeholder="Email" value={this.state.username} onChange={this.bind} required />
                      <label for="username">Email</label>
                    </div>

                    <div class="form-label-group">
                      <input type="password" name="password" class="form-control" placeholder="Password" value={this.state.password} onChange={this.bind} required/>
                      <label for="inputPassword">Password</label>
                    </div>

                    <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Login</button>
                    <hr class="my-4"/>
                  Dont have any account?  <a class="text-center text-primary" href="/register">Register<p></p></a>

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
export default Login;
