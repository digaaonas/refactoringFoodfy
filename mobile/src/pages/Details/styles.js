import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
    
    container:{
        height: 1000,
        paddingTop: 20 + Constants.statusBarHeight,
        paddingHorizontal: 25,
        paddingVertical: 5,
        backgroundColor: "#F3D4BC"
    },

    title:{
        padding: 10,
        fontSize: 24,
        fontWeight: 'bold',
    },

    likes:{
        fontStyle: 'italic',
        fontSize: 16,
        padding: 10,
        marginRight: 20
    },

    views:{
        fontStyle: 'italic',
        fontSize: 16,
        padding: 10
    },

    chefename:{
        fontStyle: 'italic',
        fontSize: 16,
        padding: 10
    },

    titleBody:{
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10
    },

    contentsRecipies:{
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 4,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    contentModal:{
        fontSize: 16,
        lineHeight: 24,
    },

    contentApp:{
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 50,
        borderStyle: "solid",
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        marginBottom: Constants.statusBarHeight
    },

    buttonAppWpp:{
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: 'brown',
        borderRadius: 10,
        marginHorizontal: 5
    },

    buttonAppEmail:{
        paddingHorizontal: 45,
        paddingVertical: 10,
        backgroundColor: 'brown',
        borderRadius: 10,
        marginHorizontal: 5
    },

    textApp:{
        color: "#FFF",
        fontSize: 16
    }

})