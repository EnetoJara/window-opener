import React from "react";
import logo from "./logo.svg";
import { WindowOpener } from "./window-opener";
export class Home extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            message: ""
        }
        this.sonResponse = this.sonResponse.bind(this);
    }

    sonResponse (err, res) {
        if (err) {
            this.setState({ message: res })
        }
        this.setState({ message: res })
    }

    render () {
        const {message} = this.state;
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
        </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {message}
        </a>
                    <WindowOpener
                        url="http://localhost:3000/son"
                        bridge={this.sonResponse}
                    >
                        Open Browser
      </WindowOpener>
                </header>

            </div>
        )
    }
}
