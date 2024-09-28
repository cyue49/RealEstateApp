import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Colors } from '../../constants/Colors'

export default PopupModal = ({ isVisible, setisVisible, handleCancel, handleConfirm, message, input, setInput }) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setisVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalBoxContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', color: Colors.appBlueDark }}>{message}</Text>

                    {
                        input === null ? null :
                            <TextInput
                                style={styles.messageBox}
                                onChangeText={setInput}
                                value={input}
                            />
                    }

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={handleCancel}
                            style={[styles.modalButton, { borderColor: Colors.appGrayDark }]}>
                            <Text style={{ color: Colors.appGrayDark }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleConfirm}
                            style={[styles.modalButton, { borderColor: Colors.appBlue }]}>
                            <Text style={{ color: Colors.appBlue }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(64, 64, 64, 0.5)'
    },
    modalBoxContainer: {
        height: '20%',
        width: '80%',
        borderRadius: 20,
        backgroundColor: Colors.appLight,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 20,
        width: '100%',
        justifyContent: 'space-around'
    },
    modalButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.appDark,
        borderRadius: 50,
        padding: 10
    },
    messageBox: {
        borderWidth: 1,
        borderColor: Colors.appBlue,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 50,
        width: '100%'
    },
});