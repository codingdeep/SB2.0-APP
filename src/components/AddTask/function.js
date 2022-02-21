searchService = search => {
    console.log("TEXT");
    GetSearchService(
        this.props.locationId,
        search
        ,
        (response) => {
            console.log("response.Body", response)

            if (response && response.length > 0) {
                console.log("response.Body666", response)
                // this.state.ServiceList = response
                this.setState({
                    ServiceList: response.map(s => {
                        s = {
                            ...s,
                            ...s.service
                        }
                        return s
                    })
                })
            } else {
                this.setState({

                })
            }

        },
        (error) => {
            console.log("error1", error)
        }
    );

}
