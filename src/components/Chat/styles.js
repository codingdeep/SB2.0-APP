import { StyleSheet, Dimensions } from 'react-native';
import { white } from 'ansi-colors';
let deviceWidth = Dimensions.get('window').width;
import { useTheme } from '../../Theme/hooks'
const { colors } = useTheme()
const styles = StyleSheet.create({
    pro_background: {
        backgroundColor: colors.background,
        flexDirection: 'column',
        flex: 1
    },
    headerBody: {
        alignItems: "center",
        justifyContent: "center"
    },
    listItem: {
        height: 100,
        borderBottomColor: colors.bottomBorderColor,
        justifyContent: "space-between",
        alignContent: "space-between",
        borderBottomWidth: 1,
        paddingLeft: 0,
        marginLeft: 0,
        flexDirection: "row"
        //    backgroundColor: "red"
    },
    userImage: {
        borderRadius: 10,
        height: 59,
        width: 59
    },
    body: {
        alignSelf: "flex-start",
        marginRight: 20,
        justifyContent: "flex-start",
        borderWidth: 0, borderColor: 'transparent'
        // backgroundColor:"red"
    },
    title: {
        textAlign: "left",
        fontSize: 14,
        // color: colors.textColor,
        fontFamily: 'Poppins-Medium',

    },
    messageSubBody: {
        textAlign: "left",
        fontSize: 12,
        color: colors.textColor,
        fontFamily: 'Poppins-Medium',
    },
    badge: {
        height: 12,
        width: 12,
        backgroundColor: "#58EB67"
    },
    minutesAgo: {
        textAlign: "left",
        fontSize: 12,
        color: "#979797",
        fontFamily: 'Poppins-Medium',
    },
    lavel: {

    },
    plusBackground: {
        height: 33,
        width: 33,
        marginRight: 0, paddingRight: 0,
        marginRight: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FCBF24",
        borderRadius: 50
    },
    plusImage: {
        height: 16,
        width: 16,
        marginRight: 0, paddingRight: 0,
        marginRight: 0,

        // backgroundColor: "#FCBF24"
    },
    cus_input_view: {
        flex: 1,
        // backgroundColor: '#f1f0f5',
        borderRadius: 8,
        justifyContent: 'center',
        marginHorizontal: 10
    },



});

export default styles;
