import type {Competition} from "~/models/competition.model";
import type {Image, Meta} from "~/models/strapi.model";

export interface Player {
  id: number
  firstname: string
  lastname: string
  image: Image
  ranking: number
  slug: string
  competition: Array<Competition>
}

export interface PlayerResponse {
    data: Player
    meta: Meta
}

export interface PlayersResponse {
    data: Player[]
    meta: Meta
}

