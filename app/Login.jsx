import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { useNavigation,useRouter } from "expo-router";


const LoginScreen = () => {

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("jwtToken");
        if (token) {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    checkToken();
  }, []);

  axios.defaults.baseURL = "https://api-ges.ecell-iitkgp.org/";


  const navigation = useNavigation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (!formData.username || !formData.password) {
        setMessage("Enter all details");
        return;
      }

      const response = await axios.post("/api/v1/token/", formData);

      const accessToken = response.data.access;
      await AsyncStorage.setItem("jwtToken", accessToken);

      setMessage("Login Successful!");
      setTimeout(() => {
        router.push("/")
      }, 100);

      console.log("Login Success");
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setMessage("Login Failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "https://reg-ges.ecell-iitkgp.org/assets/ges-CCLfU0UJ.png" }}
          style={styles.image}
        />
      </View>


      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        {message ? <Text style={styles.message}>{message}</Text> : null}


        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={formData.username}
            onChangeText={(text) => handleChange("username", text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>


        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry
          />
        </View>


        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>


        <View style={styles.signupContainer}>
          <Text>Are you new here?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.signupText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fafc",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    padding:0
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  formContainer: {
    width: "90%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d3748",
    textAlign: "center",
    marginBottom: 20,
  },
  message: {
    textAlign: "center",
    color: "red",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#4a5568",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e0",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  signupText: {
    color: "#4299e1",
    marginLeft: 5,
    fontWeight: "bold",
  },
});

export default LoginScreen;