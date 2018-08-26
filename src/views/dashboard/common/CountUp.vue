<template>
    <div>
        <p :style="{textAlign: 'center', color: color}"><span v-cloak :id="idName" style="font-size: 25px">{{ startVal }}</span></p>
        <slot name="text"></slot>
    </div>
</template>

<script>
import  CountUp from 'countup'

export default {
    data () {
        return {
            unit: '',
            demo: {}
        };
    },
    name: 'countUp',
    props: {
        idName: String,
        startVal: {
            type: [String, Number],
            default: 0
        },
        endVal: {
            type: [String, Number],
            required: true
        },
        decimals: {
            type: [String, Number],
            default: 0
        },
        duration: {
            type: [String, Number],
            default: 2
        },
        delay: {
            type: Number,
            default: 500
        },
        options: {
            type: Object,
            default: () => {
                return {
                    useEasing: true,
                    useGrouping: true,
                    separator: ',',
                    decimal: '.'
                };
            }
        },
        color: String,
        text: [String, Number]
    },
    mounted () {
        this.$nextTick(() => {
            setTimeout(() => {
                let endVal = this.endVal;
                let demo = {};
                this.demo = demo = new CountUp(this.idName, this.startVal, endVal, this.decimals, this.duration, this.options);
                if (!demo.error) {
                    demo.start();
                }
            }, this.delay);
        });
    },
    watch: {
        endVal (val) {
            let res = transformValue(val);
            let endVal = res.val;
            this.unit = res.unit;
            this.demo.update(endVal);
        }
    }
};
</script>
