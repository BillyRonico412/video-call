import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { Redirect, Route, Switch } from "wouter"
import { userAtom } from "./main"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Call } from "./pages/Call"

export const App = () => {
	const [user, setUser] = useAtom(userAtom)

	useEffect(() => {
		const auth = getAuth()
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user.uid)
			} else {
				setUser(null)
			}
		})
	}, [setUser])

	if (user === undefined) {
		return <></>
	}

	if (user === null) {
		return (
			<Switch>
				<Route path="/login" component={Login} />
				<Redirect to="/login" />
			</Switch>
		)
	}

	return (
		<Switch>
			<Route path="/" component={Home} />
			<Route path="/call" component={Call} />
			<Redirect to="/" />
		</Switch>
	)
}
