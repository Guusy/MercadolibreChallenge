import React from "react";
import InputSearchNavbar from '../smarts/InputSearchNavbar';
import '../../../styles/searchNavbar.scss';
import {PrettyLink} from '../../tools/PrettyLink';

export const SearchNavbar = (props) => {

    return (

        <nav id="navbar-ml">
            <div className="container">
                <div className="row">
                    <div className="col-12">

                        <div className="row">
                            <div className=" col-3 col-sm-2 col-md-1 no-padd-xs-phone">
                                <PrettyLink href='/'>
                                    <div id='box-logo-navbar'>
                                        <img src="../static/Logo_ML.png"/>

                                    </div>
                                </PrettyLink>
                            </div>
                            <div className=" col-9 col-sm-10 col-md-11 no-padd-xs-phone">
                                <InputSearchNavbar/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </nav>


    )


};