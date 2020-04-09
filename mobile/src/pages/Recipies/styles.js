import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    
    header:{
        paddingTop: 20 + Constants.statusBarHeight,
        paddingHorizontal: 25,
        paddingVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F3D4BC"
    },

    title:{
        fontSize: 22,
        fontWeight: "bold",
        lineHeight: 32
    },

    recipiesList:{
        marginBottom: 100
    },
    
    contentRecipie:{
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: "#F3D4BC"
    },

    image:{
        width: 80,
        height: 80,
        borderRadius: 50,
        marginRight: 25
    },

    contentTitleMore:{
        width: 320,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },

    contentTitle:{
        width: 220
    },

    recipieTitle:{
        paddingBottom: 25,
        fontSize: 20,
        fontWeight: "bold",
        color: "grey"    
    },

    nameChefe:{
        fontSize: 14,
        paddingRight: 15,
        opacity: .4
    },

    contentDataChef:{
        backgroundColor: "#F3D4BC",
        paddingLeft: 15,
        borderRadius: 25,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginLeft: 30
    },

    buttonMore:{
        color: "#F3D4BC",
        fontSize: 14,
        fontWeight: 'bold'
    }

})