<template>
    <v-system-bar dark color="#121212">
        <v-spacer class="title-bar"/>
        <div>
            <v-btn icon small>
                <v-icon small>mdi-minus</v-icon>
            </v-btn>
            <v-btn icon small>
                <v-icon small>mdi-checkbox-blank-outline</v-icon>
            </v-btn>
            <v-btn icon small>
                <v-icon small>mdi-close</v-icon>
            </v-btn>
        </div>
    </v-system-bar>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({components:{}})
export default class TitleBar extends Vue {

}
</script>

<style scoped>

.title-bar {
    -webkit-user-select: none;
    -webkit-app-region: drag;
    height: inherit;
}

</style>
