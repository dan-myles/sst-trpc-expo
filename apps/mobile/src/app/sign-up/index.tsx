import { useState } from "react"
import { Button, TextInput, View } from "react-native"

import { authClient } from "~/utils/auth-client"

export default function App() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    console.log("handle login called")

    const res = await authClient.signUp
      .email({
        email,
        password,
        name,
      })
      .catch(console.log)

    console.log("res", res)
  }

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  )
}
