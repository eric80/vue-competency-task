<template>
  <div class="text-field">
    <div class="input__control">
      <div class="input__slot">
        <div class="text-field__slot">
          <input :type="typeName" :placeholder="`${placeholder}`" :value="value"
                 @keyup="change" @blur="change">
        </div>
      </div>
      <div class="text-field__details" v-if="rules">
        <div class="validate__message" v-html="hasError ? `${errorMSG[0]}` : ''"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'text-field',
  props: {
    value: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    rules: Array
  },
  data: () => ({
    typeName: null,
    appendIcon: 'visibility_off',
    errorMSG: []
  }),
  computed: {
    hasError () {
      return this.errorMSG.length > 0
    }
  },
  mounted () {
    this.typeName = this.type
  },
  methods: {
    validate (value) {
      this.errorMSG = []

      if (this.rules) {
        for (let index = 0; index < this.rules.length; index++) {
          const rule = this.rules[ index ]
          const valid = typeof rule === 'function' ? rule(value) : rule

          if (valid === false || typeof valid === 'string') {
            this.errorMSG.push(valid)
          }
        }
      }

      return this.errorMSG.length === 0
    },
    change (e) {
      const value = e.target.value
      this.validate(value)

      this.$emit('input', value)
    },
    clickIcon () {
      if (this.type !== 'password') return false
      if (this.appendIcon === 'visibility_off') {
        this.appendIcon = 'visibility'
        this.typeName = 'text'
      } else {
        this.appendIcon = 'visibility_off'
        this.typeName = 'password'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .input__control {
    .input__slot {
      display: flex;
      min-height: 60px;
      position: relative;
      width: 100%;
      padding: 0 10px;

      .text-field__slot {
        min-height: 60px;
        display: flex;
        flex: 1 1 auto;
        position: relative;

        input {
          flex: 1 1 auto;
          padding: 8px 0 8px;
          max-width: 100%;
          min-width: 0;
          width: 100%;

          &.has-append-icon {
            padding-left: 36px;
          }
        }
      }

      .input__append-inner {
        align-self: center;
        padding: 4px;
      }
    }

    .text-field__details {
      display: flex;
      flex: 1 0 auto;
      min-height: 16px;
      margin-top: 8px;

      .validate__message {
        color: red;
        text-align: left;
        font-size: 16px;
        line-height: 1;
      }
    }
  }
</style>
