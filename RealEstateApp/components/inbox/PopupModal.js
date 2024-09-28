import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Modal, Button } from 'react-native';
import { Colors } from '../../constants/Colors'

export default PopupModal = ({ isVisible, setisVisible, handleCancel, handleConfirm, message, cancelMessage, confirmMessage }) => {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setisVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalBoxContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>{message}</Text>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                        <Button
                            title='Cancel'
                            onPress={handleCancel}
                            accessibilityLabel={cancelMessage}
                            style={styles.modalButton}
                        />
                        <Button
                            title='Confirm'
                            onPress={handleConfirm}
                            accessibilityLabel={confirmMessage}
                            style={styles.modalButton}
                        />
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
    modalButton: {
        flex: 1
    }
});