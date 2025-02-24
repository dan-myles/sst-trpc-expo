import { useState } from "react"
import { Button, TextInput, View } from "react-native"

import { authClient } from "~/utils/auth-client"

export default function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    const res = await authClient.signIn.email({
      email,
      password,
    })

    console.log("res", res)
  }

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  )
}
