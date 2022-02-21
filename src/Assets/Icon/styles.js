import { StyleSheet, Dimensions } from 'react-native';
let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    pro_background: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        flex: 1
    },
    Fir_st_block: {
        flex: 1,
        backgroundColor: '#f1f0f5',
        paddingLeft: 40,
        paddingRight: 40,
        flexDirection: 'row',
    },
    Fir_st_block_text: {
        textAlign: 'center',
        color: '#0e1317',
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
    },
    Fir_st_block_col: { alignSelf: 'center', width: '50%' },
    Sec_nd_block: {
        flex: 1,
        // height: 200,
        backgroundColor: '#ffffff',
        marginHorizontal: 40,
        flexDirection: 'row',
        justifyContent: "center",
    },
    block_text_header: {
        color: '#979797',
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        fontWeight: '100',
    },
    block_text_content: {
        fontSize: 14,
        color: '#0e1317',
        fontWeight: 'bold',
        fontFamily: 'Poppins-Medium',
    },
    th_rd_block: {
        // flex:1,
        height: 80,
        // width: "60%",
        backgroundColor: '#ffffff',
        justifyContent: "space-between",
        // paddingLeft: 40,
        // paddingRight: 40,
        // flexDirection: 'row',
    },
    th_rd_block_service: {
        // height: 80,
        // width: "60%",

        // backgroundColor: 'blue',
        justifyContent: "space-between",
        // paddingLeft: 40,
        // paddingRight: 40,
        // flexDirection: 'row',
    }
});

export default styles;
