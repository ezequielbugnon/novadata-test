import { ExpressImplementation } from "./framework/express"
import { AppRoutesExpress } from "./framework/express/routes"
import { Server } from "./server"

(() => {
    main()
})()

async function main() {
    const express = new ExpressImplementation(
      {
        port:3000,
        routes: AppRoutesExpress.routes
      }
    )
    new Server(express).start()
}

// Import the functions you need from the SDKs you need
/*import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqwqcBCiGON6eQY1BKHJY7gaoxwAPiKpU",
  authDomain: "novadata-test.firebaseapp.com",
  projectId: "novadata-test",
  storageBucket: "novadata-test.appspot.com",
  messagingSenderId: "495401180135",
  appId: "1:495401180135:web:f4cb3c8ed581330b8ffb42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);*/