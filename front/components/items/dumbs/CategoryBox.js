import React from "react";

import '../../../styles/categoryBox.scss'

export const CategoryBox = (props) => {
    let arrayLength = props.categories.length;
    let i = 0;
    return (
        <div id='box-category-list' className="text-align-center-phone">
            {

                props.categories ?  props.categories.map(category => {
                    let htmlReturn = <span key={category+1} id="normal-category">{category} > </span>
                    if (i === arrayLength - 1) {
                        htmlReturn = <span key={category+1} id="selected-category">{category} </span>
                    }
                    i++;
                    return htmlReturn
                }) : <span id="normal-category">No existe categoria este resultado de busqueda</span>}

        </div>
    )


};