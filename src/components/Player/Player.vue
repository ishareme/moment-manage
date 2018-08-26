<template>
    <div :class="className">

    </div>
</template>

<script>
    export default {
        name: "player",
        props: {
            className: {
                type: String,
                default: 'player'
            },
            item: {
                type: Object,
            },
            autoplay: {
                type: Boolean,
                default: false
            }
        },
        created(){
            console.log('className',this.className)
            console.log('item', this.item)
            console.log('autoplay', this.autoplay)
            window.mePlayer({
                music : {
                    src   : this.item.file,
                    title : this.item.name,
                    author: this.item.author,
                    cover : this.item.cover,
                    // lrc   : '歌词字符串：[00:24.600]温柔的晚风\n[00:27.830]轻轻吹过 爱人的梦中\n ...'
                },
                target: `.${this.className}`,
                autoplay: this.autoplay // 是否自动播放
            });
        },
        mounted(){
            window.mePlayer({
                music : {
                    src   : this.item.file,
                    title : this.item.title,
                    author: this.item.author,
                    cover : this.item.cover,
                    // lrc   : '歌词字符串：[00:24.600]温柔的晚风\n[00:27.830]轻轻吹过 爱人的梦中\n ...'
                },
                target: `.${this.className}`,
                autoplay: this.autoplay // 是否自动播放
            });
        }
    }
</script>

<style scoped>

</style>