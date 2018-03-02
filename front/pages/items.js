import 'isomorphic-fetch';

import PrincipalLayout from '../components/layouts/PrincipalLayout';
import configFile from "../configFile";




export default class extends React.Component{
    static async getInitialProps(request) {
        const idItem =request.query.id;

        console.log(idItem)
        let req = await fetch(`${configFile.apiExpress}/api/items/${idItem}`);
        let dataItem = await req.json();
        console.log(dataItem)
        return { dataItem :dataItem}


    }
    
    render(){
        return <PrincipalLayout title="Mercadolibre">


       <div className="row">
           <div className="col-12">
               <div className="row">
                   <div className="col-6">
                       <img src={this.props.dataItem.picture} alt=""/>
                   </div>
                   <div className="col-6">
                       <div>
                           {this.props.dataItem.condition} - {this.props.dataItem.sold_quantity}
                       </div>
                       <div></div>
                       <div></div>
                       <div></div>
                   </div>
               </div>
           </div>
       </div>


            <style jsx>{
            `
        
            
            
            `
        }

        </style>
       


               
            
       
        </PrincipalLayout>
    }
}