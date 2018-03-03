import React from "react";

import boxItemCss from '../../../styles/boxItem.scss';

export const BoxitemList = (props) => {

    return (
        <div id='box-item-list'>
            <div className="content-picture-item">
                <img src={props.picture} alt=""/></div>
            <div id="title-item-box-list">
                <div id="price-item-box-list">$ {props.price.amount} {props.free_shipping && <img src="../../../static/ic_shipping.png" alt=""/>}</div>
                <div id="title-item-box-list">{props.title}</div>

                
            </div>

            <div id="adrress-item-box-list">{props.state_name}</div>

            <style jsx lang="scss" scoped>{

                `
            ${boxItemCss}
            `
            }

            </style>
        </div>
    )


};