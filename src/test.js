// Select service picker

<Item picker>
    <Picker
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        style={{ width: '100%' }}
        placeholder="Service"
        placeholderStyle={{ color: '#bfc6ea' }}
        placeholderIconColor="#007aff"
        selectedValue={this.state.serviceId}
        onValueChange={val => this.onServiceValueChange(val)}
        enabled={
            this.props.navigation.state.params.EditService ? false : true}>
        <Picker.Item label="Add New Service" value="" />

        {this.state.ServiceList.map((serviceItem, i) => (
            <Picker.Item
                key={i}
                style={{
                    color: '#0e1317',
                    fontFamily: 'Poppins-Medium',
                    fontSize: 14,
                }}
                label={serviceItem.name}
                value={serviceItem.id}
            />
        ))}


    </Picker>
</Item>

