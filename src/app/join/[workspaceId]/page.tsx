"use client";
import { useWorkspaceId } from '@/app/hooks/use-workspace-id';
import { Loading } from '@/components/auth/loading';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useGetInfoWorkspace } from '@/features/workspaces/api/use-get-info-workspace';
import { useJoin } from '@/features/workspaces/api/use-join';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useMemo, useEffect } from 'react'
import { toast } from 'sonner';

type Props = {}

const JoinPage = (props: Props) => {
    const workspaceId = useWorkspaceId();
    const router = useRouter();
    const { mutate, isPending } = useJoin();
    const { data, isLoading } = useGetInfoWorkspace({ id: workspaceId });

    const isMember = useMemo(() => data?.isMember, [data?.isMember]);

    useEffect(() => {
        if(isMember){
            toast.success("You are already a part of this workspace.")
            router.push(`/workspace/${workspaceId}`);
        }
    }, [isMember, router, workspaceId]);

    const handleComplete = (value: string) => {
        mutate({ workspaceId, joinCode: value },{
            onSuccess: (id) => {
                toast.success("Workspace successfully joined");
                router.replace(`/workspace/${id}`);
            },
            onError: () => {
                toast.error("Failed to join Workspace");
            }
        });
    }

    if(isLoading){
        return (
            <Loading/>
        )
    }
  return (
    <div className='h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md'>
        <Image src="/logo.svg" width={120} height={120} alt='Logo'/>
        <div className='flex flex-col gap-y-4 items-center justify-center max-w-md'>
            <div className='flex flex-col gap-y-2 items-center justify-center'>
                <h1 className='text-2xl font-bold'>
                    Join {data?.name} Workspace
                </h1>
                <p className='text-md text-muted-foreground'>
                    Enter the workspace code to join
                </p>
            </div>
            <InputOTP disabled={isPending} onComplete={handleComplete} className='w-[800px]' maxLength={6} autoFocus pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                <InputOTPGroup className='uppercase text-lg'>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
        </div>
    </div>
  )
}

export default JoinPage