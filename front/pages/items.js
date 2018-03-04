import 'isomorphic-fetch';

import PrincipalLayout from '../components/layouts/PrincipalLayout';
import configFile from "../configFile";
import {CategoryBox} from '../components/items/dumbs/CategoryBox';

import '../styles/Item.scss';


export default class extends React.Component {
    static async getInitialProps(request) {
        const idItem = request.query.id;

        let req = await fetch(`${configFile.apiExpress}/api/items/${idItem}`);


        let dataItem = await req.json();
        console.log(dataItem)
        if(req.status!==200){
            dataItem=false;
        }
        return {dataItem: dataItem}


    }

    render() {
        const item = this.props.dataItem;
        return <PrincipalLayout title={`Mercadolibre - ${item.title}`}>
            {this.props.dataItem ?
                <div>


                    <div className='row'>
                        <div className="col-12 no-padd-phone">
                            <CategoryBox categories={this.props.dataItem.categories}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12" id="content-item">
                            <div id="content-image-and-price">
                                <div>
                                    <img  src={item.picture} alt={item.title} className="w-100-phone img-item"/>
                                </div>
                                <div id='box-data-item'>
                                    <div id="sub-box-data-item" className="w-100-phone">

                                        <div id="box-condition-and-selled-item">
                                            {item.condition} - {item.sold_quantity} Vendidos
                                        </div>
                                        <div id="box-title-item">
                                            {item.title}
                                        </div>
                                        <div id="box-price-item">
                           <span>
                              $ {item.price.amount} <span>{item.price.decimals}</span>
                           </span>

                                        </div>

                                    </div>
                                    <div>
                                        <button id="btn-buy-item">Comprar</button>
                                    </div>
                                </div>
                            </div>
                            {item.description ?
                                <div  id="box-description-item" className="w-100-phone img-item">
                                    <div  >
                                        <div >
                                            <div  id='title-description-item'>Descripci&oacute;n del producto</div>
                                        </div>
                                        <div >
                                            <div  id="content-description-item" cl>
                                                {item.description}
                                            </div>
                                        </div>
                                    </div>
                                </div> : <div>
                                    Este producto no tiene descripcion
                                </div>}

                        </div>
                    </div>
                </div>


                :"problem"}



        </PrincipalLayout>
    }
}