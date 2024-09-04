'use client'

import { useEffect, useState } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { ListItemNode, ListNode } from '@lexical/list'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import ClickableLinkPlugin from './LexicalPlugins'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { TRANSFORMERS } from '@lexical/markdown'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, Undo, Redo } from 'lucide-react'


import {
  $getRoot,
  $getSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from 'lexical'

function Placeholder() {
  return <div className="absolute top-[1.125rem] left-[1.125rem] text-gray-400">Enter some text...</div>
}

function WordCount() {
  const [editor] = useLexicalComposerContext()
  const [wordCount, setWordCount] = useState(0)

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const text = $getRoot().getTextContent()
        setWordCount(text.split(/\s+/).filter(word => word !== '').length)
      })
    })
  }, [editor])

  return <div className="text-sm text-gray-500">Words: {wordCount}</div>
}

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext()

  const formatText = (format: 'bold' | 'italic' | 'underline') => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)
  }

  const formatElement = (format: 'left' | 'center' | 'right' | 'justify') => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format)
  }

  const formatHeading = (format: 'h1' | 'h2' | 'h3') => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format)
  }

  return (
    <div className="flex gap-2 mb-4 sticky top-0 z-10 p-2 shadow-sm border-b">
      <Tooltip content="Bold">
        <Button onClick={() => formatText('bold')} variant="outline" size="icon">
          <Bold className="w-4 h-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Italic">
        <Button onClick={() => formatText('italic')} variant="outline" size="icon">
          <Italic className="w-4 h-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Underline">
        <Button onClick={() => formatText('underline')} variant="outline" size="icon">
          <Underline className="w-4 h-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Align Left">
        <Button onClick={() => formatElement('left')} variant="outline" size="icon">
          <AlignLeft className="w-4 h-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Align Center">
        <Button onClick={() => formatElement('center')} variant="outline" size="icon">
          <AlignCenter className="w-4 h-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Align Right">
        <Button onClick={() => formatElement('right')} variant="outline" size="icon">
          <AlignRight className="w-4 h-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Justify">
        <Button onClick={() => formatElement('justify')} variant="outline" size="icon">
          <AlignJustify className="w-4 h-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Undo">
        <Button onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} variant="outline" size="icon">
          <Undo className="w-4 h-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Redo">
        <Button onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)} variant="outline" size="icon">
          <Redo className="w-4 h-4" />
        </Button>
      </Tooltip>
      <Tooltip content="Heading 1">
        <Button onClick={() => formatHeading('h1')} variant="outline" size="icon">
          H1
        </Button>
      </Tooltip>
      <Tooltip content="Heading 2">
        <Button onClick={() => formatHeading('h2')} variant="outline" size="icon">
          H2
        </Button>
      </Tooltip>
      <Tooltip content="Heading 3">
        <Button onClick={() => formatHeading('h3')} variant="outline" size="icon">
          H3
        </Button>
      </Tooltip>
    </div>
  )
}

const theme = {
  ltr: 'ltr',
  rtl: 'rtl',
  placeholder: 'editor-placeholder',
  paragraph: 'mb-1',
  quote: 'border-l-4 border-gray-300 pl-4 mb-1',
  heading: {
    h1: 'text-3xl font-bold mb-2',
    h2: 'text-2xl font-bold mb-2',
    h3: 'text-xl font-bold mb-2',
    h4: 'text-lg font-bold mb-2',
    h5: 'text-base font-bold mb-2',
  },
  list: {
    nested: {
      listitem: 'list-none',
    },
    ol: 'list-decimal pl-4 mb-1',
    ul: 'list-disc pl-4 mb-1',
    listitem: 'ml-4',
  },
  image: 'inline-block',
  link: 'text-blue-500 underline',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: 'underline line-through',
  },
  code: 'bg-gray-200 p-1 rounded',
}

const editorConfig = {
  theme,
  onError(error: Error) {
    console.error(error)
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
}

export default function LexicalEditor() {
  return (
    <TooltipProvider>
    <LexicalComposer initialConfig={editorConfig}>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Scripting</CardTitle>
        </CardHeader>
        <CardContent>
          <ToolbarPlugin />
          <div className="relative min-h-[400px] border rounded-md p-4 shadow-sm">
            <RichTextPlugin
              contentEditable={<ContentEditable className="outline-none min-h-[380px]" />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <ListPlugin />
            <LinkPlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <WordCount />
          <Button variant="outline">Clear Formatting</Button>
        </CardFooter>
      </Card>
    </LexicalComposer>
    </TooltipProvider>
  )
}