import React from 'react'
import dynamic from "next/dynamic";

const Editor = dynamic(() => import('./editor'), {ssr:false})

type Props = {}

const ChatInput = (props: Props) => {
  return (
    <div className='w-full pb-[5px] pr-[15px]'>
        <Editor/>
    </div>
  )
}

export default ChatInput