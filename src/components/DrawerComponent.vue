<template>
    <v-navigation-drawer :mini-variant="mini" color="primary" app dark permanent>
        <div>
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
                    <div v-for="item in items" class="mb-1">
                        <v-tooltip right>
                            <template v-slot:activator="{ on, attrs }">
                                <v-list-item :ripple="false" :to="item.to" v-if="!item.hidden" v-bind="attrs" v-on="on">
                                    <v-list-item-action>
                                        <v-icon>{{item.icon}}</v-icon>
                                    </v-list-item-action>
                                </v-list-item>
                            </template>
                            <span>{{ item.title }}</span>
                        </v-tooltip>
                    </div>
                </v-list-item-group>
            </v-list>
        </div>

        <v-list dense nav>
            <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                    <v-list-item :ripple="false" @click="logout" v-bind="attrs" v-on="on">
                        <v-list-item-action>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-action>
                    </v-list-item>
                </template>
                <span>Logout</span>
            </v-tooltip>
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
import Dialog from "@/models/vue/Dialog";
import DialogModule from "@/store/DialogModule";


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

    logout() {
        getModule(DialogModule).showDialog(new Dialog(
            "Warning",
            "Are you sure you want to logout?",
            () => SessionRenderer.deleteSession(() => this.$router.replace("/login"))
        ))
    }

}
</script>

<style>
.v-navigation-drawer__border {
    display: none;
}

.v-navigation-drawer__content {
 height: 100%;
 overflow-y: auto;
 overflow-x: hidden;
 display: flex;
 flex-flow: column;
 justify-content: space-between;
}
</style>
