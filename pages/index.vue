<script setup lang="ts">
import type { PlayersResponse } from '~/models/player.model';

const { find } = useStrapi();
const { data, pending, error } = await useAsyncData('players', async () => {
    return await find<PlayersResponse>('players', {
        populate: '*',
    }).then(res => res.data);
});
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
    </div>
</template>


<style scoped>

</style>