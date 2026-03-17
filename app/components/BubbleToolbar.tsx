"use client";

import { BubbleMenu } from "@tiptap/react/menus";
import { Button, Flex } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import type { BubbleToolbarProps, ToolbarItem } from "../types";

export default function BubbleToolbar({ editor }: BubbleToolbarProps) {
  if (!editor) return null;

  const items: ToolbarItem[] = [
    {
      key: "bold",
      icon: <BoldOutlined />,
      label: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      key: "italic",
      icon: <ItalicOutlined />,
      label: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      key: "underline",
      icon: <UnderlineOutlined />,
      label: "Underline",
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
    },
    {
      key: "align-left",
      icon: <AlignLeftOutlined />,
      label: "Align Left",
      action: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: editor.isActive({ textAlign: "left" }),
    },
    {
      key: "align-center",
      icon: <AlignCenterOutlined />,
      label: "Align Center",
      action: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: editor.isActive({ textAlign: "center" }),
    },
    {
      key: "align-right",
      icon: <AlignRightOutlined />,
      label: "Align Right",
      action: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: editor.isActive({ textAlign: "right" }),
    },
    {
      key: "link",
      icon: <LinkOutlined />,
      label: "Link",
      action: () => {
        if (editor.isActive("link")) {
          editor.chain().focus().unsetLink().run();
          return;
        }
        const url = window.prompt("Enter URL");
        if (url) {
          editor.chain().focus().setLink({ href: url }).run();
        }
      },
      isActive: editor.isActive("link"),
    },
  ];

  return (
    <BubbleMenu
      editor={editor}
      className="bubble-toolbar"
    >
      <Flex
        align="center"
        gap={1}
        className="rounded-[10px] bg-white px-1.5 py-1"
        style={{
          boxShadow:
            "0 4px 16px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)",
        }}
      >
        {items.map((item) => (
          <Button
            key={item.key}
            type={item.isActive ? "primary" : "text"}
            size="small"
            icon={item.icon}
            onClick={item.action}
            style={{ minWidth: 30, height: 30, fontSize: 14 }}
          />
        ))}
      </Flex>
    </BubbleMenu>
  );
}
