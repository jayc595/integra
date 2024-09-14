"use client";

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
import { useUpdateStatus } from "@/features/workspaces/members/api/use-update-status";

type Status = {
    color: string;
    label: string;
    description: string;
  };

// Define Status type as the union of allowed values
type StatusType = "online" | "away" | "doNotDisturb" | "offline";  
  
const statusConfig: Record<string, Status> = {
  online: { color: "bg-green-500", label: "Online", description: "You're visible to everyone" },
  away: { color: "bg-yellow-500", label: "Away", description: "You may be slow to respond" },
  doNotDisturb: { color: "bg-red-500", label: "Do Not Disturb", description: "You won't receive any notifications" },
  offline: { color: "bg-gray-500", label: "Offline", description: "You appear offline to others" },
  };

interface StatusIndicatorProps {
  id: Id<"members">;
  memberStatus: string;
}

export default function StatusIndicator({
  id,
  memberStatus,
} : StatusIndicatorProps) {
  const [status, setStatus] = React.useState(memberStatus);
  const { mutate, isPending } = useUpdateStatus();

  const handleStatusChange = (value: StatusType) => {
    mutate({id, status:value}, {
      onSuccess: () => {
        toast.success(`Status updated to: ${statusConfig[value].label}`);
        setStatus(value);
      },
      onError: () => {
        toast.error(`Unable to update status`);
      }
    }
  )
    
  }

  return (
      <div className="w-full">
        <Select onValueChange={handleStatusChange} value={status}>
          <SelectTrigger disabled={isPending} className="w-full focus:ring-0 focus:ring-offset-0 focus:border-input">
            <div className="flex items-center">
                <div
                className={`w-2 h-2 rounded-full ${statusConfig[status].color} mr-2`}
                ></div>
                <span>{statusConfig[status].label}</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(statusConfig).map(([value, { color, label, description }]) => (
              <SelectItem key={value} value={value}>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full ${color} mr-2 flex-shrink-0`}></div>
                  <div>
                    <div className="font-medium">{label}</div>
                    <div className="text-xs text-muted-foreground">{description}</div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
  )
}