import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Slide1 from "../image/13.jfif";

class Navbar extends Component{

    render(){
        return(
          <div className="container">
                  <div className="col-lg-14">
                      <div id="slideshow" className="carousel slide my-4" data-ride="carousel">
                          <ol className="carousel-indicators">
                              <li data-target="#slideshow" data-slide-to="0"></li>
                          </ol>
                          <div className="carousel-inner" role="listbox">
                                  <div className="carousel-item active">
                                      <img className="d-block img-fluid" src={Slide1}
                                       width="1900px" height="10px"/>
                                  </div>
                          </div>
                  </div>
                  <div className="card-body shadow-lg p-3 mb-3">
                      <h5>ˢHʷEͤAͤRͭT</h5>
                      <p className="card-text"></p>
                      <span className="card-text">
                          <h7>Penyedia jasa online peminjaman lapangan olahraga yang mudah dan efektif </h7>
                      </span>
              </div>
              <div className ="card-columns">
              <div class="card bg-warning text-white text-left p-2">
                <blockquote class="blockquote mb-0">
                  <p>Lapangan BuluTangkis<br/>
                    Lapangan Futsal<br/>
                    Lapangan Volly<br/>
                    Lapangan Basket<br/>
                    Lapangan Silat

                  </p>
                  <footer class="blockquote-footer text-white">
                    <small>
                      Lapangan yang tersedia di <cite title="Source Title">web ini</cite>
                    </small>
                  </footer>
                </blockquote>
                  </div>

                  <div class="card bg-warning text-white text-left p-3">
                    <h5>ᴄᴀʀᴀ ᴍᴇɴʏᴇᴡᴀ</h5>
                    <blockquote class="blockquote mb-0">
                      <p>
                      1. Pastikan ....<br/>
                      2. ......<br/>
                      3. .......<br/>
                      4........<br/>
                      5. Jangan Lupa Bayar
                      </p>
                      <footer class="blockquote-footer text-white">
                        <small>
                           <cite title="Source Title"></cite>
                        </small>
                      </footer>
                    </blockquote>
                      </div>
                      <div class="card bg-warning text-white text-left p-3">
                        <h5>Contact Person</h5>
                        <blockquote class="blockquote mb-0">
                          <p>
                      》  +0341-7863<br/>
                        》  @Sweetheart_co<br/>

                          </p>
                          <footer class="blockquote-footer text-white">
                            <small>
                               <cite title="Source Title"></cite>
                            </small>
                          </footer>
                        </blockquote>
                          </div>
              </div>

                  </div>
                    </div>
        );
    }
}
export default Navbar;
