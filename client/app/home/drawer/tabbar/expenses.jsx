import { View, Text, ScrollView, StatusBar, StyleSheet } from "react-native";

import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch } from "react-redux";
import { addAdmin } from "../../../../store/CreateSlices/UserSlice.js";

import { Colors } from "../../../../constants/index.js";
import { PieChart } from "react-native-gifted-charts";

import ExpenseBlock from "../../../../components/Expenses/ExpenseBlock.jsx";
import ExpensList from "../../../../data/expenses.json";
import IncomeBlock from "../../../../components/Expenses/IncomeBlock.jsx";
import IncomeList from "../../../../data/income.json";
import SpendingBlock from "../../../../components/Expenses/SpendingBlock.jsx";
import { TouchableOpacity } from "react-native-gesture-handler";
// import SpendingList from "../../../../data/spending.json";

const Expenses = () => {
  const dispatch = useDispatch();

  const pieData = [
    {
      value: 47,
      color: Colors.tintColor,
      focused: true,
      text: "47%",
    },
    {
      value: 40,
      color: Colors.blue,
      text: "40%",
    },
    {
      value: 16,
      color: Colors.white,
      text: "16%",
    },
    { value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97", text: "3%" },
  ];

  // useEffect(() => {
  //   console.log("allSpend", allSpends);
  //   dispatch(addAdmin(true));
  // }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#853e3a" />

      <View
        style={[
          styles.container,
          { backgroundColor: Colors.black, paddingTop: 10 },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ gap: 10 }}>
            <Text style={{ color: Colors.white, fontSize: 16 }}>
              My <Text style={{ fontWeight: "700" }}>Expenses</Text>
            </Text>
            <Text
              style={{
                color: Colors.white,
                fontSize: 32,
                fontWeight: "700",
              }}
            >
              ₹14758.<Text style={{ fontSize: 22 }}>45</Text>
            </Text>
          </View>

          <View style={{ paddingVertical: 20, alignItems: "center" }}>
            <PieChart
              data={pieData}
              donut
              showGradient
              sectionAutoFocus
              focusOnPress
              semiCircle
              radius={70}
              innerRadius={50}
              innerCircleColor={Colors.black}
              centerLabelComponent={() => {
                return (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      47%
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>

        <Text
          style={{
            color: Colors.white,
            fontSize: 20,
            fontWeight: "400",
          }}
        >
          Out of: ₹30000.<Text style={{ fontSize: 16 }}>00</Text>
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <ExpenseBlock expensList={ExpensList} />
          <IncomeBlock incomeList={IncomeList} />
          <SpendingBlock />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Expenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
  },
});
