<template>
    <v-navigation-drawer app :mini-variant="mini" dark color="secondary" permanent>
        <v-list-item class="px-2">
            <v-list-item-avatar class="ml-0" color="info white--text">
                {{avatarInitials}}
            </v-list-item-avatar>
            <v-btn icon tile @click.stop="mini = !mini">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
        </v-list-item>
        <v-list dense nav>
            <v-list-item-group>
                <div v-for="item in items">
                    <v-divider v-if="item.divider" class="ma-2"></v-divider>
                    <v-subheader v-if="item.subheader && !mini" class="text-uppercase" style="height: 30px">{{item.subheader}}</v-subheader>
                    <v-list-item :to="item.to" v-if="!item.hidden">
                        <v-list-item-action>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{item.title}}</v-list-item-title>
                            <v-list-item-subtitle v-if="item.subtitle">{{item.subtitle}}</v-list-item-subtitle>
                        </v-list-item-content>
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


@Component
export default class DrawerComponent extends Vue {

    drawerModule: DrawerModule = getModule(DrawerModule)

    avatarInitials: string = ""

    items = [
        {title: "Inicio", to: "/", icon: "mdi-storefront", subtitle: "Pantalla de inicio"},
        {title: "Mi Empresa", to: "/my-company", icon: "mdi-gamepad-variant"},
        {title: "Clientes", to: "/clients", icon: "mdi-tune"},
        {title: "Pedidos", to: "/my-orders", icon: "mdi-book-open-blank-variant"},
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

    createAvatarInitials() {
        this.avatarInitials = "Me";
    }

}
</script>
