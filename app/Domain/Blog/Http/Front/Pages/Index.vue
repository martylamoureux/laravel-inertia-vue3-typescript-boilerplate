<template>
    <div>
        <h1 class="text-3xl font-bold">
            Blogs Posts
        </h1>

        <div>
            <Link :href="route('blog.create')">
                New Post
            </Link>
        </div>

        <ul>
            <li v-for="post in posts" :key="post.id">
                <Link :href="route('blog.edit', [post.id])">
                    {{ post.title }}
                </Link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRef, Ref, computed, PropType, onMounted } from "vue";
import { Inertia } from "@inertiajs/inertia";
import route from "@/ziggy";
import { Blog } from "@/types/generated";
import Post = Blog.Post;
import { Link } from "@inertiajs/inertia-vue3";

export default defineComponent({
    props: {
        posts: { type: Object as PropType<Post[]>, required: true },
    },
    components: { Link },
    setup(props) {

        return {

        };
    }
})
</script>
