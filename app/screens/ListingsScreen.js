import React from 'react';
import { FlatList, View, StyleSheet,  } from 'react-native';
import listingsApi from "../api/listings";


import ActivityIndicator from '../components/ActivityIndicator';
import Text from '../components/Text';
import Button from '../components/Button';
import Card from "../components/Card";
import colors from '../config/colors';
import Screen from '../components/Screen';
import routes from '../Navigation/routes';
import { useState } from 'react';
import { useEffect } from 'react';
import useApi  from '../hooks/useApi';



function ListingsScreen({navigation}) {
  const getListingsApi = useApi(listingsApi.getListings);

  useEffect(() => {
    getListingsApi.request();
  //  console.log(getListingsApi);
  }, []);

  return (
      <>
        <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {getListingsApi.error && <>
          <Text>Couldn't find the Listings</Text>
          <Button title="Retry" onPress={getListingsApi.request}/>
        </>}
            <FlatList
                data={getListingsApi.data}
                keyExtractor={listings => listings.id.toString()}
                renderItem={({ item }) => (
                  <Card
            title={item.title}
            subTitle={"$" + item.price}
            imageUrl={item.images[0].url}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            thumbnailUrl={item.images[0].thumbnailUrl}
          />
        )}
        />
        
      </Screen>
      </>
    );
}
const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.light,
        padding:7,
    }
    
});
export default ListingsScreen;