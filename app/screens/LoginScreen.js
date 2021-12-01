import React, { useContext } from 'react';
import { Image, StyleSheet } from 'react-native';
import { useState } from 'react';
import * as Yup from 'yup';


import authApi from "../api/auth";
import Screen from '../components/Screen';
import {
    AppForm as Form,
    AppFormField as FormField,
    SubmitButton,
    ErrorMessage 
    } from "../components/forms";
import useAuth from '../auth/useAuth';
import { Keyboard } from 'react-native';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password:Yup.string().required().min(4).label("Password")
})

function LoginScreen(props) {
    const auth = useAuth();
    const [loginFailed, setLoginFailed] = useState(false);

    // submit the form 
    const handleSubmit = async ({ email, password }) => {
        Keyboard.dismiss();
      const result = await authApi.login(email, password);
      if (!result.ok) return setLoginFailed(true);
      setLoginFailed(false);
        auth.logIn(result.data);
    };
    
    return (
        <Screen  style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo-red.png')} />
             <Form
                initialValues = {{ email : "", password:"" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
             >
                <ErrorMessage
                error="Invalid email and/or password."
                visible={loginFailed}
             />
                  <FormField
                
                autoCorrect={false}
                autoCapitalize="none"
                name="email"          
                icon="email"
                KeyboardType="email-address"     
                placeholder="Email"
                textContentType="emailAddress"

                        />
               <FormField               
                autoCorrect={false}
                autoCapitalize="none"
                icon="lock"
                KeyboardType="email-address"
                name="password"
                placeholder="Password"
                secureTextEntry
                textContentType="password"
                        />
            <SubmitButton title="Login" />
                
              
            </Form> 
            
       </Screen>
    );
}

const styles = StyleSheet.create({

    container: {
        padding:10,
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom:20,
    }
});

export default LoginScreen;