import Head from 'next/head';
import {SearchNavbar} from "../navbar/dumbs/SearchNavbar";

import '../../styles/style.scss';

export default class PrincipalLayout extends React.Component{

    render(){
        return <div>
        <Head>
                <title>{this.props.title}</title>

               <meta name="viewport" content="width=device-width; initial-scale=1.0;"/>
           
               <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>

            </Head>
            <SearchNavbar/>


            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {this.props.children}
                    </div>
                </div>

            </div>


            <style jsx>{
                
            `

body{
background-color:red;
heigth:100%;
}
        
            `}
            </style>
            <style jsx global>

                {
                    `


            body{
                background-color:#EEEEEE;
            }

            `
                }
            </style>


         
        </div>
    }
}