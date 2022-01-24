<template>
    <v-system-bar dark color="primary" app>
        <v-spacer class="title-bar"/>
        <div>
            <v-btn icon small @click="hide">
                <v-icon small>mdi-minus</v-icon>
            </v-btn>
            <v-btn icon small @click="minimize">
                <v-icon small>mdi-checkbox-blank-outline</v-icon>
            </v-btn>
            <v-btn icon small @click="close">
                <v-icon small>mdi-close</v-icon>
            </v-btn>
        </div>
    </v-system-bar>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import WindowRenderer from "@/service/renderer/WindowRenderer";

@Component
export default class TitleBar extends Vue {

    close() {
        WindowRenderer.close(window)
    }

    minimize() {
        WindowRenderer.minimize(window)
    }

    hide() {
        WindowRenderer.hide(window)
    }

}
</script>

<style scoped>

.title-bar {
    -webkit-user-select: none;
    -webkit-app-region: drag;
    height: inherit;
}

</style>
