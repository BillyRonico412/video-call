import { useEffect, useRef } from "react"
import { useAsync } from "react-use"
import { useToast } from "../components/ui/use-toast"
import { peerConnection } from "../main"
import to from "await-to-js"

export const Call = () => {
	const { toast } = useToast()

	const localVideoRef = useRef<HTMLVideoElement>(null)
	const remoteVideoRef = useRef<HTMLVideoElement>(null)

	const state = useAsync(async () => {
		if (localVideoRef.current === null || remoteVideoRef.current === null) {
			console.error("Video element not found")
			toast({
				title: "Error",
				description: "Video element not found",
				duration: 3000,
			})
			return
		}
		const [errLocalStream, localStream] = await to(
			navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true,
			}),
		)
		if (errLocalStream) {
			console.error(errLocalStream)
			toast({
				title: "Error",
				description: "Failed to get local stream",
				duration: 3000,
			})
			return
		}
		for (const track of localStream.getTracks()) {
			peerConnection.addTrack(track, localStream)
		}
		const remoteStream = new MediaStream()
		peerConnection.ontrack = (event) => {
			for (const track of event.streams[0].getTracks()) {
				remoteStream.addTrack(track)
			}
		}
		localVideoRef.current.srcObject = localStream
		remoteVideoRef.current.srcObject = remoteStream

		const [errOffer, offerDescription] = await to(peerConnection.createOffer())
		if (errOffer) {
			console.error(errOffer)
			toast({
				title: "Error",
				description: "Failed to create offer",
				duration: 3000,
			})
			return
		}

		const [errSetLocalDescription] = await to(
			peerConnection.setLocalDescription(offerDescription),
		)

		if (errSetLocalDescription) {
			toast({
				title: "Error",
				description: "Failed to set local description",
				duration: 3000,
			})
			return
		}

		console.log("Offer", JSON.stringify(offerDescription))
	}, [])

	useEffect(
		() => () => {
			peerConnection.ontrack = null
		},
		[],
	)

	return (
		<div>
			<div>
				<video
					ref={localVideoRef}
					autoPlay={true}
					playsInline={true}
					muted={true}
				/>
			</div>
			<div>
				<video
					ref={remoteVideoRef}
					autoPlay={true}
					playsInline={true}
					muted={true}
				/>
			</div>
		</div>
	)
}
