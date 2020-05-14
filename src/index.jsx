import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route} from 'react-router-dom';



class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        };
    }

    render() {
        return(

            <BrowserRouter>
                <div>
                    <HeaderBar></HeaderBar>
                </div>
            </BrowserRouter>
        )
    }
}
ReactDOM.render(<App></App>, document.getElementById("root"));