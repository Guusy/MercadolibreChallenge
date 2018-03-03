import 'isomorphic-fetch';
import Link from 'next/link';
import PrincipalLayout from '../components/layouts/PrincipalLayout';
import React from 'react'
import configFile from '../configFile';
import {PrettyLink} from '../components/tools/PrettyLink'
import {BoxitemList} from '../components/items/dumbs/BoxItemList';
import {CategoryBox} from '../components/items/dumbs/CategoryBox';


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

        let req = await fetch(`${configFile.apiExpress}/api/items?q=${search}`);
        let dataSearch = await req.json()

        return {search: dataSearch}


    }

    render() {
        return <PrincipalLayout title="Mercadolibre">


            <div className='row'>
                <div className="col-12">
                    <CategoryBox categories={this.props.search.categories}/>
                </div>
            </div>

            <div className="row">
                <div id="super-box-list-items-search">

                    {this.props.search.items.slice(1,5).map(item=>

                        <PrettyLink href={`/items/${item.id}`}>

                            <BoxitemList {...item}/>

                        </PrettyLink>
                        )}
                </div>
            </div>

            <style jsx>{
                `

        #super-box-list-items-search{
        background: white;

    width: 100%;

    padding-right: 15px;
    padding-left: 15px;}
            
            
            `
            }

            </style>


        </PrincipalLayout>
    }
}