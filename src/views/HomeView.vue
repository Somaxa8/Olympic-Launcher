<template>
    <v-content class="pa-4" style="height: 100vh; overflow-y: scroll">
        <v-row>
            <v-col cols="2" v-for="game in library" :key="game.appName">
                <v-card width="180">
                    <v-img :src="game.artSquare"></v-img>
                </v-card>
            </v-col>
        </v-row>
    </v-content>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import LegendaryRenderer from "@/service/renderer/LegendaryRenderer";
import Game from "@/model/legendary/Game";

@Component
export default class HomeView extends Vue {
    library: Game[] = LegendaryRenderer.getLibrary(window)

    created() {
        console.log(this.library)
    }

}
</script>
