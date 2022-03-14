<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">{{dialogModule.title}}</v-card-title>
                <v-card-text>{{dialogModule.body}}</v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="primary" text @click="acceptClick()">Accept</v-btn>
                    <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import DialogModule from "@/store/DialogModule";
import {getModule} from "vuex-module-decorators";
@Component
export default class DialogComponent extends Vue {
    dialogModule: DialogModule = getModule(DialogModule)
    get dialog() {
        return this.dialogModule.enabled
    }
    set dialog(enabled: boolean) {
        this.dialogModule.setDialogEnabled(enabled)
    }
    acceptClick() {
        this.dialogModule.setDialogEnabled(false)
        this.dialogModule.callback()
    }
}
</script>