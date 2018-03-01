import Head from 'next/head';

export default class PrincipalLayout extends React.Component{


    render(){
        return <div>
        <Head>
                <title>{this.props.title}</title>

               <meta name="viewport" content="width=device-width; initial-scale=1.0;"/>
            
            </Head>

            <nav>
                <img src="../static/Logo_ML.png"/>
                Mercadolibre
            </nav>

            {this.props.children}
            <style jsx>{
            `
        
            `}
            </style>


         
        </div>
    }
}