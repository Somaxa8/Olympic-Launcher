<template>
    <v-card color="primary" dark elevation="0" width="180">
        <v-card @click="clickGame(game.appName)">
            <v-img :src="game.artSquare" :alt="game.title" :style="game.isInstalled ? '' : 'filter: grayscale(100%);' " :gradient="game.isInstalled ? '' : 'to top right, rgba(44, 44, 44, 0.7), rgba(44, 44, 44, 0.7)'">
                <b v-if="loading">{{previousPercent.percent}}</b>
            </v-img>
        </v-card>
        <v-card-title class="pa-0">
            <span style="font-size: 12px; width: 100%">{{ game.title }}</span>
            <div v-if="game.isInstalled">
                <v-icon small color="#9a9a9a">mdi-play</v-icon> <span style="font-size: 12px; line-height: 1; color: #9a9a9a">Launch</span>
            </div>
            <div v-else>
                <v-icon small color="#9a9a9a">mdi-arrow-down-bold</v-icon> <span style="font-size: 12px; line-height: 1; color: #9a9a9a">Install</span>
            </div>
        </v-card-title>
    </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import InstallProgress from "@/model/legendary/InstallProgress";
import LegendaryRenderer from "@/service/renderer/LegendaryRenderer";
import Game from "@/model/legendary/Game";

@Component
export default class GameComponent extends Vue {
    previousPercent: InstallProgress = new InstallProgress("0.00MiB", "00:00:00", "0%", "")
    loading: boolean = false
    @Prop() game!: Game

    clickGame(appName: string) {
        LegendaryRenderer.installGame(this, appName)

        setInterval(async () => {
            if (!this.loading) return
            await LegendaryRenderer.getProgress(window, appName, this.previousPercent)
        }, 1500)
    }

}
</script>
