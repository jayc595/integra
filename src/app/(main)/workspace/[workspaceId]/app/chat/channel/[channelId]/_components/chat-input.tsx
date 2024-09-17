import React, { useRef } from 'react'
import dynamic from "next/dynamic";
import Quill from 'quill';
import { useCreateMessage } from '@/features/workspaces/messages/api/use-create-message';
import { useWorkspaceId } from '@/app/hooks/use-workspace-id';
import { useChannelId } from '@/app/hooks/use-channel-id';

const Editor = dynamic(() => import('./editor'), { ssr: false })

interface ChatInputProps {
  placeholder: string;

}

const ChatInput = ({
  placeholder
}: ChatInputProps) => {
  const editorRef = useRef<Quill | null>(null);

  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const { mutate: createMessage } = useCreateMessage();

  const handleSubmit = ({
    body, image
  }: {
    body: string;
    image: File | null;
  }) => {
    console.log({ body, image });
    createMessage(
      {
        workspaceId,
        channelId,
        body
      });
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