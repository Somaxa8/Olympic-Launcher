import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store/store";

@Module({dynamic: true, store, name: "DrawerModule"})
export default class DrawerModule extends VuexModule {

    mini: boolean = true


    @Mutation
    closeMiniDrawer() {
        this.mini = !this.mini
    }

    @Mutation
    setMiniDrawerEnabled(enabled: boolean) {
        this.mini = enabled
    }

}