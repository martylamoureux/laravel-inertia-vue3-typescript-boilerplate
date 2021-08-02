<template>
    <div>
        <h1 class="text-3xl font-bold">
            {{ post.__exists ? "Edit Post" : "New Post" }}
        </h1>

       <form @submit.prevent="submit">
           <div>
               Title: <input type="text" v-model="form.title" />
           </div>

           <div>
               Content: <br>
               <textarea v-model="form.content"></textarea>
           </div>

           <div>
               <button type="submit">
                   Enregistrer
               </button>
           </div>
       </form>


    </div>
</template>

<script lang="ts">
import { defineComponent, toRef, Ref, computed, PropType } from "vue";
import { Inertia } from "@inertiajs/inertia";
import route from "@/ziggy";
import { Blog } from "@/types/generated";
import Post = Blog.Post;
import { useForm } from "@inertiajs/inertia-vue3";

export default defineComponent({
    props: {
        post: { type: Object as PropType<Post>, required: true },
    },
    setup(props) {
        const post = props.post;

        console.log(post);

        const form = useForm({
            title: post.title,
            content: post.content,
        });

        function submit() {
            form.post(post.__exists ? route("blog.update", [post.id!]) : route("blog.store"));
        }

        return {
            form, submit
        };
    }
})
</script>
