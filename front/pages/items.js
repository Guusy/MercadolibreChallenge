import 'isomorphic-fetch';

import PrincipalLayout from '../components/layouts/PrincipalLayout';
import configFile from "../configFile";
import {CategoryBox} from '../components/items/dumbs/CategoryBox';



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
        const item =this.props.dataItem
        return <PrincipalLayout title="Mercadolibre">

            <div className='row'>
                <div className="col-12">
                    <CategoryBox categories={this.props.dataItem.categories}/>
                </div>
            </div>

       <div className="row">
           <div className="col-12" id="content-item">
               <div className="row">
                   <div>
                       <img id="img-item" src={item.picture} alt=""/>
                   </div>
                   <div id='box-data-item'>
                       <div id="box-condition-and-selled-item">
                           {item.condition} - {item.sold_quantity} Vendidos
                       </div>
                       <div id="box-title-item">
                           {item.title}
                       </div>
                       <div id="box-price-item">
                            $ {item.price.amount} {item.price.decimals}
                       </div>
                       <div>
                           <button>Comprar</button>
                       </div>
                   </div>
               </div>

               <div className="row">
                   <div className="col-12">
                       <div className="row">
                           <div className="col-12">Descripcion del producto</div>
                       </div>
                       <div className="row">
                           <div className="col-12">
                               {item.description}
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>


            <style jsx>{
            `
            $pixel32:32px;
            $pixel16:16px;
            $pixel24:24px;
            $pixel46:46px;
            $lightBlueColor:#3483FA;

#content-item{background-color:white}
            #img-item{
        width:680px;
        }
        #box-condition-and-selled-item{
        margin-top:$pixel32;
        margin-bottom:$pixel16;

        }
        #box-title-item{

        font-size:$pixel24;
        }
        #box-price-item{
        margin-top:$pixel32;
font-size:$pixel46;
         margin-bottom:$pixel32;
        }

        #box-data-item{
        padding-left:$pixel32;
        padding-right:$pixel32;
        width:1140px-680px;
        }
        button{
        color:white;
        background-color:$lightBlueColor;
        width:100%;
        }
            
            
            `
        }

        </style>
       


               
            
       
        </PrincipalLayout>
    }
}