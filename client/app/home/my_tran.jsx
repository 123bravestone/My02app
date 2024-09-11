import { View, Text } from "react-native";
import React from "react";
import moment from "moment";

const My_transaction = () => {
  var a = moment().format("YYYY-MM-DD");
  var given = moment("2024-09-02", "YYYY-MM-DD");
  var current = moment().startOf("day");

  var b = moment.duration(current.diff(given)).asDays();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>{b}</Text>
      <Text>{a}</Text>
    </View>
  );
};

export default My_transaction;
