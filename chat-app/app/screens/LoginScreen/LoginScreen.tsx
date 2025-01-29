import React from 'react'
import styles from "./styles"
import { Text, TextInput, Button, Alert } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const LoginScreen = () => {
    const [username, onChangeUsername] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>Username</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={onChangeUsername}
                    value={username}
                    placeholder='Enter username'
                />
                <Text style={styles.text}>Password</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder='Enter password'
                />
                <Button 
                    title="Sign In"
                    onPress={() => Alert.alert('Simple Button pressed')}
                />
                <Button 
                    title="Forgot password"
                    onPress={() => Alert.alert('Simple Button pressed')}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default LoginScreen;