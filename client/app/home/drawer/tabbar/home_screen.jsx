import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";

import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import {
  addAdmin,
  addMonthAmount,
} from "../../../../store/CreateSlices/UserSlice.js";

import { Colors } from "../../../../constants/index.js";
import { PieChart } from "react-native-gifted-charts";
import Admin_Header from "../../../../components/Home/Admin_Header.jsx";
import Money_Spend from "../../../../components/Home/Money_Spend.jsx";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import axios from "axios";

const homeScreen = () => {
  const { isAdmin, monthAmount } = useSelector((state) => state.user);
  const dispatchEvent = useDispatch();
  const [visible, setVisible] = useState(false);
  const [flag, setFlag] = useState(false);
  const [mthAmount, setMthAmount] = useState("");

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

  useEffect(() => {
    // dispatchEvent(addAdmin(true));
    // console.log(typeof mthAmount.amount1, typeof mthAmount.amount2);
    if (monthAmount === undefined) {
      dispatchEvent(
        addMonthAmount({ amount: "0", addDate: moment().format("YYYY-MM-DD") })
      );
      setMthAmount("");
    }
    // console.log("isAdmin", monthAmount);
  }, [monthAmount]);

  // var a = moment().format("YYYY-MM-DD");

  const handleOK = async () => {
    // await axios
    //   .post(`${process.env.EXPO_PUBLIC_API_URL}/api/user/add_monthAmount`, {
    //     id: "66ddcc5a47d0766194283459",
    //     mthAmount: amt,
    //   })
    //   .then((res) => {
    //     dispatchEvent(
    //       addMonthAmount({
    //         amount: res.data,
    //         addDate: moment().format("YYYY-MM-DD"),
    //       })
    //     );

    //   setMthAmount("");
    //   // const a = moment().format("YYYY-MM-DD");

    //   // setShowData(true);
    // })
    // .catch((err) => {
    //   console.log("Error while adding month amount", err);
    // });
    dispatchEvent(
      addMonthAmount({
        amount: parseInt(mthAmount),
        addDate: moment().format("YYYY-MM-DD"),
      })
    );

    setMthAmount("");

    setVisible(false);
  };

  var given = moment(monthAmount.addDate, "YYYY-MM-DD");
  var current = moment().startOf("day");

  var b = 1 + moment.duration(current.diff(given)).asDays();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#853e3a" />

      <Admin_Header />

      <View className="flex-1" style={[styles.container]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={{ gap: 10 }}
          >
            <Text className="text-[16px] font-[500] text-[#ffffff] ">
              day {b}: <Text className="text-[20px] font-baloo">Money</Text>
            </Text>
            <Text
              style={{
                color: Colors.white,
                fontSize: 32,
                fontWeight: "700",
              }}
            >
              ₹{monthAmount.amount !== "0" ? monthAmount.amount : "00"}.
              <Text style={{ fontSize: 22 }}>00 </Text>
              <Text className="text-[20px] font-[400] ">+</Text>
            </Text>
          </TouchableOpacity>

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

        {visible && (
          <View className="flex flex-row items-center  gap-2 ">
            <View className="flex-row bg-white px-[10px] py-[10px] rounded-[10px]">
              <Text className="text-[#484848] text-[20px] ">₹</Text>
              <TextInput
                className=" text-[18px]  text-[#545353] "
                placeholder="amount*"
                placeholderTextColor="#989898"
                keyboardType="numeric"
                value={mthAmount}
                onChangeText={(text) => setMthAmount(text)}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                if (mthAmount !== "") {
                  Alert.alert(
                    "Alert",
                    "Your previous month amount will be reset. Are your sure to confirm?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => setVisible(false),
                      },
                      {
                        text: "OK",
                        onPress: () => handleOK(),
                      },
                    ]
                  );
                } else {
                  Alert.alert("Error", "Please enter amount");
                }
                // dispatchEvent(
                //   addMonthAmount(
                //     (
                //       parseInt(mthAmount.amount1) + parseInt(mthAmount.amount2)
                //     ).toLocaleString("en-US")
                //   )
                // );
                // setVisible(false);
              }}
              className="flex-1 bg-blue-500 rounded-[10px] justify-center px-[20px]"
            >
              <Text className="text-[20px] font-baloo text-[#ffffff]">OK</Text>
            </TouchableOpacity>
          </View>
        )}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <Money_Spend />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default homeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
  },
});
