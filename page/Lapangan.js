import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import "../Css/Table.css";
import 'font-awesome/css/font-awesome.min.css';

class Lapangan extends Component {
  constructor() {
    super();
    this.state = {
      lapangan: [],
      id: "",
      nama:"",
      harga:"",
      image:null,
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
    bindImage = (e) => {
      this.setState({image: e.target.files[0]})
    }

    Add = () => {
      // membuka modal
      $("#modal_lapangan").modal("show");
      // mengosongkan data pada form
      this.setState({
        action: "insert",
        id: "",
        nama:"",
        harga:"",
        image:null,
      });
    }

    Edit = (item) => {
      // membuka modal
      $("#modal_lapangan").modal("show");
      // mengisikan data pada form
      this.setState({
        action: "update",
        id: item.id,
        nama: item.nama,
        nama: item.nama,
        image: item.image,
      });
    }

    get_lapangan = () => {
      // $("#loading").toast("show");
      let url = "http://localhost/lapangan/public/lapangan";
      axios.get(url)
      .then(response => {
        this.setState({lapangan: response.data.lapangan});
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
    }

    Drop = (id) => {
      if(window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
        // $("#loading").toast("show");
        let url = "http://localhost/lapangan/public/lapangan/drop/"+id;
        axios.delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({message: response.data.message});
          $("#message").toast("show");
          this.get_lapangan();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    componentDidMount = () => {
      this.get_lapangan();
    }

    Save = (event) => {
      event.preventDefault();
      // menampilkan proses loading
      // $("#loading").toast("show");
      // menutup form modal
      $("#modal_lapangan").modal("hide");
      let url = "http://localhost/lapangan/public/lapangan/save";
      let form = new FormData();
      form.append("action", this.state.action);
      form.append("id", this.state.id);
      form.append("nama", this.state.nama);
      form.append("harga", this.state.harga);
      form.append("image", this.state.image);

      axios.post(url, form)

      .then(response => {
        // $("#loading").toast("hide");
        this.setState({message: response.data.message});
        $("#message").toast("show");
        this.get_lapangan();
      })
      .catch(error => {
        console.log(error);
      });
    }

    search = (event) => {
      if(event.keyCode === 13) {
        $("#loading").toast("show");
        let url = "http://localhost/lapangan/public/lapangan/find";
        let form = new FormData();
        form.append("find", this.state.find);
        axios.post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({lapangan: response.data.lapangan});
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
                <Modal id="modal_lapangan" title="Form Lapangan" bg_header="light"
                text_header="dark">
                    <form onSubmit={this.Save}>
                    ID
                    <input type="text" className="form-control" name="id" value={this.state.id}
                      onChange={this.bind} required />
                    Nama
                    <input type="text" className="form-control" name="nama"
                      value={this.state.nama} onChange={this.bind} required />
                    Harga
                      <input type="number" className="form-control" name="harga"
                        value={this.state.harga} onChange={this.bind} required />
                    Gambar
                    <input type="file" className="form-control" name="image"
                     onChange={this.bindImage}  />

                    <button type="submit" className="btn btn-info pull-right m-2">
                      Simpan
                    </button>
                    </form>
                    </Modal>
						</div>
					</div>
					<div class="col-sm-4 ">
						<h3 class="text-center"><b>Lapangan</b> Details</h3>
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
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Gambar</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.lapangan.map((item,index)=>{
                  return(
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.nama}</td>
                        <td>{item.harga}</td>
                        <td><img src={'http://localhost/lapangan/public/images/' + item.image}
                               alt={item.image} width="200px" height="250px"/></td>

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
export default Lapangan;
