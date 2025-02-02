import React,{useState,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { useNavigation,useRouter } from 'expo-router';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {

  // const participantData = {
  //   gesID: 'GES123456',
  //   emailID: 'participant@example.com',
  //   name: 'John Doe',
  //   hallAllotted: 'Hall 7',
  //   college: 'XYZ University',
  // };

  const navigation = useNavigation();
  const router = useRouter();

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
        console.log(res.data); 
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchUserData();
  }, []);

  const participantData = data;

  const handleClose = () => {
    router.push("/")
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://reg-ges.ecell-iitkgp.org/assets/ges-CCLfU0UJ.png' }} 
        style={styles.logo} 
      />
      
      <Text style={styles.heading}>{participantData?.user_data?.first_name}</Text>

      <View style={styles.profileContainer}>
        <Text style={styles.profileText}><Text style={styles.boldText}>GES ID:</Text> {participantData?.user_data?.ges_id}</Text>
        <Text style={styles.profileText}><Text style={styles.boldText}>Name:</Text> {participantData?.user_data?.first_name} {participantData?.user_data?.last_name}</Text>
        <Text style={styles.profileText}><Text style={styles.boldText}>Role:</Text> {participantData?.user_data?.role}</Text>

        {/* <Text style={styles.profileText}><Text style={styles.boldText}>Startup Name:</Text> {participantData?.startup_data?.startup_name}</Text>
        <Text style={styles.profileText}><Text style={styles.boldText}>Industry:</Text> {participantData?.startup_data?.industry}</Text>
        <Text style={styles.profileText}><Text style={styles.boldText}>Year Estd:</Text> {participantData?.startup_data?.year_of_establishment}</Text> */}

        {/* <Text style={styles.profileText}><Text style={styles.boldText}>Profession:</Text> {participantData?.professional_data?.proffession}</Text>
        <Text style={styles.profileText}><Text style={styles.boldText}>Industry:</Text> {participantData?.professional_data?.industry}</Text>
        <Text style={styles.profileText}><Text style={styles.boldText}>Years of Experience:</Text> {participantData?.professional_data?.years_of_experience}</Text> */}

        {/* <Text style={styles.profileText}><Text style={styles.boldText}>College:</Text> {participantData?.student_data?.insti}</Text>
        <Text style={styles.profileText}><Text style={styles.boldText}>Year of Study:</Text> {participantData?.student_data?.year}</Text> */}

      {participantData?.user_data?.role === "Startup Founder" && (
        <>
          <Text style={styles.profileText}>
            <Text style={styles.boldText}>Startup Name:</Text> {participantData?.startup_data?.startup_name}
          </Text>
          <Text style={styles.profileText}>
            <Text style={styles.boldText}>Industry:</Text> {participantData?.startup_data?.industry}
          </Text>
          <Text style={styles.profileText}>
            <Text style={styles.boldText}>Year Estd:</Text> {participantData?.startup_data?.year_of_establishment}
          </Text>
        </>
      )}

      {participantData?.user_data?.role === "Professional" && (
        <>
          <Text style={styles.profileText}>
            <Text style={styles.boldText}>Profession:</Text> {participantData?.professional_data?.proffession}
          </Text>
          <Text style={styles.profileText}>
            <Text style={styles.boldText}>Industry:</Text> {participantData?.professional_data?.industry}
          </Text>
          <Text style={styles.profileText}>
            <Text style={styles.boldText}>Years of Experience:</Text> {participantData?.professional_data?.years_of_experience}
          </Text>
        </>
      )}

      {participantData?.user_data?.role === "Student" && (
        <>
          <Text style={styles.profileText}>
            <Text style={styles.boldText}>College:</Text> {participantData?.student_data?.insti}
          </Text>
          <Text style={styles.profileText}>
            <Text style={styles.boldText}>Year of Study:</Text> {participantData?.student_data?.year}
          </Text>
        </>
      )}

        <Text style={styles.profileText}><Text style={styles.boldText}>Email ID:</Text> <Text >{participantData?.user_data?.email}</Text> </Text>
        <Text style={styles.profileText}><Text style={styles.boldText}>Contact:</Text> {participantData?.user_data?.phone_number}</Text>
        
      </View>

      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 180,
    height: 40,  
  },
  heading: {
    fontSize: 40,
    fontWeight: '700',
    color: '#4a3c8c',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 50,
    width: '90%',
    height:'400',
    shadowColor: '#000',
    justifyContent:'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 30,
  },
  profileText: {
    fontSize: 18,
    marginBottom: 15,
    lineHeight: 24,
    color: '#333',
  },
  boldText: {
    fontWeight: '600',
    color: '#4a3c8c',
  },
  closeButton: {
    backgroundColor: '#744ea6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Profile;
