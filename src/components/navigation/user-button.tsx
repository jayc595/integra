"use client";

import { CircleUserRound } from 'lucide-react'
import React from 'react'
import { Hint } from '../hint'
import { useAuthActions } from '@convex-dev/auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Props = {}

const UserButton = (props: Props) => {
    const { signOut } = useAuthActions();

  return (
    <Hint label='Logout'>
        <Avatar onClick={() => signOut()}>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    </Hint>
    
  )
}

export default UserButton