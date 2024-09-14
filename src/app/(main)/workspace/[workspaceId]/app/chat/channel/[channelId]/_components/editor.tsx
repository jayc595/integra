import React, { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Quill, { QuillOptions } from 'quill';
import { MdSend } from 'react-icons/md'
import "quill/dist/quill.snow.css";
import { Button } from '@/components/ui/button';
import { PiTextAa } from 'react-icons/pi'
import { AtSign, ImageIcon, Smile } from 'lucide-react';
import { Delta, Op } from 'quill/core';
import EmojiPopup from '../../../_components/emoji-popup';

type EditorValue = {
    image: File | null;
    body: string;
};

interface EditorProps {
    onCancel?: () => void;
    onSubmit?: ({image, body}: EditorValue) => void;
    placeholder?: string;
    defaultValue?: Delta | Op[];
    disabled?: boolean;
    innerRef?: MutableRefObject<Quill | null>;
    variant?: "create" | "update";

}

const Editor = ({
    onCancel,
    onSubmit,
    placeholder = "Write somrthing...",
    defaultValue = [],
    disabled = false,
    innerRef,
    variant = "create"
}: EditorProps) => {
    const [ text, setText ] = useState("");
    const [ isToolbarVisible, setIsToolbarVisible ] = useState(false);

    const submitRef = useRef(onSubmit);
    const containerRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef(placeholder);
    const quillRef = useRef<Quill | null>(null);
    const defaultValueRef = useRef(defaultValue);
    const disabledRef = useRef(disabled);

    useLayoutEffect(() => {
        submitRef.current = onSubmit;
        placeholderRef.current = placeholder;
        defaultValueRef.current = defaultValue;
        disabledRef.current = disabled;
    });

    useEffect(() => {
        if(!containerRef.current) return;

        const container = containerRef.current;
        const editorContainer = container.appendChild(
            container.ownerDocument.createElement("div")
        );

        const options: QuillOptions = {
            theme: "snow",
            placeholder: placeholderRef.current,
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    ['link'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
                    [{ 'script': 'sub'}, { 'script': 'super' }],
                    [{ 'indent': '-1'}, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'align': [] }],
                    ['clean']
                ],
                keyboard: {
                    bindings: {
                        enter: {
                            key: "Enter",
                            handler: () => {
                                //TODO: Submit form.
                                return;
                            }
                        },
                        shift_enter: {
                            key: "Enter",
                            shiftKey: true,
                            handler: () => {
                                quill.insertText(quill.getSelection()?.index || 0, "\n")
                            }
                        }
                    }
                }
            }
        };

        const quill = new Quill(editorContainer, options);
        quillRef.current = quill;
        quillRef.current.focus();

        if(innerRef){
            innerRef.current = quill;
        }

        quill.setContents(defaultValueRef.current);
        setText(quill.getText());

        quill.on(Quill.events.TEXT_CHANGE, () => {
            setText(quill.getText());
        });

        return () => {
            quill.off(Quill.events.TEXT_CHANGE);
            if(container){
                container.innerHTML = "";
            }
            if(quillRef.current){
                quillRef.current = null;
            }
            if(innerRef){
                innerRef.current = null;
            }
        };
    }, [innerRef]);

    const toggleToolbar = () => {
        setIsToolbarVisible((current) => !current);
        const toolbarElement = containerRef.current?.querySelector(".ql-toolbar");
        
        if(toolbarElement){
            toolbarElement.classList.toggle("hidden");
        }
    }

    const onEmojiSelect = (emoji: any) => {
        const quill = quillRef.current;

        quill?.insertText(quill?.getSelection()?.index || 0, emoji.native);
    }

    const isEmpty = text.replace(/<(.|\n)*?>/g,"").trim().length === 0;

  return (
    <div className='flex flex-col'>
        <div className='flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:borer-slate-300 focus-within:shadow-sm transition bg:white'>
            <div className='h-full ql-custom' ref={containerRef}/>
            <div className='flex px-2 pb-2 z-[5]'>
                <Button disabled={false} size="sm" variant="ghost" onClick={toggleToolbar}>
                    <PiTextAa className='size-4'/>
                </Button>
                <EmojiPopup onEmojiSelect={onEmojiSelect}>
                    <Button disabled={false} size="sm" variant="ghost">
                        <Smile className='size-4'/>
                    </Button>
                </EmojiPopup>
                <Button disabled={false} size="sm" variant="ghost" onClick={() => {}}>
                    <ImageIcon className='size-4'/>
                </Button>
                <Button disabled={false} size="sm" variant="ghost" onClick={() => {}}>
                    <AtSign className='size-4'/>
                </Button>
                <Button disabled={disabled || isEmpty} size="sm" className='ml-auto bg-blue-600 hover:bg-blue-600/80 text-white' onClick={() => {}}>
                    <MdSend className='size-4'/>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Editor