import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { SignInFlow } from '../types'
import { useAuthActions } from "@convex-dev/auth/react"

interface SignInCardProps {
    setState: (state: SignInFlow) => void;
};

const SignInCard = ({ setState } : SignInCardProps) => {
    const { signIn } = useAuthActions();

    const handleAuthProviderSignIn = (value: "github" | "google") => {
        signIn(value);
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Card className='w-full h-full p-8'>
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                    Login to Continue
                </CardTitle>
                <CardDescription>
                    Log in using your email or a connected service.
                </CardDescription>
            </CardHeader>
            <CardContent className='space-y-5 px-0 pb-0'>
                <form className='space-y-2.5'>
                    <Input disabled={false} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' type="email" required />
                    <Input disabled={false} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' type="password" required />
                    <Button type='submit' className='w-full' size="lg">Continue</Button>
                </form>
                <Separator />
                <div className='flex flex-col gap-y-2.5'>
                    <Button disabled={false} onClick={() => { }} size="lg" variant="outline" className='w-full relative'>
                        <FcGoogle className='size-5 absolute top-2.5 left-2.5'/>
                        Continue with Google
                    </Button>
                    <Button disabled={false} onClick={() => handleAuthProviderSignIn("github")} size="lg" variant="outline" className='w-full relative'>
                        <FaGithub className='size-5 absolute top-2.5 left-2.5'/>
                        Continue with GitHub
                    </Button>
                </div>
                <p className='text-xs text-muted-foreground text-end'>
                    Don't have an account? <span onClick={() => setState("signUp")} className='text-sky-700 hover:underline cursor-pointer'>Sign up</span>
                </p>
            </CardContent>
        </Card>
    )
}

export default SignInCard