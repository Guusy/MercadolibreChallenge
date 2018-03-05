import React from "react";

export const MessageError = (props) => {


    return (
        <div className="row">
            <div className="col-12">
                <div id="box-item-not-found">
                    {props.message}
                </div>
            </div>


            <style jsx>{
                `
                    #box-item-not-found{background-color:white;padding:15px;text-align:center;margin-top:2%}
            `
            }

            </style>

        </div>


    )


};