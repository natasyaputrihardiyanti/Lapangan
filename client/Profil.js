import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import User from '../page/User';
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

export default class Profil extends React.Component {
  constructor() {
    super();
    this.state = {
      profil: [],
      id: "",
      username:"",
      email:"",
      password:"",
      no_hp:"",
      first_name: "",
      last_name: "",
      gender: "",
      alamat:"",
      date_birth: "",
      action: "",
      find: "",
      message: ""

}
  if(!localStorage.getItem("Token")){
    // direct ke halaman login
    window.location = "/login";
    }
  }
    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }
    bindImage = (e) => {
      this.setState({image: e.target.files[0]})
    }
    Edit_user = (item) => {
      // membuka modal
      $("#modal_user").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        id: item.id,
        username:item.username,
        email:item.email,
        first_name: item.first_name,
        last_name: item.last_name,
        gender:item.gender,
        alamat:item.alamat,
        date_birth:item.date_birth,
        no_hp:item.no_hp,
      });
    }
  get_user = () => {
    // $("#loading").toast("show");
    let user_session = JSON.parse(localStorage.getItem('users'))
    let id = user_session.id
    // console. log(items)
    let url = "http://localhost/lapangan/public/myprofil/"+id;
    axios.get(url)
    .then(response => {
    // $("#loading").toast("hide");
    this.setState({
      profil: response.data.profil,
    });// $("message-).toast("show");
  })
  .catch(error => {
  console.log(error);
  });
// this. setltate({
// user: items,
// id user: items.id_user
 // });
 }
 componentDidMount = ()=>{
 this.get_user();
}

  Save= (event) => {
    console.log(this.state.id_user)
    event.preventDefault();

    $("#modal_user").modal("hide");
    let url = "http://localhost/lapangan/public/myprofil/save";
    let form = new FormData();
      form.append("action", this.state.action);
      form.append("id", this.state.id);
      form.append("username", this.state.username);
      form.append("email", this.state.email);
      form.append("first_name", this.state.first_name);
      form.append("last_name", this.state.last_name);
      form.append("gender", this.state.gender);
      form.append("date_birth", this.state.date_birth);
      form.append("no_hp", this.state.no_hp);
      form.append("alamat", this.state.alamat);

    axios.post(url, form)
    .then(response => {
     // $("#loading").toast("hide");
    this.setState({
    message: response.data.message});
    $("#message").toast("show");
    this.get_user();
    })
    .catch(error => {
    console.log(error);
    });
  }


  Pwd = (item) => {
    console.log(this.state.id_user)

    if (this.state.password == this.state.repassword ){
    let url = "http://localhost/lapangan/public/myprofil/pwd";
    let form = new FormData();
      form.append("action", this.state.action);
      form.append("username", this.state.username);
      form.append("password", this.state.password);
    axios.post(url)
    .then(response => {
    alert(response.data.message)
      $("#loading").toast("hide");
    })
    .catch(error => {
      console.log(error);
    });
  }
}

  EditPwd = (item) => {
    // membuka modal
    $("#modal_pwd").modal("show");
    // mengisikan data pada form
    this.setState({
      action: "update",
      username:item.username,
      password:item.password,
    });
  }




  render() {
    let user_session = JSON.parse(localStorage.getItem('users'))

      return (
          <div className=" container">
              <div className="row">
                  <div className="col-lg-0">

                      <div>
                      </div>
                  </div>
                  <div className="col-lg-6">
                  <h2 className="my-4 text-center">🅟🅡🅞🅕🅘🅛</h2>
                      <br></br><br></br>

                      {

                        this.state.profil.map((item,index) => {
                          console.log(this.state.profil);
                          return (

                      <table className="table table-md shadow-lg">
                          <ul class="list-group">
                               <li class="list-group-item">ID user : {item.id}</li>
                               <li class="list-group-item">Username : {item.username}</li>
                               <li class="list-group-item">Email : {item.email}</li>
                              <li class="list-group-item">First Name : {item.first_name}</li>
                              <li class="list-group-item">Last Name : {item.last_name}</li>
                              <li class="list-group-item">Gender: {item.gender}</li>
                              <li class="list-group-item">Date Birth : {item.date_birth}</li>

                          </ul>
                      </table>
                    );
                })}
                      <button className=" btn float-right btn-info" onClick={() => this.Edit_user(user_session)}>
                          <span className="fa fa-edit"></span> Edit Profil
                      </button>

                      <button className="btn float-left btn-info" onClick={() => this.EditPwd(user_session)}>
                          <span className="fa fa-edit"></span> Edit Password
                      </button>

                      <Modal id="modal_user" title="Form Profil" bg_header="success" text_header="white">
                          <form onSubmit={this.Save}>
                              Id User
                                  <input type="text" className="form-control" name="id_user" value={this.state.id_user}
                                  onChange={this.bind} required />
                              Username
                                  <input type="text" className="form-control" name="username" value={this.state.username}
                                    onChange={this.bind} required />
                                    Email
                                        <input type="email" className="form-control" name="email" value={this.state.email}
                                          onChange={this.bind} required />
                              First Name
                                  <input type="text" className="form-control" name="first_name"
                                  value={this.state.first_name} onChange={this.bind} required />
                              Last Name
                                      <input type="text" className="form-control" name="last_name"
                                      value={this.state.last_name} onChange={this.bind} required />
                              Gender
                                <select name="gender" className="form-control" value={this.state.gender}
                                  onChange={this.bind} required >
                                    <option value="">Pilih Kelamin</option>
                                      <option value="L">Laki-Laki</option>
                                      <option value="P">Perempuan</option>
                                      </select>
                              Tanggal lahir
                                  <input type="date" className="form-control" name="date_birth"
                                  value={this.state.date_birth} onChange={this.bind} required />


                              <button type="submit" className="btn btn-info pull-right m-2" >
                                  <span className="fa fa-check"></span> Simpan
                                  </button>
                          </form>
                      </Modal>
                      <Modal id="modal_pwd" title="Form PAssword" bg_header="success" text_header="white">
                          <form onSubmit={this.Pwd}>
                          Username
                              <input type="text" className="form-control" name="username" value={this.state.username}
                                onChange={this.bind} required />
                            Password
                                  <input type="password" className="form-control" name="password"
                                  value={this.state.password} onChange={this.bind} required />
                                  rePassword
                                        <input type="password" className="form-control" name="repassword"
                                        value={this.state.repassword} onChange={this.bind} required />


                              <button type="submit" className="btn btn-info pull-right m-2" >
                                  <span className="fa fa-check"></span> Simpan
                                  </button>
                          </form>
                      </Modal>
                  </div>
              </div>
              <hr />

          </div>

      );
  }
  }
