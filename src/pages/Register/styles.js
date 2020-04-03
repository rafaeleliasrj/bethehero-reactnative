import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e02041',
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    formContainer: {
        flex: 1,
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 30
    },
    textInput: {
        backgroundColor: '#FFF',
        fontSize: 17,
        width: '100%',
        marginBottom: 15,
        color: '#222',
        borderRadius: 7,
        padding: 10
    },
    pickerContainer: {
        backgroundColor: '#FFF',
        width: '100%',
        borderRadius: 7,
        marginBottom: 30
    },
    pickerText: {
        fontSize: 17,
        color: '#222',
    },
    enterButton: {
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#FFF',
        width: '100%',
        padding: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    enterButtonText: {
        fontSize: 17,
        fontWeight: "bold",
        color: '#FFF'
    },
    registerButton: {
        flexDirection: "row",
        width: '60%',
        marginTop: 15,
        alignItems: "center",
        justifyContent: "space-between"
    },
    registerButtonText: {
        fontSize: 15,
        color: '#FFF'
    }
});

export default styles;