import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import SuccessModal from "./src/Components/Modal";
import TimeSlots from "./src/Components/TimeSlots";

const App = () => {
  const [timeSlots, setTimeSlots] = useState(TimeSlots);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Basic email validation using regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Basic name validation (minimum 2 characters)
  const isValidName = (name) => {
    return name.length > 1;
  };

  const handleTimeSlotPress = (item) => {
    if (item.available) {
      setSelectedTimeSlot(item);
      setIsFormValid(isValidName(name) && isValidEmail(email));
    }
  };

  const handleBooking = () => {
    if (selectedTimeSlot) {
      const updatedTimeSlots = timeSlots.map((slot) =>
        slot.id === selectedTimeSlot.id ? { ...slot, available: false } : slot
      );
      // Show the success modal
      setIsModalVisible(true);
      setName("");
      setEmail("");
      setSelectedTimeSlot(null);
      setIsFormValid(false);
      setTimeSlots(updatedTimeSlots);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking App</Text>

      <Text style={styles.sectionTitle}>Available Time Slots</Text>
      <FlatList
        data={timeSlots}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.timeSlot,
              {
                backgroundColor:
                  item.available && selectedTimeSlot?.id === item.id
                    ? "#bf7e9f"
                    : item.available
                      ? "#4CAF50"
                      : "#f20f12",
              },
            ]}
            onPress={() => handleTimeSlotPress(item)}
          >
            <Text style={styles.timeText}>{item.time}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.availabilityText}>
              {item.available ? "Available" : "Booked"}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>Booking Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          setIsFormValid(isValidName(text) && isValidEmail(email));
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setIsFormValid(isValidName(text) && isValidEmail(email));
        }}
      />
      <Button
        title="Book Now"
        onPress={handleBooking}
        disabled={!isFormValid || !selectedTimeSlot}
      />

      <SuccessModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  timeSlot: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  dateText: {
    fontSize: 14,
    color: "#fff",
  },
  availabilityText: {
    fontSize: 14,
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default App;
