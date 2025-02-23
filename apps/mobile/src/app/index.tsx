import { Pressable, Text, View } from "react-native"
import { Link } from "expo-router"
import { useQuery } from "@tanstack/react-query"

import { api } from "~/trpc/api"

export default function Home() {
  const { data, error } = useQuery(api.post.all.queryOptions())

  return (
    <View className="">
      <Link href="/sign-in">TO SIGN IN</Link>
      <Link href="/sign-up">TO SIGN UP</Link>

      {data?.map((post) => (
        <Pressable key={post.id} onPress={() => console.log(post)}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="ml-2 flex-row items-center">
                <View className="text-sm font-medium text-gray-900">
                  <Text>{post.title}</Text>
                  <Text className="text-xs text-gray-500">{post.content}</Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  )
}
