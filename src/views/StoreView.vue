<template>
    <div>
        <webview class="webview" partition="persist:epicstore" :preload="storeInjector" src="https://www.epicgames.com/store/en-US/" />
    </div>
</template>

<script lang="ts">
import {Component, Ref, Vue} from "vue-property-decorator";
import InjectorTool from "@/service/tools/InjectorTool";

@Component
export default class StoreView extends Vue {
    storeInjector: string = InjectorTool.STORE_INJECTOR

}
</script>

<style>
.webview {
    width:100%;
    height:100vh;
}
</style>
