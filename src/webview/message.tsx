import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { VSCodeDivider } from '@vscode/webview-ui-toolkit/react'

import CodeBlock from './code-block'

import styles from './index.module.css'
import { LanguageType, ThemeType } from '../types'
import React from 'react'

interface MessageProps {
  message?: string
  sender: string
  completionType: string
  language: LanguageType | undefined
  theme: ThemeType | undefined
}

export const Message = ({
  message,
  sender,
  completionType,
  language,
  theme,
}: MessageProps) => {
  if (!message) {
    return null
  }
  return (
    <div className={styles.message}>
      <b>{sender}</b>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre({ children }) {
            if (React.isValidElement(children)) {
              return (
                <CodeBlock
                  language={language}
                  theme={theme}
                  completionType={completionType}
                  {...children.props}
                />
              )
            }
            return <pre>{children}</pre>
          },
          code({ children }) {
            return <code>{children}</code>
          }
        }}
      >
        {message.trimStart()}
      </Markdown>
      <VSCodeDivider />
    </div>
  )
}
