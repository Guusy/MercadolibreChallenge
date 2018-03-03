import 'isomorphic-fetch';
import Link from 'next/link';
import PrincipalLayout from '../components/layouts/PrincipalLayout';

import globalStyle from  '../styles/style.scss'

const backgroundColor='blue';


export default class extends React.Component{

    render(){
        console.log(globalStyle)
        return <PrincipalLayout title="Mercadolibre">


        <div className='hello'>
            Index
        </div>    

            <style jsx lang="scss" scoped >{
            `

        $color: red;
      .hello {
        background-color:red;
        padding: 100px;
        text-align: center;
        transition: 100ms ease-in background;
        &:hover {
          color: $color;
        }
        }
            
            `
        }

        </style>

            <style jsx global >{
                `
            $colorTesting:green;

            `
            }

            </style>
       


               
            
       
        </PrincipalLayout>
    }
}