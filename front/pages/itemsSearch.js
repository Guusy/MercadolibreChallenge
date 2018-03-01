import 'isomorphic-fetch';
import Link from 'next/link';
import PrincipalLayout from '../components/layouts/PrincipalLayout';
import React from 'react'
import {Router} from '../routes';



export default  class itemSearch extends React.Component{

      static async getInitialProps(request){
        const search= request.query.search
        console.log(search)
        console.log(Router)
        if(search===undefined){
   
            }
        return{ search:search}
    
    }
    render(){
        return <PrincipalLayout title="Mercadolibre">
<button onClick={()=>{
     Router.pushRoute('/')
}}>
    go to index
</button>

        <div>
            items search {this.props.search}
        </div>    

            <style jsx>{
            `
        
            
            
            `
        }

        </style>
       


               
            
       
        </PrincipalLayout>
    }
}