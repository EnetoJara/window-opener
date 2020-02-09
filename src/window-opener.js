import PropTypes from "prop-types";
import React from "react";

let browser = window;
let popup = null;
let timer = null;

function watcher () {
    if (popup === null) {
        clearInterval(timer);
        timer = null;
    } else if (popup !== null && !popup.closed) {
        popup.focus();
    } else if (popup !== null && popup.closed) {
        clearInterval(timer);
        browser.focus();
        browser.onClose("child was closed");
        timer = null;
        popup = null;
    }
}

export class WindowOpener extends React.Component {

    constructor (props) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);

        browser = window.self;

        browser.onSuccess = (res) => {
            props.bridge(null, res);
        }

        browser.onError = (error) => {
            props.bridge(error);
        }

        browser.onOpen = (message) => {
            props.bridge(null, message);
        }

        browser.onClose = (message) => {
            props.bridge(null, message);
        }
    }

    onClickHandler (evt) {
        console.log("onClickHandler", this.props)

        const { url, name, opts } = this.props;
        if (popup && !popup.closed) {
            popup.focus();

            return ;
        }

        popup = browser.open(url, name, opts);

        setTimeout(() => {
            popup.opener.onOpen("child was opened");
        }, 0);

        if (timer === null) {
            timer = setInterval(watcher, 2000);
        }

        return;

    }

    render () {
        const { children } = this.props;
        return (
            <button type="button" onClick={this.onClickHandler}>
                {children}
            </button>
        );
    }
}

WindowOpener.propTypes = {
    url: PropTypes.string.isRequired,
    bridge: PropTypes.func.isRequired,
    name: PropTypes.string,
    opts: PropTypes.string
}
WindowOpener.defaultProps = {
    name: "Cool popup",
    opts: `dependent=${1}, alwaysOnTop=${1}, alwaysRaised=${1}, alwaysRaised=${1}, width=${300}, height=${300}`
}
