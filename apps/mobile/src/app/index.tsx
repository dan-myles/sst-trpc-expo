import { Text, View } from "react-native"
import { useQuery } from "@tanstack/react-query"

import { api } from "~/trpc/api"

export default function Home() {
  const { data } = useQuery(api.post.all.queryOptions())

  return (
    <View className="bg-blue-500">
      <Text>{data}</Text>
    </View>
  )
}
