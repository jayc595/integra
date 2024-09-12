import React, { useEffect, useRef } from 'react'
import Quill, { QuillOptions } from 'quill';
import { MdSend } from 'react-icons/md'
import "quill/dist/quill.snow.css";
import { Button } from '@/components/ui/button';
import { PiTextAa } from 'react-icons/pi'
import { AtSign, ImageIcon, Smile } from 'lucide-react';

const Editor = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!containerRef.current) return;

        const container = containerRef.current;
        const editorContainer = container.appendChild(
            container.ownerDocument.createElement("div")
        );

        const options: QuillOptions = {
            theme: "snow",
        };

        new Quill(editorContainer, options);

        return () => {
            if(container){
                container.innerHTML = "";
            }
        };
    }, []);

  return (
    <div className='flex flex-col'>
        <div className='flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:borer-slate-300 focus-within:shadow-sm transition bg:white'>
            <div className='h-full ql-custom' ref={containerRef}/>
            <div className='flex px-2 pb-2 z-[5]'>
                <Button disabled={false} size="sm" variant="ghost" onClick={() => {}}>
                    <PiTextAa className='size-4'/>
                </Button>
                <Button disabled={false} size="sm" variant="ghost" onClick={() => {}}>
                    <Smile className='size-4'/>
                </Button>
                <Button disabled={false} size="sm" variant="ghost" onClick={() => {}}>
                    <ImageIcon className='size-4'/>
                </Button>
                <Button disabled={false} size="sm" variant="ghost" onClick={() => {}}>
                    <AtSign className='size-4'/>
                </Button>
                <Button disabled={false} size="sm" className='ml-auto bg-blue-600 hover:bg-blue-600/80 text-white' onClick={() => {}}>
                    <MdSend className='size-4'/>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Editor