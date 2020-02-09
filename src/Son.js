import React from "react";
export class Son extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            message: ""
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentDidMount () {
        if (!window.opener) {
            window.close();
        }
    }

    /**
     * changes the value of the input.
     *
     * @param {import("react").ChangeEvent<HTMLInputElement>} evt
     * @returns {void}
     */
    onChangeHandler (evt) {
        const {value} = evt.currentTarget;

        this.setState({message: value});

        window.opener.onSuccess(value)
    }

    render () {
        const {message} = this.state;
        return (
            <div>
                <input type="text" value={message} onChange={this.onChangeHandler} />
            </div>
        )
    }
}
