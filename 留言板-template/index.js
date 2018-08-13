var app = new Vue({
    el: "#app",
    data: {
        username: "",
        message: "",
        list: []
    },
    methods: {
        handleSend: function () {
            if (this.message === "") {
                window.alert("请输入留言内容");
                return;
            }
            if (this.username === "") {
                window.alert("请输入昵称");
                return;
            };
            this.list.push({
                name: this.username,
                message: this.message
            });
            this.message = "";
            this.username = ""

        },
        handleReply: function (index) {
            var name = this.list[index].name;
            this.message = "回复@" + name + ":";
            this.$refs.message.focus(); //this.$refs.message索引到的只是包含message这个ref的组件,并不是直接指向ref所在的元素
        },//所以还要单独触发组件内的focus方法,这里用alert(this.$refs.message)访问到的是[Object object],是组件对象
        handleRemove: function (index) {
            this.list.splice(index, 1)
        }
    }
})