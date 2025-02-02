import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
  ScrollView
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import HighlightCarousel from "../components/Carousel";
import {NavigationContainer} from '@react-navigation/native';
import { useNavigation,useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import axios from "axios";

const SpeakerProfile = ({ speaker }) => {
  const { name, image, designation, sessionType, location } = speaker;

  const openMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.profileImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.designation}>{designation}</Text>
        <Text style={styles.sessionType}>{sessionType}</Text>
      </View>
      <TouchableOpacity style={styles.directionButton} onPress={openMaps}>
        <Ionicons name="navigate" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const Dashboard = () => {

  const highlights = [
        { id: '1', title: 'Highlight Session 1', image: 'https://via.placeholder.com/600' },
        { id: '2', title: 'Highlight Session 2', image: 'https://via.placeholder.com/600' },
        { id: '3', title: 'Highlight Session 3', image: 'https://via.placeholder.com/600' },
        ];  

    const sampleSpeakers = [
        { name: "Dr. Jane Doe", image: "https://via.placeholder.com/600", designation: "AI Researcher", sessionType: "Keynote", location: "Convention Center, Hall 3", day: "Day 0" },
        { name: "John Smith", image: "https://via.placeholder.com/600", designation: "Cybersecurity Expert", sessionType: "Workshop", location: "Tech Park, Room 101", day: "Day 0" },
        { name: "Emily Johnson", image: "https://via.placeholder.com/600", designation: "Blockchain Developer", sessionType: "Panel", location: "Innovation Hub, Room 202", day: "Day 1" },
        { name: "Michael Brown", image: "https://via.placeholder.com/600", designation: "Data Scientist", sessionType: "Keynote", location: "Grand Hall, Section A", day: "Day 1" },
        { name: "Sarah Williams", image: "https://via.placeholder.com/600", designation: "Cloud Engineer", sessionType: "Workshop", location: "Cloud Center, Lab 3", day: "Day 2" },
        { name: "David Wilson", image: "https://via.placeholder.com/600", designation: "IoT Specialist", sessionType: "Panel", location: "Tech Arena, Booth 5", day: "Day 2" },
        { name: "Anna Davis", image: "https://via.placeholder.com/600", designation: "UX Designer", sessionType: "Keynote", location: "Design Studio, Room 12", day: "Day 0" },
        { name: "James Martinez", image: "https://via.placeholder.com/600", designation: "Robotics Engineer", sessionType: "Workshop", location: "Robotics Lab, Section 7", day: "Day 1" },
        { name: "Patricia Anderson", image: "https://via.placeholder.com/600", designation: "Quantum Computing Expert", sessionType: "Panel", location: "Physics Dept, Lecture Hall 2", day: "Day 2" },
        { name: "Robert Thomas", image: "https://via.placeholder.com/600", designation: "AI Ethics Researcher", sessionType: "Keynote", location: "Main Auditorium, Stage 1", day: "Day 0" },
        ];

    const [selectedDay, setSelectedDay] = useState("All");

    const filteredSpeakers = sampleSpeakers.filter(speaker => selectedDay === "All" || speaker.day === selectedDay);


    axios.defaults.baseURL = "https://api-ges.ecell-iitkgp.org/";

    const [data, setData] = useState(null);
    const [token, setToken] = useState(null);
    
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const storedToken = await AsyncStorage.getItem("jwtToken");
          
          if (!storedToken) {
            console.error("No token found");
            router.push("./Login");
            return;
          }
    
          setToken(storedToken);
    
          const headers = {
            Authorization: `Bearer ${storedToken}`, 
          };
    
          const res = await axios.get("/api/v1/dashboard/", { headers });
          setData(res.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
      fetchUserData();
    }, []);

    const navigation = useNavigation();
    const router = useRouter();
    const handleClose = () => {
      router.push("/Profile");
    };

    const logout = async ()=>{
      await AsyncStorage.removeItem("jwtToken")
      router.push("./Login")
    }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f7fafc", padding: 20, marginTop: 0, marginBottom: 60 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#6f5fbe",
            padding: 10,
            borderRadius: 50000,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleClose}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>{data?.user_data?.first_name?.charAt(0)}</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: "https://reg-ges.ecell-iitkgp.org/assets/ges-CCLfU0UJ.png" }}
          style={{
            width: 200,
            height: 40,
            resizeMode: 'contain',
            alignItems: "center",
            justifyContent: "center"
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#6f5fbe",
            padding: 10,
            borderRadius: 5,
            width: 70,
            height: 40,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={logout}
        >
          <Text style={{ color: "#fff" }}>Logout</Text>
        </TouchableOpacity>
      </View>
        <HighlightCarousel highlights={highlights} />

      <View style={{justifyContent:"space-between",alignItems:"center",flexDirection:"row",margin:"20"}}>
      <TouchableOpacity style={{ padding: 10, backgroundColor: "#000", borderRadius: 5 }} onPress={()=>{setSelectedDay("All")}} ><Text style={{ color: "#fff" }}>All</Text></TouchableOpacity>
      <TouchableOpacity style={{ padding: 10, backgroundColor: "#000", borderRadius: 5 }} onPress={()=>{setSelectedDay("Day 0")}}><Text style={{ color: "#fff" }}>Day 0</Text></TouchableOpacity>
      <TouchableOpacity style={{ padding: 10, backgroundColor: "#000", borderRadius: 5 }} onPress={()=>{setSelectedDay("Day 1")}}><Text style={{ color: "#fff" }}>Day 1</Text></TouchableOpacity>
      <TouchableOpacity style={{ padding: 10, backgroundColor: "#000", borderRadius: 5 }} onPress={()=>{setSelectedDay("Day 2")}}><Text style={{ color: "#fff" }}>Day 2</Text></TouchableOpacity>
      </View>
      {filteredSpeakers.map((speaker, index) => (
        <SpeakerProfile key={index} speaker={speaker} />
      ))}
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  designation: {
    fontSize: 14,
    color: 'gray',
  },
  sessionType: {
    fontSize: 14,
    color: 'blue',
  },
  directionButton: {
    backgroundColor: '#6f5fbe',
    padding: 10,
    borderRadius: 5,
  },
});

export default Dashboard;
