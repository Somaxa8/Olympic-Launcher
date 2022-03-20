<template>
    <v-navigation-drawer :mini-variant="mini" color="primary" app dark permanent>
        <v-list-item class="px-2">
            <v-list-item-avatar class="ml-0" color="customGray white--text">
                {{avatarInitials}}
            </v-list-item-avatar>
            <v-btn icon tile @click.stop="mini = !mini">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
        </v-list-item>
        <v-list dense nav>
            <v-list-item-group>
                <div v-for="item in items">
                    <v-list-item :to="item.to" v-if="!item.hidden">
                        <v-list-item-action>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-item-action>
                    </v-list-item>
                </div>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";
import DrawerModule from "@/store/DrawerModule";
import SessionModule from "@/store/SessionModule";
import SessionRenderer from "@/service/renderer/SessionRenderer";
import TimeTool from "@/service/tools/TimeTool";


@Component
export default class DrawerComponent extends Vue {
    drawerModule: DrawerModule = getModule(DrawerModule)
    sessionModule: SessionModule = getModule(SessionModule)

    avatarInitials: string = ""

    items = [
        {title: "Library", to: "/", icon: "mdi-view-grid"},
        {title: "Store", to: "/store", icon: "mdi-tag"},
        {title: "Settings", to: "/settings", icon: "mdi-tune"},
        {title: "Wiki", to: "/wiki", icon: "mdi-book-open-blank-variant"},
    ]

    created() {
        this.createAvatarInitials()
    }

    get mini() {
        return this.drawerModule.mini
    }

    set mini(enabled: boolean) {
        this.drawerModule.setMiniDrawerEnabled(enabled)
    }

    async createAvatarInitials() {
        await TimeTool.timeout(2000)
        this.avatarInitials = SessionRenderer.getUsername().slice(0, 1)
    }

}
</script>

<style>
.v-navigation-drawer__border {
    display: none;
}
</style>
