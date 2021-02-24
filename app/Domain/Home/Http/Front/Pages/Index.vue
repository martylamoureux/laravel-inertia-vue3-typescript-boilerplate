<template>
    <div class="text-center py-16 text-green-400">
        Hello {{ name }}
    </div>
</template>

<script lang="ts">
import { defineComponent, toRef, Ref } from "vue";

export default defineComponent({
    props: {
        name: { type: String, required: true },
    },
    setup(props) {
        const name: Ref<string> = toRef(props, "name");

        return {
            name,
        };
    }
})
</script>
