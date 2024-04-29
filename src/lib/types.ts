import { ConnectionProviderProps } from "../../providers/connections-provider"


export type ConnectionTypes = 'Google Drive' | 'Google Sheets' | 'Notion' | 'Slack' | 'Redmine' | 'Magento'

export type Connection = {
    title: ConnectionTypes
    description: string
    image: string
    connectionKey: keyof ConnectionProviderProps
    accessTokenKey?: string
    alwaysTrue?: boolean
}