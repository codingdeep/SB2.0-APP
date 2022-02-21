import React,{Component} from 'react';
import {View,Text,ScrollView,TouchableOpacity,FlatList} from 'react-native';
import {helperFunctions} from "../../_helpers";
import SearchableDropdown from "react-native-searchable-dropdown";
import {Form,Item,Input} from 'native-base'
import {appService} from "../../_services";

class ServiceSearchBar extends Component{
    constructor(props) {
        super(props);
        this.state={
            items : [
                {id: 1,name: 'Rubel'},
                {id: 1,name: 'Rubel'},
                {id: 1,name: 'Rubel'},
                {id: 1,name: 'Rubel'},
                {id: 1,name: 'Rubel'},
                {id: 1,name: 'Rubel'},
                {id: 1,name: 'Rubel'},
                {id: 1,name: 'Rubel'},
                {id: 1,name: 'Rubel'},
                {id: 1,name: 'Rubel'},
                {id: 1,name: 'Rubel'},
                {id: 1,name: 'Rubel'},
                {id: 1,name: 'Rubel'},
                {id: 1,name: 'Rubel'},
                {id: 1,name: 'Rubel'},
                {id: 1,name: 'Rubel'},
                {id: 1,name: 'Rubel'},
                ],
            isSearch: false
        }
    }
    searchItems=(txt)=>{
        const inputLength = txt.length;

        if(inputLength === 0)
            return []

        setTimeout(()=>{
            appService.getAllServices(0,'',txt).then(services => {
                this.props.changeHandler(services)
            })
        },300)
    }

    render() {
        const {items} = this.props;
        return(
            <View>
                <View style={{position:'relative'}}>

                    <Item rounded style={{borderColor: '#FFFFFF',backgroundColor: '#f2f2f2'}}>
                        <Input style={{height: 45}} placeholder='Search here' onChangeText={text => this.searchItems(text)} />
                    </Item>

                    <View style={{position: 'absolute',top: 50,height: 200,flex: 1,...helperFunctions.deviceWiseWidth(300,400,500,600),borderWidth: 1,borderColor: '#f2f2f2',marginLeft: 10}}>
                        <FlatList
                            data={items}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={{...helperFunctions.padding(7,7,7,7),borderBottomWidth: 1,borderColor: '#f2f2f2'}}>
                                    <View><Text>{item.service.name}</Text></View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>

                </View>
            </View>
            // <SearchableDropdown
            //     onItemSelect={(item) => {
            //         const items = this.state.selectedItems;
            //         items.push(item)
            //         this.setState({ selectedItems: items });
            //     }}
            //     containerStyle={{ padding: 0 }}
            //     onRemoveItem={(item, index) => {
            //         const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
            //         this.setState({ selectedItems: items });
            //     }}
            //     itemStyle={{
            //         ...helperFunctions.padding(7,0,7,0),
            //         borderColor: '#f2f2f2',
            //         borderBottomWidth: 1
            //     }}
            //     itemTextStyle={{ color: '#222' }}
            //     itemsContainerStyle={{ maxHeight: 140 }}
            //     items={items}
            //     resetValue={false}
            //     textInputProps={
            //         {
            //             placeholder: "Search here",
            //             underlineColorAndroid: "transparent",
            //             style: {
            //                 ...helperFunctions.padding(7,15,7,15),
            //                 borderColor: '#ccc',
            //                 borderRadius: 50,
            //                 ...helperFunctions.assBg()
            //             },
            //             onTextChange: text => this.searchItems(text)
            //         }
            //     }
            //     listProps={
            //         {
            //             nestedScrollEnabled: true,
            //         }
            //     }
            // />
        )
    }

}
export default ServiceSearchBar