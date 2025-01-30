import React from 'react'
import styles from "./styles"
import { Text, TextInput, Button, Alert } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [token, setToken] = React.useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5001/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            
            const data = await response.json();
            if(response.ok) {
                // await AsyncStorage.setItem("jwt_token", data.token);
                // setToken(data.token);
                Alert.alert("Sign up successfull!");
            }
            else {
                setError(data.message);
            }
        } catch (err) {
            setError("Something went wrong");
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>Username</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder='Enter username'
                />
                <Text style={styles.text}>Password</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder='Enter password'
                />
                <Button 
                    title="Sign Up"
                    onPress={handleSignUp}
                />
                <Button 
                    title="Forgot password"
                    onPress={() => Alert.alert('Simple Button pressed')}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default SignupScreen;