import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "./Icons";
import AppText from "./Text";

function CategoryPickerItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Icon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={70}
        />
      </TouchableOpacity>
      <AppText style={styles.label}>{item.label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "34.7%",
  },
  label: {
    marginTop: 5,
    textAlign: "center",
    fontSize:15.7,
  },
});

export default CategoryPickerItem;