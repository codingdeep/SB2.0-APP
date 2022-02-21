import { StyleSheet, Dimensions } from 'react-native';
import { white } from 'ansi-colors';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    loginView: {
        flex: 3,
        justifyContent: "center",

        // shadowRadius: 3,
        // shadowOffset: {
        //   height: 0,
        //   width: 0
        // }
    },
    LoginText: {
        fontFamily: "Poppins",
        color: "#424E9C",
        fontSize: 35,
        fontWeight: "700"
    },
    salonList: {
        flex: 7,
        justifyContent: "flex-start",
        alignSelf: "center"
    },
    imageButton: {
        borderWidth: 3,
        borderColor: "#F1F0F5",
        borderRadius: 5,
        // backgroundColor: "#F1F0F5",
        height: deviceHeight / 4,
        width: deviceWidth / 1.5,
    },

    inputIcon: {

        flex: 1
    },

    line: {
        flex: 1,
        // backgroundColor: "green"
        justifyContent: "center",
        alignItems: "center"

    }
});

export default styles;
