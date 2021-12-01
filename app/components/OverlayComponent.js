import React, { useState } from 'react';
import { View, StyleSheet,  Text, } from 'react-native';

import { AntDesign } from '@expo/vector-icons'; 

import { Overlay, Icon,Button } from 'react-native-elements';
import AppText from './Text';
import AppButton from './Button';
import colors from '../config/colors';


function OverlayComponent({visible,loadingError,toggleOverlay}) {

  // const [visible, setVisible] = useState(0);
  // const [loadingError, setLoadingError] = useState(false);

  // const toggleOverlay = () => {
  //  return setVisible(!visible);
  // };

  return (
    <View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <View style={styles.container}>
          
          {!loadingError ? (
           <> 
          <AntDesign
          style={styles.checkmark}
          name="checkcircle"
          size={104}
              color={colors.green} />
             <AppText
                style={styles.textPrimary}>Successfully posted</AppText>                                 
         <Button
          title="Cancel"
           type="outline"
          raised={true}
          disabledStyle={styles.button}
          buttonStyle={styles.button}
          titleStyle={styles.text}
          disabledTitleStyle={styles.text}
          onPress={toggleOverlay}      
         />
            </>
          ) : (
              <>
            <AntDesign
          style={styles.checkmark}
          name="closecircle"
          size={104}
              color={colors.primary} />
             <AppText
                  style={styles.textPrimary}>Oops error posting!!</AppText>
                
                <Button
                  title="Try again"
                  type="outline"
                  raised={true}
                  disabledStyle={styles.erroBtn}
                  buttonStyle={styles.erroBtn}
                  titleStyle={[styles.text ,{fontSize:16}]}
                  disabledTitleStyle={styles.text}
                  onPress={toggleOverlay}      
                />
                </>
        )}
       </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 500,
    height:500,
    alignItems: "center",
    justifyContent:"center",
  },

  button: {
    width: 200,
    flexDirection:"row",
    color: colors.white,
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:5,
    
  },

  erroBtn: {
    width: 200,
    flexDirection:"row",
    color: colors.white,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:5,
  },

  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    marginLeft: 30,
    marginRight:30,
  },
 
  textPrimary: {
    marginVertical: 50,
    textAlign: 'center',
    textTransform:"uppercase",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },

  checkmark: {
    alignItems: "center",
    justifyContent: "center",
  }
});

export default OverlayComponent;