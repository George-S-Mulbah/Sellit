import React, {  useState } from 'react';

import AppNavigator from './app/Navigation/AppNavigator';
import AuthNavigator from './app/Navigation/AuthNavigator';
import navigationTheme from './app/Navigation/navigationTheme';
import { NavigationContainer } from '@react-navigation/native';
import {navigationRef }from './app/Navigation/rootNavigation';


import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import OfflineNotice from './app/components/OfflineNotice';
import { useEffect } from 'react/cjs/react.development';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';



export default function App() {
  const [user, setUser] = useState();

  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };
  
  // if (!isReady)
  //   return (
  //   <AppLoading startAysnc={restoreToken}  onFinish={()=>setIsReady(true)} />
  // );
 
  // useEffect(() => {
  //   restoreToken();  
  // },[])


  useEffect(() => {
    async function prepare() {
      try {

        // Keep the splash screen visible while we fetch resources
       
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);
        restoreUser();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }


  
  return (
    <AuthContext.Provider value={{user,setUser}}>
      <OfflineNotice />
      <View
       onLayout = {onLayoutRootView}

      />
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
     {user ?<AppNavigator/>:<AuthNavigator/>}
    </NavigationContainer>  
    
    </AuthContext.Provider>

    
  
  );

  

}
