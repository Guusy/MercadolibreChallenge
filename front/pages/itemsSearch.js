import 'isomorphic-fetch';
import Link from 'next/link';
import PrincipalLayout from '../components/layouts/PrincipalLayout';
import React from 'react'

import configFile from '../configFile';



export default class itemSearch extends React.Component {

    static async getInitialProps(request) {
        const search = request.query.search;

        /*fetch(`${configFile.apiExpress}/api/items?q=${search}`)
            .then(response=>{
                if(response.status===200){
                    return response.json()
                }else if(response.status===404){
                    //TODO 404
                }
            })
            .then(data=>{
                dataSearch=data
            })*/

        let req = await fetch(`${configFile.apiExpress}/api/items?q=${search}`)
        let dataSearch = await req.json()

        return {search: dataSearch}


    }

    render() {
        return <PrincipalLayout title="Mercadolibre">


            <div className='row'>
                <div className="col-12">
                    {this.props.search.categories.map(category=><span>{category} ></span>)}
                </div>
            </div>

            <div className="row">
                <div className="col-12">

                    {this.props.search.items.slice(1,5).map(item=>

                        <Link href={`/items/${item.id}`}>
                            <a>
                                <div className="content-picture-item">
                                    <img src={item.picture} alt=""/></div>
                                <div>
                                    {item.title}
                                </div>
                            </a>
                        </Link>
                        )}
                </div>
            </div>

            <style jsx>{
                `
        .content-picture-item>img{
        width:180px;
        border-radius:4px;
        }
            
            
            `
            }

            </style>


        </PrincipalLayout>
    }
}