Vue.component("my-button", {
    template: `<div :class="cla">
      <button type="submit" :class="btn(name,checkNext)" :disabled="checkNext" @click="handleChange(name)" :name="name">
      {{text}}
      </button>
      </div>
    `,
    props: {
        text: {
            type: String
        },
        checkNext: {
            type: Boolean,
            default: false
        },
        name: {
            type: String
        },
        cla: {
            type: String
        }

    },
    methods: {
        handleChange(name) {
            this.$emit("click", name)
        },
        btn: function (name, checkNext) {
            return ["buttons", {
                " next-btn": (name == "next" || name == "submit") && (checkNext == false)
            }]
        }
    }



})