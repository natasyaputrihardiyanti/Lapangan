import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import "../Css/Table.css";
import 'font-awesome/css/font-awesome.min.css';

class User extends Component {
  constructor() {
    super();
    this.state = {
      member: [],
      id: "",
      username: "",
      email: "",
      password: "",
      role: "",
      no_hp:"",
      first_name: "",
      last_name: "",
      gender: "",
      alamat:"",
      date_birth: "",
      image: "null",
      action: "",
      find: "",
      message: ""
    }

    // jika tidak terdapat data token pada local storage
    if(!localStorage.getItem("Token")){
      // direct ke halaman login
      window.location = "/login";
    }
  }

    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }
    // bindImage = (e) => {
    //   this.setState({image: e.target.files[0]})
    // }

    Add = () => {
      // membuka modal
      $("#modal_user").modal("show");
      // mengosongkan data pada form
      this.setState({
        action: "insert",
        id: "",
        username: "",
        email: "",
        password: "",
        role: "",
        no_hp:"",
        first_name: "",
        last_name: "",
        gender: "",
        alamat:"",
        date_birth: "",
        image: "null",
      });
    }

    Edit = (item) => {
      // membuka modal
      $("#modal_user").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        id: item.id,
        username: item.username,
        email: item.email,
        password: item.password,
        role: item.role,
        no_hp:item.no_hp,
        first_name: item.first_name,
        last_name: item.last_name,
        gender: item.gender,
        alamat:item.alamat,
        date_birth: item.date_birth,
        image: item.image,
      });
    }

    get_member = () => {
      // $("#loading").toast("show");
      let url = "http://localhost/lapangan/public/member";
      axios.get(url)
      .then(response => {
        this.setState({member: response.data.member});
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
    }

    Drop = (id) => {
      if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        // $("#loading").toast("show");
        let url = "http://localhost/lapangan/public/member/drop/"+id;
        axios.delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({message: response.data.message});
          $("#message").toast("show");
          this.get_member();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    componentDidMount = () => {
      this.get_member();
    }

    Save = (event) => {
      event.preventDefault();
      // menampilkan proses loading
      // $("#loading").toast("show");
      // menutup form modal
      $("#modal_user").modal("hide");
      let url = "http://localhost/lapangan/public/member/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id", this.state.id);
      form.append("username", this.state.username);
      form.append("email", this.state.email);
      form.append("password", this.state.password);
      form.append("role", this.state.role);
      form.append("no_hp", this.state.no_hp);
      form.append("first_name", this.state.first_name);
      form.append("last_name", this.state.last_name);
      form.append("gender", this.state.gender);
      form.append("alamat", this.state.alamat);
      form.append("date_birth", this.state.date_birth);
      if(form.has('image')){
      form.append("image", this.state.image, this.state.image.name);}

      axios.post(url, form)

      .then(response => {
        // $("#loading").toast("hide");
        this.setState({message: response.data.message});
        $("#message").toast("show");
        this.get_member();
      })
      .catch(error => {
        console.log(error);
      });
    }

    search = (event) => {
      if(event.keyCode === 13) {
        $("#loading").toast("show");
        let url = "http://localhost/lapangan/public/member/find";
        let form = new FormData();
        form.append("find", this.state.find);
        axios.post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({member: response.data.member});
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    render(){
      return(
        <body>
    <div class="container">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row ">
                    <div class="col-sm-4 ">
						<div class="show-entries">
                <Modal id="modal_user" title="Form User" bg_header="light"
                text_header="dark">
                    <form onSubmit={this.Save}>
                    ID
                    <input type="text" className="form-control" name="id" value={this.state.id}
                      onChange={this.bind} required />
                    Username
                    <input type="text" className="form-control" name="username"
                      value={this.state.username} onChange={this.bind} required />
                      Email
                      <input type="email" className="form-control" name="email"
                        value={this.state.email} onChange={this.bind} required />
                    Password
                    <input type="password" className="form-control" name="password"
                      value={this.state.password} onChange={this.bind} required />
                    Role
                    <select name="role" className="form-control" value={this.state.role}
                      onChange={this.bind} required >
                        <option value="">Pilih Kategori</option>
                          <option value="member">M</option>
                          <option value="admin">A</option>
                    </select>
                      No Hp
                      <input type="text" className="form-control" name="no_hp" value={this.state.no_hp}
                        onChange={this.bind} required />
                    First Name
                      <input type="text" className="form-control" name="first_name" value={this.state.first_name}
                        onChange={this.bind} required />
                    Last Name
                    <input type="text" className="form-control" name="last_name" value={this.state.last_name}
                        onChange={this.bind} required />
                        Alamat
                        <input type="text" className="form-control" name="alamat" value={this.state.alamat}
                            onChange={this.bind} required />
                    Gender
                    <select name="gender" className="form-control" value={this.state.gender}
                      onChange={this.bind} required >
                      <option value="">Pilih Kategori</option>
                          <option value="L">Laki-Laki</option>
                          <option value="P">Perempuan</option>
                    </select>
                  Date Birth
                    <input type="date" className="form-control" name="date_birth" value={this.state.date_birth}
                      onChange={this.bind} required />

                    <button type="submit" className="btn btn-info pull-right m-2">
                      Simpan
                    </button>
                    </form>
                    </Modal>
						</div>
					</div>
					<div class="col-sm-4 ">
						<h2 class="text-center">User <b>Details</b></h2>
					</div>
                    <div class="col-sm-4">
                        <div class="search-box">
							<div class="input-group">
								<span class="input-group-addon"><i class="fa fa-search"></i></span>
                <input type="text" className="form-control" name="find"
                    onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                    placeholder="Search..." />
							</div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <table class="table table-bordered shadow">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>No Hp</th>
                        <th>First Name </th>
                        <th>Last Name</th>
                        <th>Alamat</th>
                        <th>Gender</th>
                        <th>Date Birth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.member.map((item,index)=>{
                  return(
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                        <td>{item.role}</td>
                        <td>{item.no_hp}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.alamat}</td>
                        <td>{item.gender}</td>
                        <td>{item.date_birth}</td>
                        <td>
                          <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="fa fa-pencil" onClick={() => this.Edit(item)}></i></a>
                          <a href="#" class="delete" title="Delete" data-toggle="tooltip"><i class="fa fa-trash-o"onClick={() => this.Drop(item.id)} ></i></a>
                        </td>
                    </tr>
                  );
              }  )}

                </tbody>
            </table>
            <button className="btn btn-light my-3" onClick={this.Add}>
                <span className="fa fa-plus-circle" title="tambah data"></span>
                </button>
        </div>
    </div>
</body>
      );
    }




}
export default User;
