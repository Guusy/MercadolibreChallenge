import Head from 'next/head';
import InputSearchNavbar from '../navbar/smarts/InputSearchNavbar';

import {Router} from '../../routes';

export default class PrincipalLayout extends React.Component{


    pushRouter = (urlToPush) =>{

        Router.pushRoute(urlToPush)
    };

    render(){
        return <div>
        <Head>
                <title>{this.props.title}</title>

               <meta name="viewport" content="width=device-width; initial-scale=1.0;"/>
           
               <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>

            </Head>

            <nav id="navbar-ml">
         <div className="container">
         <img src="../static/Logo_ML.png"/>
        
        <InputSearchNavbar pushRouterFather={this.pushRouter}/>
         
         </div>
               
            </nav>

            <div className="container">
                {this.props.children}
            </div>


            <style jsx>{
                
            `
            $yellowMl: #FFE600;
#navbar-ml {
  background-color: #FFE600;
  width:100%;
  height:80px;
}
        
            `}
            </style>


         
        </div>
    }
}