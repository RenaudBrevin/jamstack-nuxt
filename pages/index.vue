<script setup lang="ts">
import type { PlayersResponse } from '~/models/player.model';
import type { CompetitionResponse } from '~/models/competition.model';

const { find } = useStrapi();
const filters = ref<String[]>([]);
const page = ref(1);
const pageSize = ref(3);
const searchQuery = ref('');

const { data: competitions, pending: competitionsPending, error: competitionsError } = await useAsyncData('competitions', async () => {
    return await find<CompetitionsResponse>('competitions', {
        populate: '*',
    }).then(res => res.data);
});

const { data: players, pending, error, refresh: playersRefresh } = useAsyncData('players', () => find<{
        data: Player[],
        meta: Meta
    }>('players', {
        populate: '*',
        pagination: { 
            page: page.value, 
            pageSize: pageSize.value 
        },
        filters: {
            competitions: {
                name: {
                    $in: filters.value
                }
            }
        }
    }), {
        watch: [page, filters],
    }
)


const addFilter = (filter: string) => {
    if (!filters.value.includes(filter)) {
        filters.value.push(filter)
    } else {
        filters.value = filters.value.filter((f) => f !== filter)
    }

    playersRefresh()
}

const filteredPlayers = computed(() => {
    let playersFiltered = players.value.data;

    if (filters.value.length) {
        playersFiltered = playersFiltered.filter((player) => {
            return player?.competitions?.some((competition) => filters.value.includes(competition.name));
        });
    }

    if (searchQuery.value) {
        const lowerSearchQuery = searchQuery.value.toLowerCase();
        playersFiltered = playersFiltered.filter((player) => {
            return (
                player.firstname.toLowerCase().includes(lowerSearchQuery) ||
                player.lastname.toLowerCase().includes(lowerSearchQuery)
            );
        });
    }

    return playersFiltered;
});

</script>

<template>
    <div>
        <h1>Mes joueurs</h1>
        <button v-for="competition in competitions" :key="competition.slug"
            :class="filters.includes(competition.name) ? 'bg-gray-900' : 'bg-white'" class="text-black"
            @click="addFilter(competition.name)">
            {{ competition.name }}
        </button>
        <input type="text" v-model="searchQuery" placeholder="Filter players by title or track...">
        <template>
            <div v-if="pending">Loading...</div>
            <div v-else-if="error">Error: {{ error.message }}</div>
        </template>
        <template v-if="!pending" v-for="player in filteredPlayers" :key="player.id">
            {{ player.firstname }}
            {{ player.lastname }}
            {{ player.ranking }}
            <img class="playerImage" :src="player.image.url" alt="test">
            <a :href="'/players/' + player.slug" target="">Player's informations </a>
        </template>
        <template v-else-if="error">
            <div>Error: {{ error.message }}</div>
        </template>
        <template v-else>
            <div>Loading...</div>
        </template>

        <UPagination
            v-if="players?.meta"w
            v-model="page"
            :pageCount="players.meta.pagination.pageCount || 10"
            :total="players?.meta.pagination.total"
        />
    </div>
</template>

<style scoped>

.playerImage{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 10px;
}

a{
    color: white;
    background-color: rgb(52, 66, 44);
    padding: 5px;
    border-radius: 5px;
    text-decoration: underline;
    margin: 10px;
}

</style>
