import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App.tsx"
import "./index.css"
import { initializeApp } from "firebase/app"
import { atom } from "jotai"
import { Toaster } from "./components/ui/toaster.tsx"

export const userAtom = atom<string | undefined | null>(undefined)

const servers: RTCConfiguration = {
	iceServers: [
		{
			urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
		},
	],
	iceCandidatePoolSize: 10,
}

export const peerConnection = new RTCPeerConnection(servers)

const firebaseConfig = {
	apiKey: "AIzaSyDDsgVRkI7Fa-3rrk36BTOCNd8Da7Xj_0s",
	authDomain: "chat-app-840b1.firebaseapp.com",
	databaseURL:
		"https://chat-app-840b1-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "chat-app-840b1",
	storageBucket: "chat-app-840b1.appspot.com",
	messagingSenderId: "202492354298",
	appId: "1:202492354298:web:90fb024afaf5c833c7b343",
	measurementId: "G-E8VVRWSPL5",
}

initializeApp(firebaseConfig)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
		<Toaster />
	</React.StrictMode>,
)
