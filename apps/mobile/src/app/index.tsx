import React from "react"
import { Pressable, Text, View } from "react-native"

import type { RouterOutputs } from "~/utils/api"

function PostCard(props: { post: RouterOutputs["post"]["all"][number]; onDelete: () => void }) {
  return (
    <View className="flex flex-row rounded-lg bg-muted p-4">
      <View className="flex-grow">
        <Pressable className="">
          <Text className="text-xl font-semibold text-primary">Hi!</Text>
        </Pressable>
      </View>
      <Pressable onPress={props.onDelete}>
        <Text className="font-bold uppercase text-primary">Delete</Text>
      </Pressable>
    </View>
  )
}
