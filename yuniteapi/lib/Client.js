"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios').default;
const PQueue = require('@esm2cjs/p-queue').default;

class RateLimitManager {
    constructor(suppressLogs) {
        this.queues = {};
        this.permits = {};
        this.suppressLogs = suppressLogs;
    }

    ensureQueue(endpoint) {
        if (!this.queues[endpoint]) {
            this.queues[endpoint] = new PQueue({ concurrency: 1 });
        }
        return this.queues[endpoint];
    }

    async enqueue(endpoint, fn) {
        const queue = this.ensureQueue(endpoint);
        return queue.add(async () => {
            if (this.permits[endpoint] <= 0) {
                if (!this.suppressLogs) {
                    console.log(`[YUNITEAPI]: Automatically queueing request to avoid rate limit. Waiting ${queue.timeout / 1000000} second(s)`);
                }
                await new Promise(resolve => setTimeout(resolve, queue.timeout / 1000));
            }
            this.permits[endpoint]--;
            return fn();
        });
    }

    updateRateLimit(endpoint, resetIn) {
        const queue = this.ensureQueue(endpoint);
        queue.timeout = resetIn;
        this.permits[endpoint] = 0;
        setTimeout(() => {
            this.permits[endpoint] = queue.concurrency;
        }, resetIn);
    }

    updateConcurrency(endpoint, permits) {
        const queue = this.ensureQueue(endpoint);
        queue.concurrency = permits;
        this.permits[endpoint] = permits;
    }
}

class YuniteApi {
    constructor(config, beta, suppressLogs = false) {

        this.baseUrl = beta ? 'https://beta.yunite.xyz/api/v3' : 'https://yunite.xyz/api/v3';
        if (!config) {
            throw new Error("MUST PROVIDE API KEY");
        }
        this.config = config;
        this.axiosInstance = axios.create();
        this.setupInterceptors();
        this.suppressLogs = suppressLogs;
        this.rateLimitManager = new RateLimitManager(suppressLogs);
    }

    setupInterceptors() {
        this.axiosInstance.interceptors.response.use(response => {

            const resetIn = parseInt(response.headers['y-ratelimit-resetin'], 10) * 1000;
            const permits = parseInt(response.headers['y-ratelimit-permits'], 10);
            const endpoint = this.extractEndpointFromURL(response.config.url);
            if (!response.headers['y-ratelimit-bucket']) {
                return response
            }
            this.rateLimitManager.updateRateLimit(endpoint, resetIn);
            if (permits > 0) {
                this.rateLimitManager.updateConcurrency(endpoint, permits);
            }
            return response;
        }, async error => {

            if (error.response && error.response.status === 429) {
                const resetIn = parseInt(error.response.headers['y-ratelimit-resetin'], 10) * 1000;
                const endpoint = this.extractEndpointFromURL(error.config.url);
                if (!this.suppressLogs) {
                    console.log(`[YUNITEAPI]: Ratelimit hit for endpoint: ${endpoint}, automatically retrying after ${resetIn/1000000} second(s)`);
                }
                await new Promise(resolve => setTimeout(resolve, resetIn / 1000));
                this.rateLimitManager.updateRateLimit(endpoint, resetIn);
                const originalRequestConfig = {
                    ...error.config,
                    headers: {
                        ...error.config.headers,
                    }
                };
                return this.axiosInstance(originalRequestConfig);
            }
            return Promise.reject(error);
        });
    }

    extractEndpointFromURL(url) {
        return url.replace(this.baseUrl, '');
    }

    async makeRequest(method, endpoint, options = {}, body = {}) {
        const apiKey = Object.values(this.config).join('');
        options.headers = {
            ...options.headers,
            "Y-Api-Token": apiKey,
            "Accept-Encoding": "gzip,deflate,compress"
        };

        const fullUrl = `${!endpoint.includes(this.baseUrl) ? this.baseUrl : ""}${endpoint}`;
        const fn = () => this.axiosInstance[method](fullUrl, method === "post" ? body : options, options);
        return this.rateLimitManager.enqueue(endpoint, fn);
    }


    /**
     * Returns basic data about your application.
     * Docs: https://yunite.xyz/docs/developers/portal#:~:text=Get%20app%20data-,https%3A//yunite.xyz/api/v3/app
     */
    async getApp(withGuildNames = false) {
        return this.makeRequest('get', `/app?withGuildNames=${withGuildNames}`);
    }

    /**
     * Deauthorizes your application from a guild.
     * Docs: https://yunite.xyz/docs/developers/portal#:~:text=https%3A//yunite.xyz/api/v3/app/deauthorize%3FguildId%3D%7BguildId%7D
     */
    async deauthorize(guildId) {
        if (!guildId) throw new Error("REQUEST MUST CONTAIN GUILD ID")
        return this.makeRequest('post', `/app/deauthorize?guildId=${guildId}`, {}, null);
    }

    /**
     * Returns which Discord user is linked to which Epic user or vice versa.
     * Docs: https://yunite.xyz/docs/developers/registrationdata
     * @param body Body for this endpoint
     */
    async getUserLinks(guildId, body) {
        return this.makeRequest('post', `/guild/${guildId}/registration/links`, {}, body);
    }

    /**
     * Blocks a user from the server\n
     * Docs: https://yunite.xyz/docs/developers/blocks
     * @param body Body for this endpoint
     */
    async blockUser(guildId, body) {
        return this.makeRequest('post', `/guild/${guildId}/registration/blocks`, {}, body);
    }

    /**
     * Gets a list of tournaments for the guild
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=list%20of%20tournaments-,https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments
     */
    async getTournaments(guildId) {
        return this.makeRequest('get', `/guild/${guildId}/tournaments`);
    }

    /**
     * Gets a single tournament from the guild
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=Get%20single%20tournament-,https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D
     */
    async getSingleTournament(guildId, tournamentId) {
        return this.makeRequest('get', `/guild/${guildId}/tournaments/${tournamentId}`);
    }

    /**
     * Gets a single leaderboard of a tournament
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D/leaderboard
     */
    async getLeaderboard(guildId, tournamentId) {
        return this.makeRequest('get', `/guild/${guildId}/tournaments/${tournamentId}/leaderboard`);
    }

    /**
     * Gets a list of matches in a tournament
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=matches%20in%20tournament-,https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D/matches
     */
    async getMatches(guildId, tournamentId) {
        return this.makeRequest('get', `/guild/${guildId}/tournaments/${tournamentId}/matches`);
    }

    /**
     * Gets a leaderboard of a single match in a tournament
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D/matches/%7BsessionId%7D
     */
    async getSingleLeaderboard(guildId, tournamentId, sessionId) {
        return this.makeRequest('get', `/guild/${guildId}/tournaments/${tournamentId}/matches/${sessionId}?includeLive=true`);
    }

    /**
     * Gets a list of teams in a tournament
     * Docs: https://yunite.xyz/docs/developers/tournaments#:~:text=Get%20all%20teams-,https%3A//yunite.xyz/api/v3/guild/%7BguildId%7D/tournaments/%7BtournamentId%7D/teams
     */
    async getTeams(guildId, tournamentId) {
        return this.makeRequest('get', `/guild/${guildId}/tournaments/${tournamentId}/teams`);
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
        return this.makeRequest('get', `/guild/${guildId}/acss/stats${from !== undefined ? `?from=${from}` : ''}${to !== undefined ? `?to=${to}` : ''}`);
    }

    /**
    * Gets websocket token
     * Docs: https://yunite.xyz/docs/developers/authentication
     */
    async getWsToken() {
        return this.makeRequest('get', `/websocket-token`);
    }
}
exports.default = YuniteApi;