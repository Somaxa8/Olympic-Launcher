import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: "#6f42c1",
                secondary: "#2c7873",
                accent: "#181C32",
                error: "#d9534f",
                info: "#3da9de",
                success: "#509950",
                warning: "#f0ad4e",
                customGray: "#ececec"
            },
            dark: {
                primary: "#121212",
                secondary: "#2a2a2a",
                accent: "#a49200",
                error: "#d9534f",
                info: "#0078f2",
                success: "#00b879",
                warning: "#f0ad4e",
                customGray: "#202020"
            },
        }
    },
    icons: {
        iconfont: "mdiSvg"
    }
})