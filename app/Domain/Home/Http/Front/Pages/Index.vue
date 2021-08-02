<template>
    <div class="text-center py-16 text-green-400">
        Hello {{ name }}.
    </div>
    <div class="text-red-500">
        <button @click="hello('Marty')">
            {{ route("index") }}
        </button>
        <button @click="hello('Nico')">
            {{ route("index", {name: 'Nico'}) }}
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRef, Ref, computed } from "vue";
import { Inertia } from "@inertiajs/inertia";
import route, { Router } from "@/ziggy";

export default defineComponent({
    props: {
        name: { type: String, required: true },
    },
    setup(props) {
        const name: Ref<string> = toRef(props, "name");

        function hello(name: string) {
            Inertia.visit(route("index", {name}));
        }



        return {
            name, hello,
        };
    }
})
</script>
