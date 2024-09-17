import React, { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Quill, { QuillOptions } from 'quill';
import { MdSend } from 'react-icons/md'
import "quill/dist/quill.snow.css";
import { Button } from '@/components/ui/button';
import { PiTextAa } from 'react-icons/pi'
import { AtSign, ImageIcon, Smile, XIcon } from 'lucide-react';
import { Delta, Op } from 'quill/core';
import EmojiPopup from '../../../_components/emoji-popup';
import MentionPopup from '../../../_components/mention-popup';
import Image from 'next/image';
import { Hint } from '@/components/hint';

type EditorValue = {
    image: File | null;
    body: string;
};

interface EditorProps {
    onCancel?: () => void;
    onSubmit?: ({ image, body }: EditorValue) => void;
    placeholder?: string;
    defaultValue?: Delta | Op[];
    disabled?: boolean;
    innerRef?: MutableRefObject<Quill | null>;
    variant?: "create" | "update";

}

const Editor = ({
    onCancel,
    onSubmit,
    placeholder = "Write something...",
    defaultValue = [],
    disabled = false,
    innerRef,
    variant = "create"
}: EditorProps) => {
    const [text, setText] = useState("");
    const [isToolbarVisible, setIsToolbarVisible] = useState(true);
    const [image, setImage] = useState<File | null>(null);

    const submitRef = useRef(onSubmit);
    const containerRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef(placeholder);
    const quillRef = useRef<Quill | null>(null);
    const defaultValueRef = useRef(defaultValue);
    const disabledRef = useRef(disabled);
    const imageElementRef = useRef<HTMLInputElement>(null);

    useLayoutEffect(() => {
        submitRef.current = onSubmit;
        placeholderRef.current = placeholder;
        defaultValueRef.current = defaultValue;
        disabledRef.current = disabled;
    });

    useEffect(() => {
        if (!containerRef.current) return;

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
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'align': [] }],
                    ['clean']
                ],
                keyboard: {
                    bindings: {
                        enter: {
                            key: "Enter",
                            handler: () => {
                                const text = quill.getText();
                                const addedImage = imageElementRef.current?.files?.[0] || null;
                                const isEmpty = !addedImage && text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

                                if (isEmpty) {
                                    return;
                                }

                                const messageBody = JSON.stringify(quill.getContents());
                                submitRef.current?.({ body: messageBody, image: addedImage });
                                return
                            }
                        },
                        shift_enter: {
                            key: "Enter",
                            shiftKey: true,
                            handler: () => {
                                quill.insertText(quill.getSelection()?.index || 0, "\n")
                            }
                        },
                        at_symbol: {
                            key: "@",
                            shiftKey: true,
                            handler: () => {
                                quill.insertText(quill.getSelection()?.index || 0, "@")
                                onMentionSelect
                            }
                        }
                    }
                }
            }
        };

        const quill = new Quill(editorContainer, options);
        quillRef.current = quill;
        quillRef.current.focus();

        if (innerRef) {
            innerRef.current = quill;
        }

        quill.setContents(defaultValueRef.current);
        setText(quill.getText());

        quill.on(Quill.events.TEXT_CHANGE, () => {
            setText(quill.getText());
        });

        return () => {
            quill.off(Quill.events.TEXT_CHANGE);
            if (container) {
                container.innerHTML = "";
            }
            if (quillRef.current) {
                quillRef.current = null;
            }
            if (innerRef) {
                innerRef.current = null;
            }
        };
    }, [innerRef]);

    const toggleToolbar = () => {
        setIsToolbarVisible((current) => !current);
        const toolbarElement = containerRef.current?.querySelector(".ql-toolbar");

        if (toolbarElement) {
            toolbarElement.classList.toggle("hidden");
        }
    }

    const onEmojiSelect = (emoji: any) => {
        const quill = quillRef.current;

        quill?.insertText(quill?.getSelection()?.index || 0, emoji.native);
    }

    const onMentionSelect = (user: any) => {
        const quill = quillRef.current;
        const mentionText = `@${user.username} `;
        quill?.insertText(quill?.getSelection()?.index || 0, mentionText);
        //TODO: Resolve bug where it's adding the username to the beginning of the text.
    }


    const isEmpty = !image && text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

    return (
        <div className='flex flex-col'>
            <input type='file' accept="image/*" ref={imageElementRef} onChange={(event) => setImage(event.target.files![0])} className='hidden' />
            <div className='flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:borer-slate-300 focus-within:shadow-sm transition bg:white'>
                <div className='h-full ql-custom' ref={containerRef} />
                {!!image && (
                    <div className='p-2'>
                        <div className='relative size-[62px] flex items-center justify-center group/image'>
                            <Hint label='Remove image'>
                                <button onClick={() => { setImage(null); imageElementRef.current!.value = "" }} className='hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-white items-center justify-center'>
                                    <XIcon className='size-3.5'></XIcon>
                                </button>
                            </Hint>
                            <Image src={URL.createObjectURL(image)} alt='Uploaded image' fill className='rounded-xl overflow-hidden border object-cover'></Image>
                        </div>
                    </div>
                )}
                <div className='flex px-2 pb-2 z-[5]'>
                    <Button disabled={false} size="sm" variant="ghost" onClick={toggleToolbar}>
                        <PiTextAa className='size-4' />
                    </Button>
                    <EmojiPopup onEmojiSelect={onEmojiSelect}>
                        <Button disabled={false} size="sm" variant="ghost">
                            <Smile className='size-4' />
                        </Button>
                    </EmojiPopup>
                    <Button disabled={false} size="sm" variant="ghost" onClick={() => imageElementRef.current?.click()}>
                        <ImageIcon className='size-4' />
                    </Button>
                    <MentionPopup onMentionSelect={onMentionSelect}>
                        <Button disabled={false} size="sm" variant="ghost" onClick={() => { }}>
                            <AtSign className='size-4' />
                        </Button>
                    </MentionPopup>
                    <Button disabled={disabled || isEmpty} size="sm" className='ml-auto bg-blue-600 hover:bg-blue-600/80 text-white' onClick={() => {
                        if (submitRef.current) {
                            submitRef.current({
                                body: JSON.stringify(quillRef.current?.getContents()),
                                image
                            });
                        }
                    }}>
                        <MdSend className='size-4' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Editor