import { Text, View } from "react-native"
import { useQuery } from "@tanstack/react-query"

import { api } from "~/trpc/api"

export default function Home() {
  const { data } = useQuery(api.post.all.queryOptions())

  return (
    <View className="">
      {data?.map((post) => (
        <View key={post.id}>
          <Text>{post.title}</Text>
          <Text>{post.content}</Text>
        </View>
      ))}
      <Text>{process.env.EXPO_PUBLIC_API_URL}</Text>
    </View>
  )
}
