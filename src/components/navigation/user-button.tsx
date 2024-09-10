"use client";

import { CircleUserRound } from 'lucide-react'
import React from 'react'
import { Hint } from '../hint'
import { useAuthActions } from '@convex-dev/auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { StringToBoolean } from 'class-variance-authority/types';

interface UserProps {
  name?: string;
  image?: string;
}

const UserButton = ({
  name = "Member",
  image
}: UserProps) => {
    const { signOut } = useAuthActions();
    const avatarFallback = name.charAt(0).toUpperCase();
  return (
    <Hint label='Logout'>
        <Avatar onClick={() => signOut()}>
            <AvatarImage src={image} />
            <AvatarFallback className='bg-blue-950 text-white'>{avatarFallback}</AvatarFallback>
        </Avatar>
    </Hint>
    
  )
}

export default UserButton