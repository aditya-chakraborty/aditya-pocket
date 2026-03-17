"use client";

import { Button, Divider, Flex, Select, Tooltip } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  MenuOutlined,
  LinkOutlined,
  UndoOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import type { EditorToolbarProps, ToolbarItem } from "../types";

const HEADING_OPTIONS = [
  { value: "paragraph", label: "Body" },
  { value: "1", label: "Heading 1" },
  { value: "2", label: "Heading 2" },
  { value: "3", label: "Heading 3" },
];

function ToolbarGroup({ items }: { items: ToolbarItem[] }) {
  return (
    <Flex align="center" gap={1}>
      {items.map((item) => (
        <Tooltip key={item.key} title={item.label} mouseEnterDelay={0.5}>
          <Button
            type={item.isActive ? "primary" : "text"}
            size="small"
            icon={item.icon}
            onClick={item.action}
            disabled={item.disabled}
            style={{ minWidth: 30, height: 30, fontSize: 14 }}
          />
        </Tooltip>
      ))}
    </Flex>
  );
}

function Sep() {
  return (
    <Divider
      type="vertical"
      className="mx-2"
      style={{ height: 18, borderColor: "rgba(0,0,0,0.06)" }}
    />
  );
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;

  const currentHeading = (() => {
    for (const level of [1, 2, 3] as const) {
      if (editor.isActive("heading", { level })) return String(level);
    }
    return "paragraph";
  })();

  const handleHeadingChange = (value: string) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = Number(value) as 1 | 2 | 3;
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  const inlineItems: ToolbarItem[] = [
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
  ];

  const alignItems: ToolbarItem[] = [
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
      key: "align-justify",
      icon: <MenuOutlined />,
      label: "Justify",
      action: () => editor.chain().focus().setTextAlign("justify").run(),
      isActive: editor.isActive({ textAlign: "justify" }),
    },
  ];

  const listItems: ToolbarItem[] = [
    {
      key: "orderedList",
      icon: <OrderedListOutlined />,
      label: "Ordered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    {
      key: "bulletList",
      icon: <UnorderedListOutlined />,
      label: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
  ];

  const linkItems: ToolbarItem[] = [
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

  const historyItems: ToolbarItem[] = [
    {
      key: "undo",
      icon: <UndoOutlined />,
      label: "Undo",
      action: () => editor.chain().focus().undo().run(),
      isActive: false,
      disabled: !editor.can().undo(),
    },
    {
      key: "redo",
      icon: <RedoOutlined />,
      label: "Redo",
      action: () => editor.chain().focus().redo().run(),
      isActive: false,
      disabled: !editor.can().redo(),
    },
  ];

  return (
    <Flex wrap="wrap" align="center" gap={0}>
      <Select
        value={currentHeading}
        onChange={handleHeadingChange}
        options={HEADING_OPTIONS}
        size="small"
        variant="outlined"
        style={{ width: 116 }}
      />

      <Sep />
      <ToolbarGroup items={inlineItems} />
      <Sep />
      <ToolbarGroup items={alignItems} />
      <Sep />
      <ToolbarGroup items={listItems} />
      <Sep />
      <ToolbarGroup items={linkItems} />
      <Sep />
      <ToolbarGroup items={historyItems} />
    </Flex>
  );
}
