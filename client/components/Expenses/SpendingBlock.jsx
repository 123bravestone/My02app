import { View, Text, Alert } from "react-native";
import React, { useEffect } from "react";
// import { SpendingType } from "@/types";
import { Colors } from "../../constants";
import { WalletCardIcon } from "../../constants/svg_Icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllSpends,
  addMonthlySpends,
} from "../../store/CreateSlices/UserSlice";
import moment from "moment";

const SpendingBlock = () => {
  const { allSpends, monthlySpends } = useSelector((state) => state.user);

  const dispatchEvent = useDispatch();

  const handleMessage = (index, id) => {
    // console.log(id);
    const singleSpend = monthlySpends[index].spends.find(
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
                        monthlySpends.map((mthSpends, i) => {
                          if (i === index) {
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

  // useEffect(() => {
  //   console.log("data", typeof monthlySpends);
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      {monthlySpends &&
        monthlySpends.length > 0 &&
        monthlySpends.map((mthSpends, index) => {
          return (
            <>
              <View key={index} className="flex-row justify-between mt-4">
                <Text className="text-[20px] text-white font-baloo">
                  Spending
                </Text>
                <Text className="text-[20px] text-white font-baloo">
                  {mthSpends.monthYear}
                </Text>
              </View>
              {mthSpends.spends ? (
                mthSpends.spends.map((spend) => (
                  <TouchableOpacity
                    key={spend.id}
                    onPress={() => handleMessage(index, spend.id)}
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
                      <WalletCardIcon
                        width={30}
                        height={30}
                        color={Colors.white}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ flexDirection: "column", gap: 5 }}>
                        <Text
                          style={{
                            fontWeight: "700",
                            color: Colors.white,
                            fontSize: 16,
                          }}
                        >
                          {spend.title}...
                        </Text>
                        <Text style={{ color: Colors.white, fontSize: 14 }}>
                          {spend.time} / {spend.date}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontWeight: "700",
                          color: Colors.white,
                          fontSize: 18,
                        }}
                      >
                        ₹{spend.amount}.
                        <Text style={{ fontSize: 12, color: "#cccbcb" }}>
                          00
                        </Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View className=" items-center justify-center h-[200px] ">
                  <Text className="text-white font-baloo text-[24px]">
                    No Spending
                  </Text>
                </View>
              )}
            </>
          );
        })}
    </View>
  );
};

export default SpendingBlock;
