<template>
    <div class="tinymce-container editor-container">
        <textarea class="tinymce-textarea" :id="id"></textarea>
        <div class="editor-custom-btn-container">
            <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"></editorImage>
        </div>
    </div>
</template>

<script>
    import editorImage from './components/editorImage'
    import plugins from './plugins'
    import toolbar from './toolbar'
    import './langs/zh_CN.GB2312'

    export default {
        name: 'tinymce',
        components: { editorImage },
        props: {
            id: {
                type: String
            },
            value: {
                type: String,
                default: ''
            },
            toolbar: {
                type: Array,
                required: false,
                default() {
                    return []
                }
            },
            menubar: {
                default: 'file edit insert view format table'
            },
            height: {
                type: Number,
                default: 400,
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                console.log(vm)
                vm.initTinymce()
            })
        },
        data() {
            return {
                hasChange: false,
                hasInit: false,
            }
        },
        watch: {
            value(val) {
                if (!this.hasChange && this.hasInit) {
                    const _this = this
                    this.$nextTick(() => window.tinymce.get(_this.id).setContent(val))
                }
            },
            '$route' (to, from) {
                this.initTinymce()
            }
        },
        created(){
            this.initTinymce()
        },
        mounted() {
            this.initTinymce()
        },
        activated() {
            this.initTinymce()
        },
        deactivated() {
            this.destroyTinymce()
        },
        methods: {
            initTinymce() {
                const _this = this
                window.tinymce.init({
                    selector: `#${_this.id}`,
                    branding: false,
                    elementpath: false,
                    height: _this.height,
                    language: 'zh_CN.GB2312',
                    toolbar: _this.toolbar.length > 0 ? _this.toolbar : toolbar,
                    menubar: _this.menubar,
                    plugins: [
                        'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                        'searchreplace visualblocks visualchars code fullpage fullscreen',
                        'insertdatetime media nonbreaking save table contextmenu directionality',
                        'emoticons paste textcolor colorpicker textpattern imagetools codesample'
                    ],
                    // plugins: plugins,
                    toolbar1: ' newnote print preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
                    autosave_interval: '20s',
                    table_default_styles: {
                        width: '100%',
                        borderCollapse: 'collapse'
                    },
                    init_instance_callback: editor => {
                        if (_this.value) {
                            editor.setContent(_this.value)
                        }
                        _this.hasInit = true
                        editor.on('NodeChange Change KeyUp SetContent', () => {
                            _this.hasChange = true
                            _this.$emit('input', editor.getBody().innerHTML)
                        })
                    },
                })
            },
            destroyTinymce() {
                const _this = this
                if (window.tinymce.get(_this.id)) {
                    window.tinymce.get(_this.id).destroy()
                }
            },
            setContent(value) {
                const _this = this
                window.tinymce.get(_this.id).setContent(value)
            },
            getContent() {
                const _this = this
                window.tinymce.get(_this.id).getContent()
            },
            imageSuccessCBK(arr) {
                const _this = this
                arr.forEach(v => {
                    window.tinymce.get(_this.id).insertContent(`<img class="moment-img" src="${v.url}" >`)
                })
            }
        },
        destroyed() {
            this.destroyTinymce()
        },
    }
</script>

<style lang="scss" scoped>
    .tinymce-container {
        position: relative;
    }
    iframe{
        height: 500px !important;
    }
    .tinymce-container > .mce-fullscreen {
        z-index: 10000;
    }
    .tinymce-textarea {
        visibility: hidden;
        z-index: -1;
    }
    .editor-custom-btn-container {
        position: absolute;
        right: 4px;
        top: 4px;
        /*z-index: 2005;*/
    }
    .editor-upload-btn {
        display: inline-block;
    }
</style>
