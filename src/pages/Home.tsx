import to from "await-to-js"
import { getAuth, signOut } from "firebase/auth"
import { useCallback } from "react"
import { FaPhone, FaPlus, FaSignOutAlt } from "react-icons/fa"
import { Button } from "../components/ui/button"
import { useToast } from "../components/ui/use-toast"
import { useLocation } from "wouter"

export const Home = () => {
	const { toast } = useToast()
	const [, setLocation] = useLocation()
	const onClickLogOut = useCallback(async () => {
		const auth = getAuth()
		const [errSignOut] = await to(signOut(auth))
		if (errSignOut) {
			console.error(errSignOut)
			toast({
				title: "Error",
				description: "Failed to sign out",
				duration: 3000,
			})
			return
		}
		toast({
			title: "Success",
			description: "Signed out",
			duration: 3000,
		})
	}, [toast])
	return (
		<div className="flex w-screen h-screen">
			<div className="flex flex-col items-center gap-y-8 container mx-auto my-auto">
				<Button onClick={() => setLocation("/call")}>
					<FaPlus className="mr-2" />
					Create Call
				</Button>
				<Button>
					<FaPhone className="mr-2" />
					Join Call
				</Button>
				<Button onClick={onClickLogOut}>
					<FaSignOutAlt className="mr-2" />
					Log out
				</Button>
			</div>
		</div>
	)
}
