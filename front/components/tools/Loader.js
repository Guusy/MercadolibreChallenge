import React from "react";

export const Loader = () => {


    return (
        <div className="loader">



                <style jsx>{
                    `
       .loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 90px;
    height: 90px;
    -webkit-animation: spin 1s linear infinite; /* Safari */
    animation: spin 1s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
@media(max-width:425px){
.loader{
    width: 70px;
    height: 70px;}
}
            `
                }

                </style>


        </div>
    )


}