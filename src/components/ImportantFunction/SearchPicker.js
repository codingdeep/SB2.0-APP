import React, {useState, Fragment} from 'react';
import {Button, View, Text, ActivityIndicator} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
const SearchPicker = props => {
  return (
    <View>
      <Fragment>
        <SearchableDropdown
          // selectedItems={props.selectedItems ? props.selectedItems : 0}
          onItemSelect={item => {
            props.onItemSelect(item);
          }}
          // selectedItems={this.state.selectedItems}
          // enabled={
          //     this.props.navigation.state.params.EditProduct ? false : true}
          containerStyle={{
            padding: props.fromTask ? 2 : 5,
            backgroundColor: props.fromTask ? '#f1f0f5' : 'transparent',
          }}
          // onRemoveItem={(item, index) => {
          //   const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
          //   this.setState({ selectedItems: items });
          // }}
          itemStyle={{
            padding: props.fromTask ? 10 : 13,
            marginTop: 5,
            backgroundColor: props.fromTask ? 'white' : '#f1f0f5',
            borderColor: '#bbb',
            borderWidth: 1,
            borderRadius: 5,
            // color: props.fromTask ? "black" : '#bfc6ea'
          }}
          itemTextStyle={{color: '#222'}}
          itemsContainerStyle={{maxHeight: 140}}
          items={props.items ? props.items : null}
          defaultIndex={0}
          // reset Value={false}
          textInputProps={{
            placeholder: props.placeholder,
            underlineColorAndroid: 'transparent',
            style: {
              paddingVertical: 20,
              paddingHorizontal: 15,
              borderWidth: props.fromTask ? 0 : 1,
              borderColor: '#ccc',
              borderRadius: 5,
              color: props.fromTask ? 'black' : '#bfc6ea',
            },
            // onTextChange: text => this.searchProduct(text)
          }}
          onTextChange={text => props.onTextChange(text)}
          listProps={{
            nestedScrollEnabled: true,
          }}
        />
      </Fragment>
    </View>
  );
};

export default SearchPicker;
