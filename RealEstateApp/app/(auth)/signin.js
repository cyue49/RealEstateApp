import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { router } from 'expo-router'
import { styles } from '../../constants/commonStyles'

export default function SignIn() {
    const signin = () => {
        router.replace('/listings')
    }

    const goToSignup = () => {
        router.replace('/signup')
    }

    return (
        <View style={styles.containerCenter}>
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
