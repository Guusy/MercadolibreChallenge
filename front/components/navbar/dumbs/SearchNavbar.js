import React from "react";
import InputSearchNavbar from '../smarts/InputSearchNavbar';
import '../../../styles/navbar.scss';
import {PrettyLink} from '../../tools/PrettyLink';
export const SearchNavbar = (props) => {

    return (

        <nav id="navbar-ml">
            <div className="container">
                <div className="row">
                    <div className="col-12">

                        <div className="row">
                            <div className=" col-2 col-sm-2 col-md-1">
                                <PrettyLink href='/'>
                                <div id='box-logo-navbar'>
                                    <img src="../static/Logo_ML.png"/>

                                </div>
                                </PrettyLink>
                            </div>
                            <div className=" col-10 col-sm-10 col-md-11">
                                <InputSearchNavbar/>
                            </div>
                        </div>
                    </div>
                </div>




            </div>


            <style jsx>{

                `
            #box-logo-navbar{
            margin-right:15px}
#navbar-ml {
  background-color: yellow;
  width:100%;
  padding:12px;
}


            `}
            </style>
        </nav>


    )


};