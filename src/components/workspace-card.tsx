import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { EllipsisVertical, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Hint } from './hint';

interface WorkspaceProps {
    name: string;
    isDefault: boolean;
}

const WorkspaceCard = ({ name, isDefault }: WorkspaceProps) => {
    return (
        <Card className="flex items-center justify-between mb-2 p-4 min-w-0">
            {/* Left Section: Workspace Info */}
            <div className="flex flex-col flex-grow min-w-0">
                <CardHeader>
                    <CardTitle className="text-md truncate" title={name}>
                        {name}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                        {/* TODO: Query for getting the number of members in a workspace */}
                        1 member(s)
                    </CardDescription>
                </CardHeader>
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-4 flex-shrink-0">
                <Hint label="Mark as default">
                    <Star
                        className={cn(
                            'h-6 w-6 cursor-pointer',
                            isDefault ? 'fill-blue-600 text-blue-600' : 'text-gray-400'
                        )}
                    />
                </Hint>
                {/* TODO: Add roles later and settings here for removing workspace etc. */}
                {/* <EllipsisVertical className="h-6 w-6 text-gray-400 cursor-pointer" /> */}
            </div>
        </Card>
    );
};

export default WorkspaceCard;