import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants";
import { TextInput } from "react-native-gesture-handler";
import moment from "moment";
// import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  addAllSpends,
  addMonthlySpends,
} from "../../store/CreateSlices/UserSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { WalletCardIcon } from "../../constants/svg_Icons.jsx";
// import axios from "axios";

let a = "March 2024";
let c = moment([2024, 2, 1]).format("ddd, DD MMM");

const Money_Spend = () => {
  const { allSpends, monthlySpends } = useSelector((state) => state.user);
  const dispatchEvent = useDispatch();

  const [spending, setSpending] = useState({
    id: "",
    title: "",
    amount: 0,
    monthYear: "",
    date: "",
    time: "",
  });
  // const [mthSpends, setMthSpends] = useState({
  //   id: "",
  //   monthYear: "",
  //   spends: [],
  // });

  const handleSpending = async () => {
    setSpending(
      (spending.id = moment().format("YYYYMMDDhhmmss")),
      (spending.date = c),
      (spending.time = moment().format("hh:mm a")),
      // (spending.monthYear = moment().format("MMMM YYYY"))
      (spending.monthYear = a)
    );
    // console.log("spending:", spending);

    if (
      spending.title === "" ||
      spending.amount === "" ||
      spending.amount === 0 ||
      !spending.amount
    ) {
      setSpending({ title: "", amount: "", date: "", id: "", time: "" });
      Alert.alert("Error", "Please fill all the vaild fields");
      return;
    } else {
      if (monthlySpends.length > 0 && a === monthlySpends[0].monthYear) {
        dispatchEvent(
          addMonthlySpends(
            monthlySpends.map((spend, index) => {
              if (index === 0) {
                return {
                  ...spend,
                  spends: [spending, ...spend.spends],
                };
              }
              return spend;
            })
          )
        );
        setSpending({
          title: "",
          amount: "",
          date: "",
          id: "",
          time: "",
        });
        return;
      }

      dispatchEvent(
        addMonthlySpends([
          {
            id: new Date().getTime(),
            monthYear: a,
            spends: [spending],
          },
          ...monthlySpends,
        ])
      );
      setSpending({ title: "", amount: "", date: "", id: "", time: "" });
    }
  };

  useEffect(() => {
    if (monthlySpends === undefined) {
      dispatchEvent(addMonthlySpends([]));
    }
    // dispatchEvent(addMonthlySpends([]));

    // console.log("monthlySpends:", monthlySpends);
  }, []);

  const handleMessage = (id) => {
    const singleSpend = monthlySpends[0].spends.find(
      (spend) => spend.id === id
    );
    Alert.alert(
      "Message",
      `${singleSpend.title} and Rs. ${singleSpend.amount} was spending on ${singleSpend.date}`,

      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            Alert.alert(
              "Delete",
              "Are you sure you want to delete this spending?",

              [
                {
                  text: "No",
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: () => {
                    dispatchEvent(
                      addMonthlySpends(
                        monthlySpends.map((mthSpends, index) => {
                          if (index === 0) {
                            return {
                              ...mthSpends,
                              spends: mthSpends.spends.filter(
                                (spend) => spend.id !== id
                              ),
                            };
                          }

                          return mthSpends;
                        })
                      )
                    );
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 ">
      <Text className="text-[#ffffff] text-[24px] font-baloo my-[20px]">
        Add Spending
      </Text>

      <View className="flex-1">
        <TextInput
          className=" text-[20px] bg-white text-[#545353] px-[20px] py-[10px] rounded-[10px]"
          placeholder="Title of money spend*"
          placeholderTextColor="#989898"
          value={spending.title}
          onChangeText={(text) => setSpending({ ...spending, title: text })}
        />
      </View>
      <View className="flex-1 flex-row justify-between my-[20px] ">
        <View className="flex-row bg-white px-[10px] py-[10px] rounded-[10px]">
          <Text className="text-[#484848] text-[20px] ">₹</Text>
          <TextInput
            className=" text-[18px]  text-[#545353] "
            placeholder="amount*"
            placeholderTextColor="#989898"
            keyboardType="numeric"
            value={spending.amount}
            onChangeText={(text) =>
              setSpending({ ...spending, amount: Math.floor(parseInt(text)) })
            }
          />
        </View>
        <View className="bg-white px-[20px] py-[10px] rounded-[10px] justify-center">
          <Text className="text-[#989898] text-[16px] ">
            {moment().format("hh:mm a")}/{c}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleSpending}
          className=" bg-blue-500 rounded-[10px] justify-center px-[20px]"
        >
          <Text className="text-[20px] font-baloo text-[#ffffff]">OK</Text>
        </TouchableOpacity>
      </View>

      {/* data store */}

      {monthlySpends[0] ? (
        <>
          <View className="flex-row items-center justify-between mt-4">
            <Text className="text-[20px] text-white font-baloo">
              Money_Spending
            </Text>
            <Text className="text-[20px] text-white font-baloo">
              {monthlySpends[0].monthYear}
            </Text>
          </View>
          {monthlySpends[0].spends.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleMessage(item.id)}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginVertical: 5,
                borderRadius: 10,
                backgroundColor: Colors.grey,
              }}
            >
              <View
                style={{
                  padding: 10,
                  backgroundColor: Colors.black,
                  borderRadius: 30,
                  marginRight: 15,
                }}
              >
                <WalletCardIcon width={26} height={26} color={Colors.white} />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "column", gap: 5, width: "60%" }}>
                  <Text
                    style={{
                      fontWeight: "700",
                      color: Colors.white,
                      fontSize: 16,
                    }}
                  >
                    {item.title}...
                  </Text>
                  <Text style={{ color: Colors.white, fontSize: 14 }}>
                    {item.time} / {item.date}
                  </Text>
                </View>
                <Text
                  style={{
                    fontWeight: "700",
                    color: Colors.white,
                    fontSize: 18,
                  }}
                >
                  ₹{item.amount}.
                  <Text style={{ fontSize: 12, color: "#cccbcb" }}>
                    {/* {amt[1]} */}
                    00
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-[24px] text-white font-baloo">No Data</Text>
        </View>
      )}
    </View>
  );
};

export default Money_Spend;
