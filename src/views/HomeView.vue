<template>
    <div>
        <v-btn color="info" @click="$router.push('/store')">
            Go to Store
        </v-btn>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class HomeView extends Vue {

}
</script>
