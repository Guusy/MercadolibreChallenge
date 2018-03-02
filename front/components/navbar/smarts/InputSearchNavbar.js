
export default  class InputSearchNavbar extends React.Component{


    constructor(){
        super()
        this.state={
            inputs:{
                search:''
            },
            errorInput:false
        }
    }

    changeInput = (event) => {
        let stateAux = this.state.inputs;
        let name = event.target.name;
        stateAux[name] = event.target.value;
        this.setState({
            inputs: stateAux
        })
    };

    searchItem = (event) =>{

        event.preventDefault();

        if(this.state.inputs.search===''){
        //TODO message error

        }else{
            this.props.pushRouterFather(`/items?search=${this.state.inputs.search}`)

        }

    }
    render(){
        return <div>


        <div>
            <form onSubmit={this.searchItem}>
           <input onChange={this.changeInput} type="text" name="search" placeholder="Nunca dejes de buscar" value={this.state.inputs.search}/>
                
                </form>    
        </div>    

            <style jsx>{
            `
        
            div>input{
                border-radius:5px;
                font-size:18px;
            }
            
            `
        }

        </style>
       


               
            
       
        </div>
    }
}