"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KarmaKit_1 = require("./KarmaKit");
const api_1 = require("./api");
async function main() {
    try {
        // Initialize KarmaKit
        const karmaKit = new KarmaKit_1.KarmaKit({
            initialScore: 0,
            maxScore: 1000,
            minScore: -100,
            actionTypes: {
                upvote: { baseScore: 1 },
                downvote: { baseScore: -1 },
                report: { baseScore: -2 },
                achievement: { baseScore: 5 }
            },
            enableRateLimiting: true,
            rateLimit: {
                maxActions: 100,
                timeWindow: 3600000 // 1 hour
            },
            trustLevels: [
                { name: 'Newcomer', minScore: -Infinity, actionWeight: 0.5 },
                { name: 'Contributor', minScore: 0, actionWeight: 1 },
                { name: 'Trusted', minScore: 50, actionWeight: 1.5 },
                { name: 'Expert', minScore: 100, actionWeight: 2 }
            ],
            leaderboard: {
                size: 10,
                timeWindow: 0,
                includeInactive: true,
                minActivity: 0
            },
            eventLogging: {
                enabled: true,
                maxEvents: 1000,
                retentionPeriod: 0
            }
        });
        // Initialize API
        const api = new api_1.KarmaKitAPI(karmaKit);
        // Start API server
        api.start();
        // Handle graceful shutdown
        process.on('SIGTERM', async () => {
            console.log('Shutting down...');
            await karmaKit.close();
            process.exit(0);
        });
        process.on('SIGINT', async () => {
            console.log('Shutting down...');
            await karmaKit.close();
            process.exit(0);
        });
    }
    catch (error) {
        console.error('Error starting application:', error);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=index.js.map