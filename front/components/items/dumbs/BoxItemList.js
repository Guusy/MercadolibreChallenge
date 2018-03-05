import React from "react";
import config from '../../../configFile';
import boxItemCss from '../../../styles/boxItem.scss';
import {Loader} from "../../tools/Loader";

export default class BoxitemList extends React.Component {

    constructor(props){
        super(props)
        this.state={
            externalImage:false
        }
    }

    componentDidMount(){
        fetch(`${config.apiMercadoLibre}/items/${this.props.id}`)
            .then(response=>response.json())
            .then(data=>{
                this.setState({
                    externalImage:data.pictures
                })
            })
            .catch(e=>console.log(e))
    }
    render(){
        return (
            <div id='box-item-list' className="row">
                <div className="content-picture-item col-lg-3 col-md-4 col-sm-4 col-4">

                    {this.state.externalImage ? <img src={this.state.externalImage[0].secure_url} alt=""/> :<Loader/>}
                </div>

                <div id="title-item-box-list" className='col-lg-7 col-md-6 col-sm-6 col-5'>
                    <div id="price-item-box-list">$ {this.props.price.amount} {this.props.free_shipping && <img src="../../../static/ic_shipping.png" alt=""/>}</div>
                    <div id="title-item-box-list">{this.props.title}</div>


                </div>

                <div id="adrress-item-box-list" className="col-lg-2 col-sm-2 col-3">{this.props.state_name}</div>

                <style jsx lang="scss" scoped>{

                    `
            ${boxItemCss}
            `
                }

                </style>
            </div>
        )
    }



};