export interface UserLinksParams {
    /**
     * Body for request, multiple userIds can be added.
     * Docs: https://yunite.xyz/docs/developers/registrationdata
     */
    "type": 'DISCORD' | 'EPIC';
    "userIds": Array<String>;
}

export interface BlockUserParams {
    /**
     * Body for the request.
     * Docs: https://yunite.xyz/docs/developers/blocks
     */
    "op": 'BLOCK' | 'UNBLOCK';
    "userType": 'DISCORD' | 'EPIC';
    "userId": string;
    "reason"?: string;
    "blockLinkedUser": boolean;
}

export interface TeamPlayersParams {
    "discordId"?: string
    "epicId"?: string
}

export interface AddTeamParams {
    /**
     * Body for the request
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=or%20update%20team-,https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D/teams
     */
    "id"?: string;
    "players"?: Array<TeamPlayersParams>;
    "disqualified"?: boolean;
}