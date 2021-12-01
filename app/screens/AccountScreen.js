import React from 'react';
import { View } from 'react-native';
import { StyleSheet, FlatList } from 'react-native';
import useAuth from '../auth/useAuth';


import Icons from '../components/Icons';
import {
  ListItem,
  ListItemSeparator,
} from "../components/lists";
import Screen from '../components/Screen';
import colors from '../config/colors';
import routes from '../Navigation/routes';

function AccountScreen({ navigation }) {
  
  
  const { user, logOut} = useAuth();

  

  const menuItems = [
    {
      title: "My Listings",
      icon: {
        name: "format-list-bulleted",
        backgroundColor: colors.primary,
      },
    },
    {
      title: "My Messages",
      icon: {
        name: "email",
        backgroundColor: colors.secondary,
      },
      targetScreen:routes.MESSAGES,
    },
    
      ];
    return (
      <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title= {user.name}
          subTitle={user.email}
          image={require("../assets/Barseegiah.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
            keyExtractor={(menuItem) => menuItem.title}
            ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icons
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
          IconComponent={<Icons name="logout" backgroundColor="#ffe66d" />}
          onPress={()=>logOut()}
      />
    </Screen>
            
    );
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  }
});

export default AccountScreen;