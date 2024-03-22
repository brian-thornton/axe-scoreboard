export type IPlayer = {
    id: number,
    name: string,
    wins: number,
    losses: number,
    rating: number,
    team: number,
};

export type IMatchPlayer = {
    id: number,
    name: string,
    wins: number,
    losses: number,
    rating: number,
    team: number,
    matchThrows: any,
    matchTotal: number,
    remainingKillshots: number,
    totalKillshots: number,
    killshotOneEnabled: boolean,
    killshotTwoEnabled: boolean,
    killshotThreeEnabled: boolean,
    dropped: boolean
};

export type IMatchHistory = [{
    id: number,
    winner: IPlayer,
    players: IMatchPlayer[],
    teams: any
}];

export type IMatch = {
    matchDate: string,
    players: IMatchPlayer[],
    winner: IMatchPlayer,
    teams: any
}
