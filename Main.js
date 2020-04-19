import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

//load navbar
import Navbar from "./component/Navbar";
import Modal from "./component/Modal";
import Toast from "./component/Toast";
//load halaman
import Home from "./client/Home";
import Register from "./page/Register";
import Login from "./page/Login";
import User from "./page/User";
import Lapangan from "./page/Lapangan";
import Sewa from "./page/Sewa";
import Profil from "./client/Profil"

class Main extends Component {
    render = () => {
        return(
           <Switch>
               {/* load component tiap halaman */}

               <Route path="/home">
                 <Navbar />
                 <Home />
                 </Route>

                 <Route path="/register">
                   <Register />
                   </Route>

                   <Route path="/login">
                     <Login />
                     </Route>

                     <Route path="/user">
                       <Navbar />
                       <User />
                       </Route>

                       <Route path="/lapangan">
                         <Navbar />
                         <Lapangan />
                         </Route>

                         <Route path="/sewa">
                           <Navbar />
                           <Sewa />
                           </Route>

                           <Route path="/profil">
                             <Navbar />
                             <Profil />
                             </Route>
               </Switch>
        );
    }
}
export default Main;
