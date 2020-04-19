import React, {Component} from 'react';
import {Link} from "react-router-dom";
class Navbar extends Component{
  Logout=() =>{
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("users");
    localStorage.removeItem("id");
    window.location="/login"
  }
    navAdmin=()=>{
        return(
            <div className=" bg-light shadow">
             <nav class="navbar navbar-expand-lg navbar-light ftco_navbar bg-light ftco-navbar-dark" id="ftco-navbar">
               <div class="container">
                 <a class="navbar-brand" ><span class="flaticon-lotus"></span>ˢHʷEͤAͤRͭT</a>
                 <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                   <span class="oi oi-menu"></span>
                 </button>

                 <div class="collapse navbar-collapse" id="ftco-nav">
                   <ul class="navbar-nav ml-auto">
                      <li class="nav-item"><a href="/user" class="nav-link">𝕦𝕤𝕖𝕣</a></li>
                      <li class="nav-item"><a href="/lapangan" class="nav-link">𝕝𝕒𝕡𝕒𝕟𝕘𝕒𝕟</a></li>
                      <li class="nav-item"><a href="/sewa" class="nav-link">𝕤𝕖𝕨𝕒</a></li>
                      <li class="nav-item"><a class="nav-link" onClick={this.Logout}>𝕃𝕠𝕘𝕠𝕦𝕥</a></li>

                   </ul>

                 </div>
               </div>
             </nav>

                      </div>
        );
    }
navMember=()=>{
  return(
      <div className=" bg-light shadow">
       <nav class="navbar navbar-expand-lg navbar-light ftco_navbar bg-light ftco-navbar-dark" id="ftco-navbar">
         <div class="container">
           <a class="navbar-brand" ><span class="flaticon-lotus"></span>ˢHʷEͤAͤRͭT</a>
           <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
             <span class="oi oi-menu"></span>
           </button>

           <div class="collapse navbar-collapse" id="ftco-nav">
             <ul class="navbar-nav ml-auto">
                <li class="nav-item"><a href="/home" class="nav-link">Home</a></li>
                <li class="nav-item"><a href="/profil" class="nav-link">Profil</a></li>

                <li class="nav-item"><a class="nav-link" onClick={this.Logout}>𝕃𝕠𝕘𝕠𝕦𝕥</a></li>

             </ul>

           </div>
         </div>
       </nav>

    </div>
  );
}

  render(){
    let auth = localStorage.getItem("Token")
    let role = localStorage.getItem("role")
      return(
        <div className=" bg-light shadow">
         <nav class="navbar navbar-expand-lg navbar-light ftco_navbar bg-light ftco-navbar-dark" id="ftco-navbar">
           <div class="container">
             <a class="navbar-brand" ><span class="flaticon-lotus"></span></a>
             <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
               <span class="oi oi-menu"></span>
             </button>

           </div>
         </nav>
         {!auth ? this.navGuest() : role === "member" ? this.navAdmin(): this.navMember()}

      </div>

      );
  }
}
export default Navbar;
