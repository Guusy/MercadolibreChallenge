import Head from 'next/head';
import {SearchNavbar} from "../navbar/dumbs/SearchNavbar";

import '../../styles/layouts.scss';

export default class PrincipalLayout extends React.Component{

    render(){
        return <div>
        <Head>
                <title>{this.props.title}</title>

               <meta name="viewport" content="width=device-width; initial-scale=1.0;"/>
            <link rel="shortcut icon" href="../../static/favicon2.ico" type="image/x-icon"/>
                <link rel="icon" href="../../static/favicon2.ico" type="image/x-icon"/>
               {/*<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>*/}


            </Head>
            <SearchNavbar/>


            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {this.props.children}
                    </div>
                </div>

            </div>



         
        </div>
    }
}