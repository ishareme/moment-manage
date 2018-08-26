<template>
    <div class="admin-to-do-item" @click="clickToggle">
        <div class="check">
            <el-checkbox :value="todoItem.done" @change="checkToggle"></el-checkbox>
        </div>
        <div class="content">
            <p :class="{done: todoItem.done}">{{todoItem.text}}</p>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    import types from '../../../../store/types'

    export default {
        name: "admin-to-do-item",
        props: [
            'span',
            'todo'
        ],
        data(){
            return {
                todoItem: this.todo,
            }
        },
        created(){
        },
        methods: {
            clickToggle () {
                this.todoItem.done = !this.todoItem.done
                this.$store.commit(types.TOGGLE_TODOITEM, this.todoItem)
            },
            checkToggle(){
                this.todoItem.done = !this.todoItem.done
                this.$store.commit(types.TOGGLE_TODOITEM, this.todoItem)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .admin-to-do-item{
        line-height: 50px;
        display: flex;
        border-bottom: 1px solid #e7f5ff;
        cursor: pointer;
        .content{
            margin-left: 50px;
            cursor: pointer;
        }
        .done{
            text-decoration: line-through;
            color: gray;
            font-weight: 100;
        }
    }
</style>