import React, { useRef, useState } from 'react'
import dynamic from "next/dynamic";
import Quill from 'quill';
import { useCreateMessage } from '@/features/workspaces/messages/api/use-create-message';
import { useWorkspaceId } from '@/app/hooks/use-workspace-id';
import { useChannelId } from '@/app/hooks/use-channel-id';
import { toast } from 'sonner';
import { useGenerateUploadUrl } from '@/features/workspaces/upload/use-generate-upload-url';
import { Id } from '../../../../../../../../../../convex/_generated/dataModel';

const Editor = dynamic(() => import('./editor'), { ssr: false })

interface ChatInputProps {
  placeholder: string;

}

type CreateMessageValues = {
  channelId: Id<"channels">;
  workspaceId: Id<"workspaces">;
  body: string;
  image?: Id<"_storage"> | undefined;
}

const ChatInput = ({
  placeholder
}: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const editorRef = useRef<Quill | null>(null);

  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const { mutate: generateUploadUrl } = useGenerateUploadUrl();
  const { mutate: createMessage } = useCreateMessage();

  const handleSubmit = async ({
    body, image
  }: {
    body: string;
    image: File | null;
  }) => {
    try {
      setIsPending(true);
      editorRef?.current?.enable(false);
      await createMessage(
        {
          workspaceId,
          channelId,
          body
        }, { throwError: true });

      //Change the editor key to force chat editor to re-render. 
      setEditorKey((prevKey) => prevKey + 1);
    } catch (error) {
      toast.error("An error occurred whilst trying to send message");
    } finally {
      setIsPending(false);
      editorRef?.current?.enable(true);

      const values: CreateMessageValues = {
        channelId,
        workspaceId,
        body,
        image: undefined
    }

    if(image){
      const url = await generateUploadUrl({}, { throwError: true });

      if(!url){
        throw new Error("Url not found");
      }

      const result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": image.type},
        body: image,
      });

      if(!result.ok){
        throw new Error("Failed to upload image");
      }

      const { storageId } = await result.json();
      values.image = storageId;
    }
    }
  };

  return (
    <div className='w-full pb-[5px] pr-[15px]'>
      <Editor
        key={editorKey}
        placeholder={placeholder}
        onSubmit={handleSubmit}
        disabled={false}
        innerRef={editorRef}
      />
    </div>
  )
}

export default ChatInput