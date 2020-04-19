import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import "../Css/Table.css";
import 'font-awesome/css/font-awesome.min.css';

class Sewa extends Component {
  constructor() {
    super();
    this.state = {
      sewa: [],
      id_sewa:"",
      id_lapangan: "",
      nama_lapangan: "",
      id_user: "",
      username: "",
      tgl_book:"",
      wkt_mulai: "",
      wkt_selesai: "",
      durasi: "",
      biaya:"",
      status: "",
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
      $("#modal_sewa").modal("show");
      // mengosongkan data pada form
      this.setState({
        action: "insert",
        id_sewa:"",
        id_lapangan: "",
        nama_lapangan: "",
        id_user: "",
        username: "",
        tgl_book:"",
        wkt_mulai: "",
        wkt_selesai: "",
        durasi: "",
        biaya:"",
        status: "",
      });
    }

    Edit = (item) => {
      // membuka modal
      $("#modal_sewa").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        id:item.id_sewa,
        id_lapangan: item.id_lapangan,
        nama_lapangan: item.nama_lapangan,
        id_user: item.id_user,
        username: item.username,
        tgl_book:item.tgl_book,
        wkt_mulai: item.wkt_mulai,
        wkt_selesai: item.wkt_selesai,
        durasi: item.durasi,
        biaya:item.biaya,
        status: item.status,
      });
    }

    get_sewa = () => {
      // $("#loading").toast("show");
      let url = "http://localhost/lapangan/public/sewa";
      axios.get(url)
      .then(response => {
        this.setState({sewa: response.data.sewa});
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
    }

    done = (item) => {
      // $("#loading").toast("show");
      let url = "http://localhost/lapangan/public/sewa/done/"+item.id_sewa;
      axios.post(url)
      .then(response => {
      alert(response.data.message)
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
    }

    Drop = (id) => {
      if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        // $("#loading").toast("show");
        let url = "http://localhost/lapangan/public/sewa/drop/"+id;
        axios.delete(url)
        .then(response => {
          $("#loading").toast("hide");
      alert(response.data.message)
          $("#message").toast("show");
          this.get_sewa();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    componentDidMount = () => {
      this.get_sewa();
    }

    Save = (event) => {
      event.preventDefault();
      // menampilkan proses loading
      // $("#loading").toast("show");
      // menutup form modal
      $("#modal_sewa").modal("hide");
      let url = "http://localhost/lapangan/public/sewa/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id_sewa", this.state.id_sewa);
      form.append("id_lapangan", this.state.id_lapangan);
      form.append("nama_lapangan", this.state.nama_lapangan);
      form.append("id_user", this.state.id_user);
      form.append("username", this.state.username);
      form.append("tgl_book", this.state.tgl_book);
      form.append("wkt_mulai", this.state.wkt_mulai);
      form.append("wkt_selesai", this.state.wkt_selesai);
      form.append("durasi", this.state.durasi);
      form.append("biaya", this.state.biaya);
      form.append("status", this.state.status);

      axios.post(url, form)

      .then(response => {
        // $("#loading").toast("hide");
        this.setState({message: response.data.message});
        $("#message").toast("show");
        this.get_sewa();
      })
      .catch(error => {
        console.log(error);
      });
    }

    search = (event) => {
      if(event.keyCode === 13) {
        $("#loading").toast("show");
        let url = "http://localhost/lapangan/public/sewa/find";
        let form = new FormData();
        form.append("tgl", this.state.tgl);
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
                <Modal id="modal_sewa" title="Form Data Sewa" bg_header="light"
                text_header="dark">
                    <form onSubmit={this.Save}>
                      ID Sewa
                      <input type="number" className="form-control" name="id_sewa" value={this.state.id_sewa}
                        onChange={this.bind}  />
                    ID Lapangan
                    <input type="text" className="form-control" name="id_lapangan"
                      value={this.state.id_lapangan} onChange={this.bind} required />
                    Nama Lapangan
                      <input type="text" className="form-control" name="nama_lapangan"
                        value={this.state.nama_lapangan} onChange={this.bind} required />
                    ID User
                    <input type="text" className="form-control" name="id_user"
                      value={this.state.id_user} onChange={this.bind} required />
                    Username
                    <input type="text" className="form-control" name="username"
                        value={this.state.username} onChange={this.bind} required />
                    Tanggal Booking
                    <input type="date" className="form-control" name="tgl_book"
                        value={this.state.tgl_book} onChange={this.bind} required />
                    Waktu Mulai
                    <input type="time" className="form-control" name="wkt_mulai"
                    value={this.state.wkt_mulai} onChange={this.bind} required />
                    Waktu Selesai
                    <input type="time" className="form-control" name="wkt_selesai"
                    value={this.state.wkt_selesai} onChange={this.bind} required />
                    Durasi
                    <input type="text" className="form-control" name="durasi"
                    value={this.state.durasi} onChange={this.bind} required />
                    Biaya
                    <input type="text" className="form-control" name="biaya"
                    value={this.state.biaya} onChange={this.bind} required />
                    Status
                    <select name="status" className="form-control" value={this.state.status}
                      onChange={this.bind} required >
                        <option value="">Pilih Kategori</option>
                          <option value="done">Selesai</option>
                          <option value="booked">Di Booking</option>
                    </select>
                    <button type="submit" className="btn btn-info pull-right m-2">
                      Simpan
                    </button>
                    </form>
                    </Modal>
						</div>
					</div>
					<div class="col-sm-4 ">
						<h4 class="text-center">Sewa <b>Details</b></h4>
					</div>
                    <div class="col-sm-4">
                        <div class="search-box">
							<div class="input-group">
								<span class="input-group-addon"><i class="fa fa-search"></i></span>
                <input type="text" className="form-control" name="find"
                    onChange={this.bind} value={this.state.tgl} onKeyUp={this.search}
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


                        <th>Id Sewa</th>
                        <th>Id Lapangan</th>
                        <th>Nama Lapangan</th>
                        <th>Id User</th>
                        <th>Username</th>
                        <th>Tanggal Booking</th>
                        <th>Waktu Mulai</th>
                        <th>Waktu Selesai</th>
                        <th>Durasi</th>
                        <th>Biaya</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.sewa.map((item,index)=>{
                  return(
                    <tr key={index}>

                          <td>{item.id_sewa}</td>
                        <td>{item.id_lapangan}</td>
                        <td>{item.nama_lapangan}</td>
                        <td>{item.id_user}</td>
                        <td>{item.username}</td>
                        <td>{item.tgl_book}</td>
                        <td>{item.wkt_mulai}</td>
                        <td>{item.wkt_selesai}</td>
                        <td>{item.durasi}</td>
                        <td>{item.biaya}</td>
                        <td>{item.status}</td>
                        <td>
                          <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="fa fa-pencil" onClick={() => this.done(item)}></i>done</a>
                          <a href="#" class="delete" title="Delete" data-toggle="tooltip"><i class="fa fa-trash-o"onClick={() => this.Drop(item.id_sewa)} ></i></a>
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
export default Sewa;
