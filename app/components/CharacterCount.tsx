"use client";

import { Flex, Progress, Typography } from "antd";
import type { CharacterCountProps } from "../types";
import { MAX_CHARS } from "../types";
import { getCharCountColor } from "../utils/helpers";

const { Text } = Typography;

export default function CharacterCount({ count }: CharacterCountProps) {
  const percent = Math.min((count / MAX_CHARS) * 100, 100);
  const color = getCharCountColor(count);
  const isOver = count >= MAX_CHARS;

  return (
    <Flex align="center" gap={14} className="char-count-bar px-5 py-3" style={{
      marginRight: "10px",
      marginLeft: "10px",
      marginTop: "10px",
      marginBottom: "10px",
    }}>
      <Progress
        percent={percent}
        showInfo={false}
        strokeColor={color}
        railColor="rgba(0,0,0,0.04)"
        size={["100%", 4]}
        className="m-0 flex-1"
      />
      <Text
        className="shrink-0 tabular-nums"
        style={{ color, fontSize: 12, letterSpacing: "-0.01em" }}
        strong={isOver}
      >
        {count.toLocaleString()} / {MAX_CHARS.toLocaleString()}
      </Text>
    </Flex>
  );
}
