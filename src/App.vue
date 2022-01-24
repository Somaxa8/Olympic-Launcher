<template>
    <v-app>
        <title-bar />
        <drawer-component />
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import TitleBar from "@/components/TitleBarComponent.vue";
import DrawerComponent from "@/components/DrawerComponent.vue";

@Component({components:{TitleBar, DrawerComponent}})
export default class App extends Vue {

}
</script>

<style>
body::-webkit-scrollbar {
    display: none;
}
</style>
