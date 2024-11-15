import 'dotenv/config';

export default {
  expo: {
    android: {
        package: "com.magmastorm.dailymealplanner", // Replace with your actual package name
      },
      ios: {
        bundleIdentifier: "com.magmastorm.dailymealplanner", // Your iOS bundle identifier
      },
  
    extra: {
      apiKey: process.env.EXPO_PUBLIC_API_URL,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.app,
      eas: {
        projectId: '03b31038-ce52-4908-8939-a6a5797f9f2c'
      },
    },
   
  },
};
