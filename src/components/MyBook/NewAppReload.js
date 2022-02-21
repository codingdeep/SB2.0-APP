import React, { Component } from 'react';



export default class NewAppReload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            retrive: null
        };

    }

    componentDidMount() {
        //this.chatRetriver();
        let self = this;
        this.props.reloadAppData(function () {
            return {
                setRetrive: _retrive => {
                    self.state.retrive = _retrive;
                },
                getRetrive: () => self.state.retrive
            }
        })

    }


    componentWillUnmount() {

    }


    fcmEventListener() {
        // if (this.state.retrive != null) {
        //     this.state.retrive()
        // }
    }

    render() {
        console.log("gggggg", this.props.children);

        return <>{this.props.children}</>;
    }
}
