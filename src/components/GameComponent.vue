<template>
    <v-card color="primary" dark elevation="0" width="180" height="100%">
        <v-card @click="clickGame(game.appName)" height="calc(100% - 48px)">
            <v-img :src="game.artSquare + '?h=854&resize=1&w=640'" height="100%" min-height="132" min-width="99" width="inherit" :alt="game.title" class="d-flex justify-center align-center" :style="game.isInstalled ? '' : 'filter: grayscale(100%);' " :gradient="game.isInstalled ? '' : 'to top right, rgba(44, 44, 44, 0.7), rgba(44, 44, 44, 0.7)'">
                <b v-if="loading">{{previousPercent.percent}}</b>
                <v-img :src="game.artLogo" width="70%" alt="logo" style="margin: auto"></v-img>
            </v-img>
        </v-card>
        <v-card-title class="pa-0">
            <span class="game-title">{{ game.title }}</span>
            <div v-if="game.isInstalled" class="game-action">
                <v-icon small color="#9a9a9a">mdi-play</v-icon> <span style="font-size: 12px; line-height: 1; color: #9a9a9a">Launch</span>
            </div>
            <div v-else class="game-action">
                <v-icon small color="#9a9a9a">mdi-arrow-down-bold</v-icon> <span style="font-size: 12px; line-height: 1; color: #9a9a9a">Install</span>
            </div>
        </v-card-title>
    </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import InstallProgress from "@/models/legendary/InstallProgress";
import LegendaryRenderer from "@/service/renderer/LegendaryRenderer";
import Game from "@/models/legendary/Game";
import log from "loglevel";

@Component
export default class GameComponent extends Vue {
    previousPercent: InstallProgress = new InstallProgress("0.00MiB", "00:00:00", "0%", "")
    loading: boolean = false
    @Prop() game!: Game
    @Prop() refresh!: any

    clickGame(appName: string) {
        if (!this.game.isInstalled) {
            LegendaryRenderer.installGame(this, appName)

            setInterval(async () => {
                if (!this.loading) return
                if (this.previousPercent.percent === "100%") this.refresh()
                await LegendaryRenderer.getProgress(window, appName, this.previousPercent)
            }, 500)
        } else {
            LegendaryRenderer.launchGame(appName)
        }
    }

}
</script>

<style scoped>
.game-title {
    width: 100%;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.game-action {
    height: 22px !important;
    display: contents !important;
}
</style>
