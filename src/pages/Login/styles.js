import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#e02041'
    },
    logoContainer: {
        flex: 1,
        justifyContent: "center"
    },
    formContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '90%',
        marginBottom: 30
    },
    textInput: {
        backgroundColor: '#FFF',
        fontSize: 17,
        width: '90%',
        marginBottom: 15,
        color: '#222',
        borderRadius: 7,
        padding: 10
    },
    enterButton: {
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#FFF',
        width: '90%',
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