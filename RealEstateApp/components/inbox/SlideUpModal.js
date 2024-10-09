import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Colors } from '../../constants/Colors'

export default SlideUpModal = ({ isVisible, setisVisible, handleCancel, message, options, handleOptions }) => {
    return (
        <Modal
            animationType='slide'
            visible={isVisible}
            transparent={true}
            onRequestClose={() => setisVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalBoxContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', color: Colors.appBlueDark }}>{message}</Text>

                    {
                        options.map((option, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={handleOptions[index]}
                                    style={[styles.modalButton, { backgroundColor: Colors.appLight, borderColor: Colors.appBlue }]}>
                                    <Text style={{ color: Colors.appBlue, fontWeight: 'bold' }}>{option}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }

                    <TouchableOpacity
                        onPress={handleCancel}
                        style={[styles.modalButton, { backgroundColor: Colors.appGray, borderColor: Colors.appGray }]}>
                        <Text style={{ color: Colors.appLight, fontWeight: 'bold' }}>Cancel</Text>
                    </TouchableOpacity>
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
        backgroundColor: 'rgba(64, 64, 64, 0.5)',
    },
    modalBoxContainer: {
        width: '90%',
        borderRadius: 20,
        backgroundColor: Colors.appLight,
        padding: 15,
        gap: 15,
        alignItems: 'center'
    },
    modalButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 50,
        padding: 15,
        width: '100%'
    }
});