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

        let req = await fetch(`${configFile.apiExpress}/api/items?q=${search}`),
            dataSearch = await req.json(),
            problem500 = false,
            problem404 = false;

        if (req.status !== 200) {
            dataSearch = false;
            if (req.status === 404) {
                problem404 = true;
            } else {
                problem500 = true;
            }
        }

        return {search: dataSearch, querySearch: search, problem500: problem500, problem404: problem404}
    }

    componentDidMount() {
        if (this.props.querySearch === undefined) {
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

                            {this.props.search.items.map(item =>

                                <PrettyLink key={item.id} href={`/items/${item.id}`}>

                                    <BoxitemList {...item}/>

                                </PrettyLink>
                            )}
                        </div>
                    </div>
                </div>

                : this.props.problem404 ?

                    <MessageError
                        message={`Lo sentimos, no encontramos ningun resultado para la busqueda : ${this.props.querySearch}`}/>

                    :
                    <MessageError
                        message='Lo sentimos, hubo un problema interno del servidor, estamos trabajando en ello, volve a intentarlo en unos instantes'/>


            }


        </PrincipalLayout>
    }
}