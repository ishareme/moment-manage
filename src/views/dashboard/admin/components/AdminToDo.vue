<template>
    <div>
        <el-col :span="span">
            <el-card shadow="hover" class="admin-to-do">
                <div class="header">
                    <div class="title"><i class="iconfont icon-daiban"></i>  待办事项</div>
                    <div class="plus" @click.prevent="openAddToDoItemDialog"><i class="iconfont icon-tianjia"></i></div>
                </div>
                <div class="footer">
                    <div v-if="toDoList.length">
                        <admin-to-do-item v-for="(todo, index) in toDoList" :todo="todo" :key="index"></admin-to-do-item>
                    </div>
                    <div v-else>
                        <p class="noneTodoItem">你还没有待办事项哦</p>
                    </div>
                </div>
            </el-card>
        </el-col>
        <div class="addToDoItemDialog">
            <el-dialog title="添加新的待办事项" :visible.sync="addToDoItemDialog.opened" :width="addToDoItemDialog.width">
                <el-input
                        placeholder="请输入..."
                        suffix-icon="el-icon-edit-outline"
                        v-model="newToDoItemValue"
                >
                </el-input>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelAddToDoItem">取 消</el-button>
                    <el-button type="primary" @click="addNewToDoItem">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    import types from '../../../../store/types'

    import AdminToDoItem from './AdminToDoItem'
    export default {
        name: "admin-to-do",
        props: [
            'span'
        ],
        data(){
            return {
                toDoList: window.localStorage.getItem('todo') === null ? [] :  JSON.parse(window.localStorage.getItem('todo')),
                newToDoItemValue: '',
                addToDoItemDialog : {
                    opened: false,
                    width: '25%',
                }
            }
        },
        components: {
            AdminToDoItem
        },
        created(){
        },
        methods: {
            openAddToDoItemDialog(){
                this.addToDoItemDialog.opened = true
            },
            cancelAddToDoItem(){
                this.addToDoItemDialog.opened = false
            },
            addNewToDoItem(){
                if (this.newToDoItemValue.trim().length !== 0) {
                    let newToDoItem = {
                        text: this.newToDoItemValue.trim(),
                        done: false,
                    }
                    this.$store.commit(types.ADD_TODOITEM, newToDoItem)
                    this.toDoList = this.$store.state.todo.toDoList
                    setTimeout(() => {
                        this.newToDoItemValue = '';
                    }, 200);
                    this.addToDoItemDialog.opened = false
                } else {
                    this.$message({
                        message: '请输入待办事项内容',
                        type: 'error'
                    })
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .admin-to-do{
        margin-top: 20px;
        .header{
            line-height: 50px;
            display: flex;
            justify-content: space-between;
            border-bottom: 2px solid #fff1fd;
            font-weight: bold;
            .title{
                i{
                    font-size: 20px;
                }
            }
            .plus{
                cursor: pointer;
                i{
                    font-size: 25px;
                    transition: all .5s;
                }
                i:hover{
                    color: #8c93fd;
                }
            }
        }
        .footer{
            margin-top: 18px;
            height: 150px;
            overflow-y: scroll;
            .noneTodoItem{
                text-align: center;
            }
        }
    }
</style>