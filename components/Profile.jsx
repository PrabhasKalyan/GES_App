import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const navigation = useNavigation();

const ProfilePage = ({navigation})=>{
    const participantData = {
        gesID: 'GES1234',
        emailID: 'participant@example.com',
        name: 'John Doe',
        hallAllotted: 'Hall 7',
        college: 'XYZ University',
      };
    
      const handleClose = () => {
        console.log("Profile closed.");
        navigation.navigate("Dashboard");
      };

      return (
        <View style={styles.container}>
          <Text style={styles.heading}>GES Participant Profile</Text>
    
          <View style={styles.profileContainer}>
            <Text style={styles.profileText}><strong>GES ID:</strong> {participantData.gesID}</Text>
            <Text style={styles.profileText}><strong>Name:</strong> {participantData.name}</Text>
            <Text style={styles.profileText}><strong>Email ID:</strong> {participantData.emailID}</Text>
            <Text style={styles.profileText}><strong>Hall Allotted:</strong> {participantData.hallAllotted}</Text>
            <Text style={styles.profileText}><strong>College:</strong> {participantData.college}</Text>
          </View>
    
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    profileContainer: {
      marginBottom: 20,
    },
    profileText: {
      fontSize: 16,
      marginBottom: 10,
    },
    closeButton: {
      backgroundColor: '#FF6347',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    closeButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  