import { Path, Svg } from "react-native-svg"

const DEFAULT_COLOR = "#000000"
const DEFAULT_SIZE = 24

type IconProps = {
  size?: number
  color?: string
}

export const Icons = {
  logo: (props: IconProps) => (
    <Svg
      width={props.size ?? DEFAULT_SIZE}
      height={props.size ?? DEFAULT_SIZE}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M12 21C16.4183 21 20 17.6439 20 13.504C20 9.76257 17.9654 6.83811 16.562 5.44436C16.3017 5.18584 15.8683 5.30006 15.7212 5.63288C14.9742 7.3229 13.4178 9.75607 11.4286 9.75607C10.1975 9.92086 8.31688 8.86844 9.83483 3.64868C9.97151 3.17868 9.46972 2.80113 9.08645 3.11539C6.9046 4.90436 4 8.51143 4 13.504C4 17.6439 7.58172 21 12 21Z"
        fill={props.color ?? DEFAULT_COLOR}
      />
    </Svg>
  ),
}
