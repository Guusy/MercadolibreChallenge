import Link from 'next/link';
import React from "react";

export const PrettyLink = (props) => {


        return (
            <Link prefetch  href={props.href}>
                <a>
                    {props.children}

                    <style jsx>{
                        `
        a{
            text-decoration:none;
            color:transparent;
        }
        a:hove{
        color:transparent;
        }


            `
                    }

                    </style>
                </a>

            </Link>
        )



}