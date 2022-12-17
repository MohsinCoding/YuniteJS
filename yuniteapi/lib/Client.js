"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios').default;
class YuniteApi {
    constructor(config) {
        this.baseUrl = 'https://yunite.xyz/api/v3'
        this.config = {
            ...config,
        };
        if (!config) {
            throw new Error("MUST PROVIDE API KEY")
        }
    }

    /**
     * Returns basic data about your application.
     * Docs: https://yunite.xyz/docs/developers/portal#:~:text=Get%20app%20data-,https%3A//yunite.xyz/api/v3/app
     */
    async getApp() {
        const apiKey = (Object.values(this.config).join(''))
        const response = await axios.get(`${this.baseUrl}/app`, {
            headers: {
                "Y-Api-Token": apiKey,
            },
        })
        return response.data
    }

    /**
     * Deauthorizes your application from a guild.
     * Docs: https://yunite.xyz/docs/developers/portal#:~:text=https%3A//yunite.xyz/api/v3/app/deauthorize%3FguildId%3D%7BguildId%7D
     */
    async deauthorize(guildId) {
        const apiKey = (Object.values(this.config).join(''))
        const response = await axios.post(`${this.baseUrl}/app/deauthorize?guildId=${guildId}`, {
            headers: {
                "Y-Api-Token": apiKey,
            },
        })
        return response.data
    }

    /**
     * Returns which Discord user is linked to which Epic user or vice versa.
     * Docs: https://yunite.xyz/docs/developers/registrationdata
     * @param body Body for this endpoint
     */
    async getUserLinks(guildId, body) {
        const apiKey = (Object.values(this.config).join(''))
        const response = await axios.post(`${this.baseUrl}/guild/${guildId}/registration/links`, body, {
            headers: {
                "Y-Api-Token": apiKey,
            },
        })
        return response.data
    }

    /**
     * Blocks a user from the server\n
     * Docs: https://yunite.xyz/docs/developers/blocks
     * @param body Body for this endpoint
     */
    async blockUser(guildId, body) {
        const apiKey = (Object.values(this.config).join(''))
        const response = await axios.post(`${this.baseUrl}/guild/${guildId}/registration/blocks`, body, {
            headers: {
                "Y-Api-Token": apiKey,
            },
        })
        return response.data
    }

    /**
     * Gets a list of tournaments for the guild
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=list%20of%20tournaments-,https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments
     */
    async getTournaments(guildId) {
        const apiKey = (Object.values(this.config).join(''))
        const response = await axios.get(`${this.baseUrl}/guild/${guildId}/tournaments`, {
            headers: {
                "Y-Api-Token": apiKey,
            },
        })
        return response.data
    }

    /**
     * Gets a single tournament from the guild
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=Get%20single%20tournament-,https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D
     */
    async getSingleTournament(guildId, tournamentId) {
        const apiKey = (Object.values(this.config).join(''))
        const response = await axios.get(`${this.baseUrl}/guild/${guildId}/tournaments/${tournamentId}`, {
            headers: {
                "Y-Api-Token": apiKey,
                "Accept-Encoding": "gzip,deflate,compress"
            },
        })
        return response.data
    }

    /**
     * Gets a single leaderboard of a tournament
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D/leaderboard
     */
    async getLeaderboard(guildId, tournamentId) {
        const apiKey = (Object.values(this.config).join(''))
        const response = await axios.get(`${this.baseUrl}/guild/${guildId}/tournaments/${tournamentId}/leaderboard`, {
            headers: {
                "Y-Api-Token": apiKey,
                "Accept-Encoding": "gzip,deflate,compress"
            },
        })
        return response.data
    }

    /**
     * Gets a list of matches in a tournament
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=matches%20in%20tournament-,https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D/matches
     */
    async getMatches(guildId, tournamentId) {
        const apiKey = (Object.values(this.config).join(''))
        const response = await axios.get(`${this.baseUrl}/guild/${guildId}/tournaments/${tournamentId}/matches`, {
            headers: {
                "Y-Api-Token": apiKey,
                "Accept-Encoding": "gzip,deflate,compress"
            },
        })
        return response.data
    }

    /**
     * Gets a leaderboard of a single match in a tournament
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D/matches/%7BsessionId%7D
     */
    async getSingleLeaderboard(guildId, tournamentId, sessionId) {
        const apiKey = (Object.values(this.config).join(''))
        const response = await axios.get(`${this.baseUrl}/guild/${guildId}/tournaments/${tournamentId}/matches/${sessionId}`, {
            headers: {
                "Y-Api-Token": apiKey,
                "Accept-Encoding": "gzip,deflate,compress"
            },
        })
        return response.data
    }

    /**
     * Gets a list of teams in a tournament
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=Get%20all%20teams-,https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D/teams
     */
    async getTeams(guildId, tournamentId) {
        const apiKey = (Object.values(this.config).join(''))
        const response = await axios.get(`${this.baseUrl}/guild/${guildId}/tournaments/${tournamentId}/teams`, {
            headers: {
                "Y-Api-Token": apiKey,
                "Accept-Encoding": "gzip,deflate,compress"
            },
        })
        return response.data
    }

    /**
     * Gets a list of teams in a tournament
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=Get%20all%20teams-,https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D/teams
     */
    async addTeam(guildId, tournamentId, body) {
        const apiKey = (Object.values(this.config).join(''))
        const response = await axios.post(`${this.baseUrl}/guild/${guildId}/tournaments/${tournamentId}/teams`, body, {
            headers: {
                "Y-Api-Token": apiKey,
            },
        })
        return response.data
    }

    /**
    * Adds or updates multiple teams in a tournament (USE AN ARRAY FOR THE BODY)
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=Get%20all%20teams-,https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D/teams
     */
    async addTeams(guildId, tournamentId, body) {
        const apiKey = (Object.values(this.config).join(''))
        const response = await axios.post(`${this.baseUrl}/guild/${guildId}/tournaments/${tournamentId}/teams/bulk`, body, {
            headers: {
                "Y-Api-Token": apiKey,
            },
        })
        return response.data
    }

    /**
    * Gets support system statistics
     * Docs: https://yunite.xyz/docs/developers/acss
     */
    async getTicketStats(guildId, from, to) {
        if (from !== undefined || to !== undefined) {
            if (typeof from !== 'number' || typeof to !== 'number') {
                // throw new Error("Type of from and to values must be of type number (unix timestamp). \nFor more info visit https://yunite.xyz/docs/developers/acss")
            }
        }
        const apiKey = (Object.values(this.config).join(''))
        const response = await axios.get(`${this.baseUrl}/guild/${guildId}/acss/stats${from !== undefined ? `?from=${from}` : ''}${to !== undefined ? `?to=${to}` : ''}`, {
            headers: {
                "Y-Api-Token": apiKey,
                "Accept-Encoding": "gzip,deflate,compress"
            },

        })
        return response.data
    }
}
exports.default = YuniteApi;