<template>
    <div>
        <webview id="foo" src = "https://www.epicgames.com/store/en-US/" style="width:100%; height:100vh;">
            <div class = "indicator"></div>
        </webview>
    </div>
</template>

<script lang="ts">
import {Component, Ref, Vue} from "vue-property-decorator";

@Component
export default class StoreView extends Vue {
    @Ref() readonly webview!: Element

    created() {
        const webview: any = document.getElementById('foo')
        const indicator: any = document.querySelector('.indicator')

        const loadstart = () => {
            indicator.innerText = 'loading...'
        }

        const loadstop = () => {
            indicator.innerText = ''
        }

        webview.addEventListener('did-start-loading', loadstart)
        webview.addEventListener('did-stop-loading', loadstop)
    }

}
</script>
