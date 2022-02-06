<template>
    <v-card color="primary" dark elevation="0" width="180">
        <v-card @click="clickGame(game.appName)">
            <v-img :src="game.artSquare" :alt="game.title">
                <b v-if="loading">{{previousPercent.percent}}</b>
            </v-img>
        </v-card>
        <v-card-title class="pa-0">
            <span style="font-size: 12px;">{{ game.title }}</span>
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
