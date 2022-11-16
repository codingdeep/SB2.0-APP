import { StyleSheet, Dimensions } from 'react-native';
import { white } from 'ansi-colors';
let deviceWidth = Dimensions.get('window').width;
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

    loginFormView: {
        flex: 4
    },
    itemSalonId: {
        borderRadius: 10,
        backgroundColor: "#F1F0F5",
        paddingRight: 10,
        justifyContent: "flex-end"
    },
    forGetPassword: {
        flex: 1,
        alignItems: "flex-end",

    },
    loginFormButton: {
        flex: 3,
      justifyContent: "center
    },
    inputIcon: {
        height: 16,
        width: 16,
    },

    line: {
        flex: 1,
        // backgroundColor: "green"
        justifyContent: "center",
        alignItems: "center"

    }
});

export default syles
