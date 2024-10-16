import { Text, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Colors } from "../../constants/Colors";
import { buttonOutLine, buttonText } from "../../constants/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSigninButton() {
  // Set up Google Sign-In, promptAsync() is called to begin google signin process
  const [userInfo, setUserinfo] = useState(null)
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "995537696470-i1oulq48mu9mfhj0ful191dddh5nm5pa.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (request) {
      console.log("Google request", request);
    }
  }, [request]);

  async function handleSignInWithGoogle(){
    const user = await AsyncStorage.getItem('@user');
    if(!user){
        if(response?.type === "success"){
            await getUserInfo(response.authentication.accessToken);
        }
     } else {
          setUserinfo(JSON.parse(user))
     }
  }

  const getUserInfo = async (token) => {
    if(!token) return;
    try{
        const response = await fetch("https://www.googleapis.com/userinfo/me", {
            headers: { Authorization: `Bearer ${token}`}
        });
        const user = await response.json();
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        setUserinfo(user);
        console.log("googlw user: ",user);
    }catch (error){
        console.log("Google signin Error: ",error);
    }
  }

  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        onPress={() => {
          console.log("Google Sign-In prompt initiated");
          promptAsync().then((result) => {
            console.log("Prompt result:", result);
           // handleSignInWithGoogle;
          });
        }}
        disabled={!request}
        style={buttonOutLine}
      >
        <Icon.Button
          name="google"
          size={24}
          backgroundColor="#fff"
          color={Colors.appBlue}
        />
        <Text style={{color: Colors.appBlue,fontSize: 18,
    fontWeight: "bold"}}>Sign In with Google</Text>
     
        
      </TouchableOpacity>
    </View>
  );
}
