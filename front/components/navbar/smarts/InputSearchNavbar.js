import {Router} from "../../../routes";

export default class InputSearchNavbar extends React.Component {


    constructor() {
        super()
        this.state = {
            inputs: {
                search: ''
            },
            errorInput: false
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

    searchItem = (event) => {

        event.preventDefault();

        if (this.state.inputs.search === '') {
            this.setState({
                errorInput:true
            });

        } else {
            Router.pushRoute(`/items?search=${this.state.inputs.search}`)

        }

    };

    render() {
        return <div id="box-input-search">
            <form onSubmit={this.searchItem}>
                <input onChange={this.changeInput} type="text" name="search" placeholder={this.state.errorInput ? "Por favor completa el campo" :"Nunca dejes de buscar"}
                       value={this.state.inputs.search}/>
                <button id="button-search"><img src="../../../static/ic_Search.png" alt=""/></button>


            </form>


            <style jsx>{
                `
            form{
                position:relative;
            }
            button{
                position: absolute;
                right: 0; top: 0;     padding: 7px 10px;
                border: 1px solid #ccc; background-color: #fff; background-image: -webkit-gradient(linear,left top,left bottom,from(#fff),to(#f1f1f1));
                background-image: -webkit-linear-gradient(#fff,#f1f1f1); background-image: linear-gradient(#fff,#f1f1f1);
                border-radius: 0px 3px 3px 0px; cursor: pointer;
                }
            #box-input-search{width:100%}
            input{
                display: block;
                width: 100%;
                padding: .375rem .75rem;
                font-size: 1rem;
                line-height: 1.5;
                color: #495057;
                background-color: #fff;
                background-clip: padding-box;
                border: 1px solid #ced4da;
                border-radius: .25rem;
                transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }
            `
            }

            </style>


        </div>
    }
}