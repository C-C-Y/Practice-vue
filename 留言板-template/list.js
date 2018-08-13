Vue.component("list", {
    props: {
        list: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    template:`
     <div v-if="this.list.length" class="list">
       <div v-for="(msg,index) in list" class="list-item">
         <span>{{msg.name+":"}}</span>
         <div class="list-msg">
           <p>{{msg.message}}</p>
           <a @click="handleRemove(index)">删除</a>
           <a @click="handleReply(index)">回复</a>
         </div>
       </div>
     </div>
     <div v-else class="list-nothing">
       留言列表为空
     </div>
    `
    /*
    render: function (h) {
        var _this = this;
        var list = []; //留言容器,有很多留言,可能不止装一个
        this.list.forEach(function (msg, index) { //遍历每个留言,将他们变成一个个留言块,然后放进容器里
            var node = h('div', {
                attrs: {
                    class: 'list-item'
                }
            }, [h('span', msg.name + ":"), h('div', {
                attrs: {
                    class: "list-msg"
                }
            }, [h("p", msg.message), h("a", {
                attrs: {
                    class: "list-remove"
                },
                on: {
                    click: function () {
                        _this.handleRemove(index)
                    }
                }
            }, "删除"), h("a", {
                attrs: {
                    class: "list-reply"
                },
                on: {
                    click: function () {
                        _this.handleReply(index)
                    }
                }
            }, "回复")])]);
            list.push(node); //将一个留言整体放进留言容器里
        });
        if (this.list.length) {
            return h('div', {
                attrs: {
                    class: "list"
                }
            }, list)
        } else {
            return h("div", {
                attrs: {
                    class: "list-nothing"
                }
            }, "留言列表为空")
        }
    },
    */,
    methods: {
        handleReply: function (index) {
            this.$emit('reply', index)
        },
        handleRemove: function (index) {
            this.$emit("remove", index)
        }
    }
})