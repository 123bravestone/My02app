import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants";
import { router } from "expo-router";

const Admin_Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoWrapper}>
        <Image
          source={{
            uri: "https://pics.craiyon.com/2023-10-25/b65f72d6d11a48c1bc560059cc36e31f.webp",
          }}
          style={styles.userImg}
        />

        <View style={{ marginLeft: 10 }}>
          <Text style={[styles.userText, { fontSize: 12 }]}>Hi, Jenny</Text>
          <Text style={[styles.userText, { fontSize: 16 }]}>
            Your
            <Text style={{ fontWeight: "700" }}> Budget</Text>
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          router.push("/home/my_tran");
        }}
        style={styles.binWrapper}
      >
        <Text style={styles.binText}>My Transactions</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Admin_Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  wrapper: {},
  userInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  userText: {
    color: Colors.white,
  },
  binWrapper: {
    borderColor: "#666",
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
  },
  binText: { color: Colors.white, fontSize: 12 },
});
