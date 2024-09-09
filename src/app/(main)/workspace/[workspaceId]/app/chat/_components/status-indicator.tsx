import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner";

type Status = {
    color: string;
    label: string;
    description: string;
  };
  
  const statusConfig: Record<string, Status> = {
    online: { color: "bg-green-500", label: "Online", description: "You're visible to everyone" },
    away: { color: "bg-yellow-500", label: "Away", description: "You may be slow to respond" },
    doNotDisturb: { color: "bg-red-500", label: "Do Not Disturb", description: "You won't receive any notifications" },
    offline: { color: "bg-gray-500", label: "Offline", description: "You appear offline to others" },
  };

export default function Component() {
  const [status, setStatus] = React.useState("online");

  const handleStatusChange = (value: string) => {
    setStatus(value);
    //TODO: Update status in DB.
    toast.success(`Status updated to: ${value}`)
  }

  return (
      <div className="w-full">
        <Select onValueChange={handleStatusChange} value={status}>
          <SelectTrigger className="w-full focus:ring-0 focus:ring-offset-0 focus:border-input">
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