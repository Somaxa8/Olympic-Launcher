<template>
    <v-app>
        <title-bar />
        <drawer-component v-if="showMenu()"/>
        <v-main class="fill-height main">
            <router-view/>
        </v-main>
        <snackbar-component/>
        <dialog-component/>
    </v-app>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import TitleBar from "@/components/TitleBarComponent.vue";
import DrawerComponent from "@/components/DrawerComponent.vue";
import SnackbarComponent from "@/components/SnackbarComponent.vue";
import DialogComponent from "@/components/DialogComponent.vue";

@Component({components:{TitleBar, DrawerComponent, SnackbarComponent, DialogComponent}})
export default class App extends Vue {

    showMenu() {
        return this.$route.name != null && this.$route.name != "Login"
    }

}
</script>

<style>
.main {
    padding: 0 0 0 56px !important;
    height: 95vh;
    overflow-y: scroll;
    margin-top: 24px;
}
body::-webkit-scrollbar {
    display: none;
}
</style>
