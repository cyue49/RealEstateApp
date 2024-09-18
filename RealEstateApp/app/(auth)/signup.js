import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { router } from 'expo-router'
import { styles } from '../../constants/commonStyles'

export default function SignUp() {
    const signup = () => {
        router.replace('/ListingsTab/listings')
    }

    const goToSignin = () => {
        router.replace('/signin')
    }

    return (
        <View style={styles.containerCenter}>
            <Text>Sign Up Page</Text>
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
