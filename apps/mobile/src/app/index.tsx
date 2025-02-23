import { View } from "react-native"
import { Link } from "expo-router"

export default function Home() {
  return (
    <View className="">
      <Link href="/sign-in">TO SIGN IN</Link>
      <Link href="/sign-up">TO SIGN UP</Link>
    </View>
  )
}
