import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import React, { useState } from "react";
// import { IncomeType } from "@/types";
import { Colors } from "../../constants";
import {
  RupeesIcon,
  WalletAddMoneyIcon,
  WalletCardIcon,
} from "../../constants/svg_Icons";
import Feather from "@expo/vector-icons/Feather";
import moment from "moment";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const IncomeBlock = ({ incomeList }) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateValue, setDateValue] = useState("");

  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateValue(moment(currentDate).format("DD MMM YYYY"));
      }
    } else {
      toggleDatePicker();
    }
  };

  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <View
            style={{
              flex: 1,
              borderWidth: 2,
              borderColor: "#666",
              borderStyle: "dashed",
              padding: 10,
              borderRadius: 10,
              marginRight: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="plus" size={24} color="white" />
            <Text style={{ color: "white", marginTop: 10, fontSize: 12 }}>
              Add Item
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    let icon = <RupeesIcon width={20} height={20} />;
    if (item.name === "Freelancing") {
      icon = <WalletCardIcon width={20} height={20} color={Colors.white} />;
    } else if (item.name === "Interest") {
      icon = <WalletAddMoneyIcon width={20} height={20} color={Colors.white} />;
    }

    const amt = item.amount?.split(".");
    if (!amt) return null;
    return (
      <TouchableOpacity
        onPress={() => Alert.alert(item.name)}
        style={{
          backgroundColor: Colors.grey,
          padding: 20,
          borderRadius: 20,
          marginRight: 15,
          width: 150,
          gap: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderColor: "#fff",
              borderWidth: 1,
              borderRadius: 20,
              padding: 5,
              alignSelf: "flex-start",
            }}
          >
            {icon}
          </View>

          <TouchableOpacity onPress={() => {}}>
            <Feather name="more-horizontal" size={24} color="#cccbcb" />
          </TouchableOpacity>
        </View>
        <Text style={{ color: "white" }}>{item.name}</Text>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>
          ₹{amt[0]}.
          <Text style={{ fontSize: 12, color: "#cccbcb" }}>{amt[1]}</Text>
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text className="text-[14px] text-[#ffffff] text-center">
        My{" "}
        <Text className="text-[20px] font-baloo text-[#ffffff] text-center">
          Incomes
        </Text>
      </Text>

      <FlatList
        data={incomeList}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {isDatePickerVisible && (
        <RNDateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
          maximumDate={new Date()}
          minimumDate={new Date(2023, 0, 1)}
        />
      )}

      {visible && (
        <View className="flex-1 ">
          <Text className="text-[#ffffff] text-[24px] font-baloo my-[20px]">
            Add Spending
          </Text>

          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            containerStyle={{
              borderRadius: 10,
            }}
            itemContainerStyle={{
              marginVertical: -8,
              // height: 10,
              // padding: "0",
              borderRadius: 10,
            }}
            placeholderStyle={styles.placeholderStyle}
            activeColor="#b9b9b9"
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select item" : "..."}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? "blue" : "black"}
                name="Safety"
                size={20}
              />
            )}
          />
          <View className="flex-1 flex-row justify-between my-[20px] ">
            <View>
              <TextInput
                className=" text-[18px] bg-white text-[#545353] px-[10px] py-[10px] rounded-[10px]"
                placeholder="₹amount*"
                placeholderTextColor="#989898"
                keyboardType="numeric"
                // value={spending.amount}
                // onChangeText={(text) =>
                //   setSpending({ ...spending, amount: text })
                // }
              />
            </View>
            <Pressable
              onPress={toggleDatePicker}
              className="bg-white px-[20px] py-[10px] rounded-[10px] justify-center"
            >
              <Text
                className={`${
                  dateValue ? "text-[#373737]" : "text-[#8e8d8d]"
                } text-[16px] `}
              >
                {dateValue ? dateValue : moment().format("DD, MMM YYYY")}
              </Text>
            </Pressable>
            <TouchableOpacity
              onPress={() => {
                // handleSpending();
              }}
              className=" bg-blue-500 rounded-[10px] justify-center px-[20px]"
            >
              <Text className="text-[20px] font-baloo text-[#ffffff]">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default IncomeBlock;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
