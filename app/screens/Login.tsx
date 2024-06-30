// import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import React, { useState } from 'react';
// import { Button, StyleSheet, TextInput, View } from 'react-native';

// const Login = ({navigation} : any) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [user, setUser] = useState(null);
//     const auth =getAuth ();


//     function isAuthSuccessful(authResult: any) {
//         if (!authResult || !authResult.user || !authResult._tokenResponse) {
//           return false;
//         }
     
//         if (!authResult._tokenResponse.email) {
//           return false;
//         }
   
//         if (!authResult.user.uid) {
//           return false;
//         }
      
//         return true;
//       }
      



//     const signUp = async ( ) => {
//       const after =  await createUserWithEmailAndPassword(auth, email,password);
//       console.log("Sign up after : " , after);
    
//       if(!after){
//         console.log("Sign up failed");
//         alert('Sign up failed !')
//       }else

//     }
//     const signIn = async () => {
//       const result =  await signInWithEmailAndPassword(auth, email, password);
//       console.log("Sign In user : " , user);

//       const authSuccess = isAuthSuccessful(result);
            
//             if (authSuccess) {
//               console.log("Authentification réussie !");
//              alert('Sign in Successful !');
//              navigation.navigate('My Todos');
//             } else {
//               console.log("Échec de l'authentification.");
//               alert('Erreur de mot de pass et ou de votre email !');
//             }


//     }

//     return (
//         <View style={styles.container}>

//             <TextInput keyboardType='email-address' style={styles.input} placeholder='Email' onChangeText={(text: string) => setEmail(text)} value={email}></TextInput>
//             <TextInput keyboardType='visible-password' style={styles.input} placeholder='Password' onChangeText={(text: string) => setPassword(text)} value={password}></TextInput>

//             <View style={styles.btns}>
//             <Button  onPress={signUp} title='Create account'/>
//             <Button onPress={signIn} title='Sign In'/>
//             </View>

//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         marginHorizontal: 20,
//         flexDirection:'column',
//         paddingVertical: 20,
        
//     },
//     form: {
//         flexDirection: 'row',
//         alignItems: "center",
//         marginTop: 10,
//         marginBottom: 10,
//     },
//     input: {
//         marginVertical: 4,
//         height: 40,
//         borderWidth: 1,
//         padding: 10,
//         backgroundColor: '#fff',
//         color: "#2b2b2b",
//         borderRadius: 4,

//     },
//     btns: {
//         marginTop: 30,
//         marginBottom: 10,
//         justifyContent: 'space-between',
//         flexDirection: 'column',
//         gap:10,


//     }
// })

// export default Login;


import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View, Alert } from 'react-native';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  function isAuthSuccessful(authResult:any) {
    if (!authResult || !authResult.user || !authResult._tokenResponse) {
      return false;
    }

    if (!authResult._tokenResponse.email) {
      return false;
    }

    if (!authResult.user.uid) {
      return false;
    }

    return true;
  }

  const signUp = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Sign up result: ", result);

      if (!isAuthSuccessful(result)) {
        console.log("Sign up failed");
        Alert.alert('Sign up failed!');
      } else {
        Alert.alert('Sign up successful!');
      }
    } catch (error) {
      console.error("Sign up error: ", error);
      Alert.alert('Sign up failed!');
    }
  };

  const signIn = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Sign In result: ", result);

      if (isAuthSuccessful(result)) {
        console.log("Authentication successful!");
        Alert.alert('Sign in successful!');
        navigation.navigate('My Todos');
      } else {
        console.log("Authentication failed.");
        Alert.alert('Invalid email or password!');
      }
    } catch (error) {
      console.error("Sign in error: ", error);
      Alert.alert('Sign in failed!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        keyboardType='email-address'
        style={styles.input}
        placeholder='Email'
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder='Password'
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <View style={styles.btns}>
        <Button onPress={signUp} title='Create account' />
        <Button onPress={signIn} title='Sign In' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 8,
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 4,
  },
  btns: {
    marginTop: 20,
    flexDirection: 'column',
    gap: 10,
  },
});

export default Login;
