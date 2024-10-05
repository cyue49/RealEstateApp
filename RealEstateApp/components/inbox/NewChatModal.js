import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, SafeAreaView, View, TextInput, FlatList, Text, TouchableOpacity, Modal } from 'react-native';
import { Colors } from '../../constants/Colors'

export default NewChatModal = ({ isVisible, setisVisible }) => {
    return (
        <Modal
            animationType='slide'
            visible={isVisible}
            transparent={true}
            onRequestClose={() => setisVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalBoxContainer}>
                    <Text>Test</Text>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={() => setisVisible(false)}
                            style={[styles.modalButton, { borderColor: Colors.appGrayDark }]}>
                            <Text style={{ color: Colors.appGrayDark }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setisVisible(false)}
                            style={[styles.modalButton, { borderColor: Colors.appBlue }]}>
                            <Text style={{ color: Colors.appBlue }}>Continue</Text>
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
});