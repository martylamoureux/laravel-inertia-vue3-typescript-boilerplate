<template>
    <div class="text-center py-16 text-blue-500">
        {{ name }}
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, h, reactive, ref, toRef, toRefs, watch } from "vue";

export default defineComponent({
    props: {
        name: String,
    },
    setup(props, { emit }) {
        const firstname = ref("");
        const lastname = ref("");
        const scale = ref(1);

        const fullname = computed(() => {
            return firstname.value + " " + lastname.value;
        })

        return {
            firstname, fullname,
        };
    }
})
</script>
