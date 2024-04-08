import { AxiosResponse } from "axios"
import YuniteApi from "./Client"

export interface GetAppResponseData extends AxiosResponse {
    data: {
        app: {
            id: string,
            name: string,
            ownerId: string,
            imageUrl: string | null,
            verified: boolean,
            publicApp: boolean
        },
        authorizedGuilds: Array<{
            guildId: string,
            permissions: Array<'READ_REGISTRATION' | 'READ_CUSTOM_STATE' | 'BLOCK_USERS' | 'READ_TOURNAMENTS' | 'WRITE_TOURNAMENTS' | 'READ_ACSS'>
        }>
    }
}

export interface GetUserLinksResponseData extends AxiosResponse {
    data: {
        users: [] | Array<{
            discord: {
                id?: string | undefined | null,
                name?: string | undefined | null,
                avatar?: string | undefined | null
            },
            epic: {
                epicID?: string | undefined | null,
                epicName?: string | undefined | null
            },
            dateVerified?: string,
            chosenPlatform?: 'PC' | 'PS4' | 'XB1' | 'SWITCH' | 'MOBILE',
            chosenPeripheral?: 'KEYBOARD_MOUSE' | 'CONTROLLER' | 'TOUCH'
        }>,
        notLinked: [] | Array<string>,
        notFound: [] | Array<string>
    }
}

export interface BlocKUserResponseData extends AxiosResponse {
    data: {
        status: 'SUCCESS' | 'ALREADY_BLOCKED' | 'NOT_FOUND',
        message: string
    }
}

export interface Tournament {
    id: string | null | undefined,
    name: string | null | undefined,
    description: string | null | undefined,
    queueSize: number | null | undefined,
    pointSystem: {
        pointsPerKill: number | null | undefined,
        pointsPerPlacement: any,
        killCap: number | null | undefined
    },
    consensusMin: number | null | undefined,
    requireAllMembersOnDiscord: boolean | null | undefined,
    recreateTeamOnTeamChange: boolean | null | undefined,
    allowFillOnlySessions: boolean | null | undefined,
    allowRankDuplicates: boolean | null | undefined,
    embeddedTwitchUser: string | null | undefined,
    eventLinks: [] | Array<any>,
    maxGamesScored: number | null | undefined,
    maxGamesPlayable: number | null | undefined,
    tiebreakers: [] | Array<'WINS' | 'AVERAGE_ELIMINATIONS' | 'AVERAGE_PLACEMENT' | 'AVERAGE_TIME_SURVIVED'>,
    allowTeamMateSwap: boolean | null | undefined,
    startDate: string | null | undefined,
    endDate: string | null | undefined,
    matchTemplate: Array<{
        type: string,
        region: 'NAE' | 'NAW' | 'EU' | 'BR' | 'OCE' | 'ASIA' | 'ME',
        ruleText: string | null | undefined,
        leakDetectionEnabled: boolean | null | undefined,
        useComplexCode: boolean | null | undefined,
        priorityLevels: Array<{
            id: string,
            roles: [] | Array<string>,
            timeout: number | null,
        }>,
        allowedPlatforms: Array<'PC' | 'PS4' | 'XB1' | 'MOBILE' | 'SWITCH'> | [],
        roleToPing: string | null | undefined,
        resultChannelID: string | null | undefined,
        signUpChannelID: string | null | undefined,
        leakDetectionChannelID: string | null | undefined,
        liveTrackingChannelID: string | null | undefined,
        rejectionLogChannelID: string | null | undefined,
        maxPlayers: number | null | undefined
    }>
}

export interface GetTournamentsResponseData extends AxiosResponse {
    data: Array<Tournament>
}
