import 'isomorphic-fetch';
import Link from 'next/link';
import PrincipalLayout from '../components/layouts/PrincipalLayout';
import React from 'react'
import configFile from '../configFile';
import {PrettyLink} from '../components/tools/PrettyLink'
import {BoxitemList} from '../components/items/dumbs/BoxItemList';
import {CategoryBox} from '../components/items/dumbs/CategoryBox';
import '../styles/itemSearch.scss';
import {Router} from '../routes';
import {MessageError} from "../components/tools/MessageError";


export default class itemSearch extends React.Component {

    static async getInitialProps(request) {
        const search = request.query.search;



        let req = await fetch(`${configFile.apiExpress}/api/items?q=${search}`);


        let dataSearch = await req.json();
        if(req.status!==200){
            dataSearch = false;
        }

        return {search: dataSearch,querySearch:search}
    }

    componentDidMount(){
        if(this.props.querySearch===undefined){
            Router.pushRoute(`/`)
        }
    }

    render() {
        return <PrincipalLayout title={`Mercadolibre - Busqueda de ${this.props.querySearch}`}>

            {this.props.search ?

                <div>
                    <div className='row'>
                        <div className="col-12 no-padd-phone">
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
                </div>

                :

                <MessageError message={`Lo sentimos, no encontramos ningun resultado para la busqueda : ${this.props.querySearch}`}/>


            }



            <style jsx>{
                `

                #box-item-not-found{background-color:white;padding:15px;text-align:center;margin-top:2%}

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