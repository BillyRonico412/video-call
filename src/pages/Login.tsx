import to from "await-to-js"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { useCallback } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { Button } from "../components/ui/button"
import { useToast } from "../components/ui/use-toast"

export const Login = () => {
	const { toast } = useToast()
	const onClickConnectWithGoogle = useCallback(async () => {
		const auth = getAuth()
		const [errSignIn, signIn] = await to(
			signInWithPopup(auth, new GoogleAuthProvider()),
		)
		if (errSignIn) {
			console.error(errSignIn)
			toast({
				title: "Error",
				description: "Failed to sign in with Google",
				duration: 3000,
			})
			return
		}
		toast({
			title: "Success",
			description: "Signed in with Google",
			duration: 3000,
		})
		return signIn
	}, [toast])
	return (
		<div className="flex w-screen h-screen">
			<div className="flex flex-col gap-y-8 items-center container mx-auto my-auto">
				<h1 className="text-4xl font-bold text-center">Video Call</h1>
				<Button onClick={onClickConnectWithGoogle}>
					<FaSignInAlt className="mr-2" />
					Connect with Google
				</Button>
			</div>
		</div>
	)
}
