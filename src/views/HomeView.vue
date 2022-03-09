<template>
    <v-container fluid>
        <v-row>
            <v-col cols="2" v-for="game in library" :key="game.appName">
                <GameComponent :game="game" :refresh="refresh"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import LegendaryRenderer from "@/service/renderer/LegendaryRenderer";
import Game from "@/models/legendary/Game";
import GameComponent from "@/components/GameComponent.vue";
import log from "loglevel";

@Component({components:{GameComponent}})
export default class HomeView extends Vue {
    library: Game[] = []

    created() {
        this.refresh()
    }

    refresh() {
        LegendaryRenderer.getLibrary(window, this.library)
        log.info("Loading library...")
    }

}
</script>
