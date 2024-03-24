<script setup lang="ts">
import type { PlayersResponse } from '~/models/player.model';

const { find } = useStrapi();
const { data, pending, error } = await useAsyncData('players', async () => {
    return await find<PlayersResponse>('players', {
        populate: '*',
    }).then(res => res.data);
});

// const pending = computed(() => {})



    
// const page = ref(1)
// const items = ref(Array(55))

// const {data: player, pending: playerPending, error: PlayersError} = useAsyncData('players', () => find<{
//     data: Player[],
//     meta: Meta
//     }>('players', {
//         params: {
//             populate: '*',
//             pagination: {
//                 page: page.value,
//                 pageSize: pageSize.value
//             }
//         }
//     }).then(res => res.data)
// )

// const filter = ref<string[]>([])

// const addFilter = (filter: string) => {
//     if(!filters.value.includes(filter)){
//         filters.value.push(filter)
//     } else {
//         filters.value = filters.value.filter((f) => f !== filter)
//     }
// }

// const filteredPlayers = computed(() => {
//     if(!filters.value){
//         return players?.value?.data
//     }

//     return players?.value?.data.filter((player) => {
//         return player?.competitions?.some((competition) => filters.value.includes(competition.name))
//     })
// })

</script>



<template>
    <div>
        <h1>Mes joueurs</h1>
        <template>
            <div v-if="pending">Loading...</div>
            <div v-else-if="error">Error: {{ error.message }}</div>
        </template>




        <template v-if="!pending" v-for="player in data" :key="player.id">
            {{ player.firstname }}
            {{ player.lastname }}
            {{ player.ranking }}
            <img :src="player.image.url" alt="test">
            <a :href="'/players/' + player.slug" target="">Go to Player</a>
        </template>
        <template v-else-if="error">
            <div>Error: {{ error.message }}</div>
        </template>
        <template v-else>
            <div>Loading...</div>
        </template>
        <template>
        <UPagination v-model="page" :page-count="5" :total="items.length" />
        </template>
    </div>
</template>


<style scoped>

</style>

<!-- 
<template>
    <div>
        <div>
            <PlayerCard v-for="player in players?.data" :key="player.slug" :player="player" />
        </div>

        <UPagination v-if="players?.meta"
            v-model="page"
            :page-count="players?.meta.pagination.pageCount"
            :total="players?.meta.pagination.total"
        />        
    </div>
</template> -->


<!-- 
<template>
    <div>
        <template v-if="competitionsPending">
            <span>Chargement des filtres...</span>
        </template>
        <template v-else>
            <div>
                <h3>Compétitions</h3>
                <button v-for="competition in competitions?.data" 
                    :class="[filters.includes(competitions.name) ? 'bg-blue-500' : 'bg-gray-200']"
                    @click="addFilter(competition.name)">
                    {{ competition.name }}
                </button>
            </div>
        </template>
    </div>
</template> -->