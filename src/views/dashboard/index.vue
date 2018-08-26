<template>
    <div class="dashboard">
        <component :is="currentRole"></component>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './author'

export default {
    name: 'dashboard',
    components: { adminDashboard, editorDashboard },
    data() {
        return {
            currentRole: 'adminDashboard',
            role: ''
        }
    },
    computed: {
        // ...mapGetters([
        //     'role'
        // ])
    },
    created() {
        this.role = JSON.parse(window.localStorage.getItem('userInfo')).data.role
        this.currentRole = this.role === 'admin' ? 'adminDashboard' : 'editorDashboard'
    }
}
</script>

<style lang="scss" scoped>

</style>
