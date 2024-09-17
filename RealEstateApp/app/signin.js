import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { router } from 'expo-router'

export default function SignIn() {
    const signin = () => {
        router.replace('/ListingsTab/listings')
    }

    const goToSignup = () => {
        router.replace('/signup')
    }

    return (
        <View style={styles.container}>
            <Text>Sign In Page</Text>
            <Button
                onPress={signin}
                title='Sign In'
                accessibilityLabel='Sign in button'
            />
            <Button
                onPress={goToSignup}
                title='Sign Up Instead'
                accessibilityLabel='Go to sign up page button'
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
