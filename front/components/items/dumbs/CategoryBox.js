import React from "react";

import '../../../styles/categoryBox.scss'

export const CategoryBox = (props) => {
    let arrayLength = props.categories.length;
    let i = 0;
    return (
        <div id='box-category-list' className="text-align-center-phone">
            {

                props.categories.map(category => {
                    let htmlReturn = <span id="normal-category">{category} > </span>
                    if (i === arrayLength - 1) {
                        htmlReturn = <span id="selected-category">{category} </span>
                    }
                    i++;
                    return htmlReturn
                })}

        </div>
    )


};