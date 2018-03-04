import React from "react";

import boxItemCss from '../../../styles/boxItem.scss';

export const BoxitemList = (props) => {

    return (
        <div id='box-item-list' className="row">
            <div className="content-picture-item col-lg-3 col-md-4 col-sm-4 col-4">
                <img src={props.picture} alt=""/></div>
            <div id="title-item-box-list" className='col-lg-7 col-md-6 col-sm-6 col-5'>
                <div id="price-item-box-list">$ {props.price.amount} {props.free_shipping && <img src="../../../static/ic_shipping.png" alt=""/>}</div>
                <div id="title-item-box-list">{props.title}</div>

                
            </div>

            <div id="adrress-item-box-list" className="col-lg-2 col-sm-2 col-3">{props.state_name}</div>

            <style jsx lang="scss" scoped>{

                `
            ${boxItemCss}
            `
            }

            </style>
        </div>
    )


};