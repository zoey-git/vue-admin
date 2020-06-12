<template>
    <form class="dr-form" :class="[]">
        <slot></slot>
    </form>
</template>

<script>
export default {
    name: 'DrForm',
    provide() {
        return {
            drForm: this
        }
    },
    props: {},
    computed: {
        autoLabelWidth() {
            if (!this.potentialLabelWidthArr.length) return 0;
            const max = Math.max(...this.potentialLabelWidthArr)
            return max ? `${max}px` : ''
        }
    },
    data() {
        return {
            fields: [],
            potentialLabelWidthArr: []
        }
    },
    methods: {
        getLabelWidthIndex(width) {
            const index = this.potentialLabelWidthArr.indexOf(width)
            if (index === -1) {
                throw new Error('[DramaForm]uppected width', width)
            }
            return index
        },
        registerLabelWidth(val, oldVal) {
            if (val && oldVal) {
                const index = this.getLabelWidthIndex(val)
                this.potentialLabelWidthArr.splice(index, 1)
            }
        }
    },
}
</script>