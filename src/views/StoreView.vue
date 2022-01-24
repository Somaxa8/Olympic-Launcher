<template>
    <div>
        <webview ref="webview" class="webview" src="https://www.epicgames.com/store/en-US/" />
    </div>
</template>

<script lang="ts">
import {Component, Ref, Vue} from "vue-property-decorator";

@Component
export default class StoreView extends Vue {
    @Ref() readonly webview!: Element

    created() {
    }

}
</script>

<style>
.webview {
    width:100%;
    height:100vh;
}
</style>
