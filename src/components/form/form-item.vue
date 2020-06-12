<template>
    <div class="dr-form-item" :class="[]">
       <label-wrap>
           <label :for="labelFor" v-if="label || $slots.label">
               <slot name="label">{{label + form.labelSuffix}}</slot>
           </label>
        </label-wrap> 
    </div>
</template>

<script>
import LabelWrap from './label-wrap'
import { noop, getPropByPath } from '../../utils/index';
import objectAssign from '../../utils/merge'
import AsyncValidator from 'async-validator'
export default {
    name: 'DrFormItem',
    provide() {
        return {
            drFormItem: this
        }
    },
    inject: ['drForm'],
    props: {
        label: String,
        labelWidth: String,
        prop: String,
        required: {
            type: Boolean,
            default: undefined
        },
        rules: [Object, Array],
        for: String
    },
    watch: {
        
    },
    computed: {
        labelFor() {
            return this.for || this.prop
        },
        form() {
            let parent = this.$parent
            let parentName = parent.$options.name
            while(parentName !== 'DrForm') {
                if (parentName === 'DrFormItem') {
                    this.isNested = true
                }
                parent = parent.$parent
                parentName = parent.$options.name
            }
            return parent;
        },
        fieldValue() {
            const model = this.form.model
            if (!model || !this.prop) { return }
            let path = this.prop
            if (path.indexOf(':') !== -1) {
                path = path.replace(/:/, '.')
            }
            return getPropByPath(model, path, true).v
        }
    },
    data() {
        return {
            isNested: false,
            validateState: '',
            validateMessage: '',
            validateDisabled: false
        }
    },
    mounted() {
        if (this.prop) {
            this.dispatch('DrForm', 'dr.form.addField')
            let initialValue = this.fieldValue
            if (Array.isArray(initialValue)) {
                initialValue = [].concat(initialValue)
            }
            Object.defineProperty(this, 'initialValue', {
                value: initialValue
            })
            this.addValidateEvents()
        }
    },
    methods: {
        validate(trigger, callback = noop) {
            this.validateDisabled = false
            // 过滤出指定事件的rule
            const rules = this.getFilteredRule(trigger)
            // 没有rule或者没有required则跳过
            if ((!rules || rule.length === 0) && this.required === undefined) {
                callback()
                return true;
            }
            this.validateState = 'validating'

            const descriptor = {}
            // 删除rule中的trigger
            if (rules && rules.length > 0) {
                rules.forEach(rule => {
                    delete rule.trigger
                })
            }
            descriptor[this.prop] = rules

            const validator = new AsyncValidator(descriptor)
            const model = {}

            model[this.prop] = this.fieldValue
            validator.validate(model, { firstFields: true }, (errors, invalidFields) => {
                this.validateState = !errors ? 'success' : 'error'
                this.validateMessage = errors ? errors[0].message : ''
                callback(this.validateMessage, invalidFields)
                this.drForm && this.drForm.$emit('validate', this.prop, !errors, this.validateMessage || null)
            })
        },
        // 过滤出某种事件的rule
        getFilteredRule(trigger) {
            const rules = this.getRules()
            return rules.filter(rule => {
                if (!rule.trigger || trigger === '') return true;
                if (Array.isArray(rule.trigger)) {
                    return rule.trigger.indexOf(trigger) > -1
                } else {
                    return rule.trigger === trigger
                }
            }).map(rule => objectAssign({}, rule))
        },
        onFieldBlur() {
            this.validate('blur')
        },
        onFieldChange() {
            if (this.validateDisabled) {
                this.validateDisabled = false
                return
            }
            this.validate('change')
        },
        getRules() {
            let formRules = this.form.rules
            const selfRules =  this.rules
            const requiredRule = this.required !== undefined ? { required: !!this.required } : []

            const prop = getPropByPath(formRules, this.prop || '')
            formRules = formRules ? (prop.o[this.prop || ''] || prop.v) : []

            return [].concat(selfRules || formRules || []).concat(requiredRule)
        },
        addValidateEvents() {
            const rules = this.getRules()

            if (rules.length || this.required !== undefined) {
                this.$on('dr.form.blur', this.onFieldBlur)
                this.$on('dr.form.change', this.onFieldChange)
            }
        }
    },
    beforeDestroy() {
        this.dispatch('DrForm', 'dr.form.removeField', [this])
    },
    components: {
        LabelWrap
    }
}
</script>