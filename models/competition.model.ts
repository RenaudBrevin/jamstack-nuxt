import type { Player } from '~/models/player.model'
import type {Meta} from "~/models/strapi.model";


export interface Competition {
    id: number
    name: string
    players: Player[]
}

export interface CompetitionResponse {
    data: Competition
    meta: Meta
}

export interface CompetitionsResponse {
    data: Competition[]
    meta: Meta
}