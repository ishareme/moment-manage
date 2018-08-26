<template>
    <div class="film">
        <component :is="currentRole"></component>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import adminArticle from './admin'
    import editorArticle from './author'

    export default {
        name: 'dashboard',
        components: { adminArticle, editorArticle },
        data() {
            return {
                currentRole: 'adminArticle'
            }
        },
        computed: {
            ...mapGetters([
                'roles'
            ])
        },
        created() {
            // if (!this.roles.includes('admin')) {
            //     this.currentRole = 'editorDashboard'
            // }
        }
    }
</script>
