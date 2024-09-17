import React, { useRef } from 'react'
import dynamic from "next/dynamic";
import Quill from 'quill';

const Editor = dynamic(() => import('./editor'), {ssr:false})

interface ChatInputProps {
  placeholder: string;

}

const ChatInput = ({
  placeholder
}: ChatInputProps) => {
  const editorRef = useRef<Quill | null>(null);

  const handleSubmit = ({
    body, image
  }: {
    body: string;
    image: File | null;
  }) => {
    console.log({body, image});
  };

  return (
    <div className='w-full pb-[5px] pr-[15px]'>
        <Editor
          placeholder={placeholder}
          onSubmit={handleSubmit}
          disabled={false}
          innerRef={editorRef}
        />
    </div>
  )
}

export default ChatInput