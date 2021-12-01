import React from 'react';
import * as Notifications from 'expo-notifications';
import { View, StyleSheet } from 'react-native';
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
  ErrorMessage 
} from "./forms";
import * as Yup from "yup";
import { Keyboard } from 'react-native';
import messagesApi from "../api/messages";

function ContactSellerForm({listing}) {

  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();
    const result = await messagesApi.send(message, listing.id);

    if (!result.ok) {
      console.log("Error", result);
      return Alert.alert("Error", "Could not send the message to the seller.");
    }

    resetForm();

   
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});
    
    const content = { title: message };
    
    Notifications.scheduleNotificationAsync({ content, trigger: null });
  };
  return (
    <Form
    initialValues={{ message: "" }}
    onSubmit={handleSubmit}
    validationSchema={validationSchema}
  >
    <FormField
      maxLength={255}
      multiline
      name="message"
      numberOfLines={2}
      placeholder="Message..."
    />
    <SubmitButton title="Contact Seller" />
    </Form>
  );
}

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

const styles = StyleSheet.create({
  container: {}
});

export default ContactSellerForm;