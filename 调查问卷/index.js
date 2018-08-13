var app = new Vue({
    el: "#app",
    data: {
        nowShow: 1,
        sexChoice: "",
        hobChoice: [],
        text: ""
    },
    methods: {
        handleChange: function (name) {
            if (name == "next") {
                this.nowShow += 1;
            } else if (name == "previous") {
                this.nowShow -= 1;
            } else if (name == "reset") {
                this.nowShow = 1;
                this.sexChoice = "";
                this.hobChoice = [];
                this.text = ""
            } else {
                alert("你已提交成功")
            }
        }
    },
    computed: {
        sexNext: function () {
            return this.sexChoice === ""
        },
        hobNext: function () {
            var length = this.hobChoice.length
            return !(length >= 2 && length <= 3)
        },
        submit: function () {
            return !(this.text.length >= 100)
        },

    },
    watch: {
        hobChoice: function (val) {
            if (val.length > 3) {
                alert("最多选三个")
            }
        }
    }
})