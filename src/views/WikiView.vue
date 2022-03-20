<template>
    <div>
        <webview class="webview" src="https://github.com/Olympic-Launcher/Olympic-Launcher/wiki" />
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class WikiView extends Vue {

}
</script>

<style>
.webview {
    width:100%;
    height:100vh;
}
</style>