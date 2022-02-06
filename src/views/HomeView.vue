<template>
    <v-container fluid>
        <v-row>
            <v-col cols="2" v-for="game in library" :key="game.appName">
                <GameComponent :game="game"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import LegendaryRenderer from "@/service/renderer/LegendaryRenderer";
import Game from "@/model/legendary/Game";
import GameComponent from "@/components/GameComponent.vue";

@Component({components:{GameComponent}})
export default class HomeView extends Vue {
    library: Game[] = []

    created() {
        LegendaryRenderer.getLibrary(window, this.library)
        console.log(this.library)
    }

}
</script>
