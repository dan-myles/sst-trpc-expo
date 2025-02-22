import { Text, View } from "react-native"
import { verifyInstallation } from "nativewind"

export default function Home() {
  verifyInstallation()

  return (
    <View className="bg-red-500">
      <Text>Hello!</Text>
    </View>
  )
}
