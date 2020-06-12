<script>
export default {
    props: {
        isAutoWidth: Boolean,
        updateAll: Boolean
    },
    inject: ['elForm'],
    data() {
        return {
            computedWidth: 0
        }
    },
    watch: {
        computedWidth(val, oldVal) {
            if (this.updateAll) {
                this.elForm.registerLabelWidth(val, oldVal)
            }
        }
    },
    methods: {
        
    },
    render(h) {
        const slots = this.$slots.default;
        if(!slots) return null;
        if (this.isAutoWidth) {
            const autoLabelWidth = this.elForm.autoLabelWidth;
            const style = {}
            if (autoLabelWidth && autoLabelWidth !== 'auto') {
                const marginLeft = parseInt(autoLabelWidth, 10) - this.computedWidth
                if (marginLeft) {
                    style.marginLeft = marginLeft + 'px'
                }
            }
            return (<div class="dr-form-item__label-wrap" style={style}>{ slots }</div>)
        } else {
            return slots[0]
        }
    }
}
</script>