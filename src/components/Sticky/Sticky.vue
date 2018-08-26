<template>
    <div :style="{height:height+'px',zIndex:zIndex}">
        <div class="main" :class="className" :style="{
            top:stickyTop+'px',
            zIndex:zIndex,
            position:position,
            width:width,
            height:height+'px',
            // borderBottom: borderBottom,
        }">
            <slot>
                <div>sticky</div>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sticky',
    props: {
        stickyTop: {
            type: Number,
            default: 0
        },
        zIndex: {
            type: Number,
            default: 1
        },
        className: {
            type: String
        }
    },
    data() {
        return {
            active: false,
            position: '',
            currentTop: '',
            borderBottom: '1px solid rgba(0,0,0,0.3)',
            width: undefined,
            height: undefined,
            child: null,
            stickyHeight: 0
        }
    },
    mounted() {
        this.height = this.$el.getBoundingClientRect().height
        document.getElementById('scrollContainer').addEventListener('scroll', this.handleScroll)
    },
    activated() {
        this.handleScroll()
    },
    destroyed() {
        // document.getElementById('scrollContainer').removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        sticky() {
            if (this.active) {
                return
            }
            this.position = 'fixed'
            this.active = true
            this.width = this.width + 'px'
        },
        reset() {
            if (!this.active) {
                return
            }
            this.position = ''
            this.width = 'auto'
            this.active = false
        },
        handleScroll() {
            this.width = this.$el.getBoundingClientRect().width - 100
            const offsetTop = this.$el.getBoundingClientRect().top
            if (offsetTop <= this.stickyTop) {
                this.sticky()
                return
            }
            this.reset()
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>