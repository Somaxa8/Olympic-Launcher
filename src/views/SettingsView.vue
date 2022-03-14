<template>
    <v-card elevation="0">
        <v-card-title>
            Settings
            <v-spacer />
            <v-btn class="mr-2" elevation="0" small @click="saveSettings">Save</v-btn>
            <v-btn elevation="0" small @click="restoreDefaults">restore defaults</v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="6">
                        <p>Wine version:</p>
                        <v-select v-model="settings.wineVersion" :items="settings.wineVersions" outlined></v-select>
                        <p>FPS Counter</p>
                        <v-switch v-model="settings.fpsCounter" inset :label="settings.fpsCounter ? 'Enable' : 'Disable'" color="success"/>
                        <p>FSR</p>
                        <v-switch v-model="settings.fsr" inset :label="settings.fsr ? 'Enable' : 'Disable'" color="success"/>
                        <p>FSR Sharpness: <b>{{settings.fsrSharpness}}</b></p>
                        <v-slider :disabled="!settings.fsr" v-model="settings.fsrSharpness" color="red darken-4" min="1" max="5" />
                        <p>Auto update</p>
                        <v-switch v-model="settings.autoUpdate" inset :label="settings.autoUpdate ? 'Enable' : 'Disable'" color="success"/>
                    </v-col>
                    <v-col cols="7">
                        <v-expansion-panels flat>
                            <v-expansion-panel>
                                <v-expansion-panel-header style="padding: 0;">
                                    <h3>Advanced Options</h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content style="padding: 0;">
                                    <p class="grey--text">If you modify any of these options, some games may stop working.</p>
                                </v-expansion-panel-content>
                                <v-expansion-panel-content style="padding: 0;">
                                    <p>DXVK</p>
                                    <v-switch v-model="settings.dxvk" inset :label="settings.dxvk ? 'Enable' : 'Disable'" color="success"/>
                                    <p>VKD3D</p>
                                    <v-switch v-model="settings.vkd3d" inset :label="settings.vkd3d ? 'Enable' : 'Disable'" color="success"/>
                                    <p>Esync</p>
                                    <v-switch v-model="settings.esync" inset :label="settings.esync ? 'Enable' : 'Disable'" color="success"/>
                                    <p>Fsync</p>
                                    <v-switch v-model="settings.fsync" inset :label="settings.fsync ? 'Enable' : 'Disable'" color="success"/>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Settings from "@/models/Settings";
import SettingsRenderer from "@/service/renderer/SettingsRenderer";

@Component
export default class SettingsView extends Vue {
    settings: Settings = new Settings()

    created() {
        this.settings = SettingsRenderer.getSettings()
    }

    saveSettings() {
        SettingsRenderer.setSettings(this.settings)
    }

    restoreDefaults() {
        this.settings = new Settings()
        SettingsRenderer.setSettings(this.settings)
    }

}
</script>
