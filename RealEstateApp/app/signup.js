import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { router } from 'expo-router'

export default function SignUp() {
    const signup = () => {
        router.replace('/ListingsTab/listings')
    }

    const goToSignin = () => {
        router.replace('/')
    }

    return (
        <View style={styles.container}>
            <Text>Sign In Page</Text>
            <Button
                onPress={signup}
                title='Sign Up'
                accessibilityLabel='Sign up button'
            />
            <Button
                onPress={goToSignin}
                title='Sign In instead'
                accessibilityLabel='Go to sign in page button'
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 4,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
