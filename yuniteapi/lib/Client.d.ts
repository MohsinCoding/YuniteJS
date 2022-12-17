import { UserLinksParams, BlockUserParams, AddTeamParams } from './Parameters';

declare class YuniteApi {
    constructor(config: String)
    /**
     * Returns basic data about your application.
     * Docs: https://yunite.xyz/docs/developers/portal#:~:text=Get%20app%20data-,https%3A//yunite.xyz/api/v3/app
     */
    getApp(): Promise<undefined>;

    /**
     * Deauthorizes your application from a guild.
     * Docs: https://yunite.xyz/docs/developers/portal#:~:text=https%3A//yunite.xyz/api/v3/app/deauthorize%3FguildId%3D%7BguildId%7D
     */
    deauthorize(guildId: string): Promise<undefined>;

    /**
     * Returns which Discord user is linked to which Epic user or vice versa.
     * Docs: https://yunite.xyz/docs/developers/registrationdata
     * @param body Body for this endpoint
     */
    getUserLinks(guildId: string, body: UserLinksParams): Promise<undefined>;

    /**
     * Returns which Discord user is linked to which Epic user or vice versa.\n
     * Docs: https://yunite.xyz/docs/developers/blocks
     * @param body Body for this endpoint
     */
    blockUser(guildId: string, body: BlockUserParams): Promise<undefined>;

    /**
     * Returns which Discord user is linked to which Epic user or vice versa.\n
     * Docs: https://yunite.xyz/docs/developers/blocks
     */
    getTournaments(guildId: string): Promise<undefined>;

    /**
     * Gets a single tournament from the guild
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=Get%20single%20tournament-,https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D,-Request
     */
    getSingleTournament(guildId: string, tournamentId: string): Promise<undefined>;

    /**
     * Gets a single leaderboard of a tournament
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D/leaderboard
     */
    getLeaderboard(guildId: string, tournamentId: string): Promise<undefined>;

    /**
     * Gets a list of matches in a tournament
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=matches%20in%20tournament-,https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D/matches
     */
    getMatches(guildId: string, tournamentId: string): Promise<undefined>;

    /**
     * Gets a leaderboard of a single match in a tournament
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D/matches/%7BsessionId%7D
     */
    getSingleLeaderboard(guildId: string, tournamentId: string, sessionId: string): Promise<undefined>;

    /**
     * Gets a list of teams in a tournament
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=Get%20all%20teams-,https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D/teams
     */
    getTeams(guildId: string, tournamentId: string): Promise<undefined>;

    /**
    * Adds or updates a team in a tournament
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=or%20update%20team-,https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D/teams
    */
    addTeam(guildId: string, tournamentId: string, body: AddTeamParams): Promise<undefined>;

    /**
    * Adds or updates multiple teams in a tournament (USE AN ARRAY FOR THE BODY)
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=or%20update%20team-,https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D/teams
    */
    addTeams(guildId: string, tournamentId: string, body: AddTeamParams): Promise<undefined>;

    /**
    * Gets support system statistics
    * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=or%20update%20team-,https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D/teams
        */
    getTicketStats(guildId: string, from: number, to: number): Promise<undefined>;

}
export default YuniteApi;