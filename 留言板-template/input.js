Vue.component('v-input', {
    props: {/*v-model传递的props就是value,元素的dom属性value,通过绑定value实现js到dom的单方绑定,再监控输入事件,
        将实况value传递到js,实现dom到js的单方面绑定,这样就实现了双向绑定
        <input v-model="message">
        v-model这个语法糖相当于
        <input :value="message" @input="this.message=event.target.value">
        */
        value: {
            type: [String, Number],
            default: ""
        }
    },
    template: `
    <div>
      <span>昵称:</span>
      <input type="text" :value="value" @input="submitName">
    </div>
    `,//这里不用v-model是因为父级可以将数据传下来,但是子级无法将数据传上去,要额外添加子组件的单独数据(不能直接用传下来的value)
    //还要设置监听父级数据的变化,还要加载时刷新数据,还要将数据传上去,很麻烦,没必要,索性直接绑定传进来的value然后监听输入传递值
    methods: {
        submitName: function (event) {
            this.$emit("input", event.target.value)
        }
    },
});
Vue.component('v-textarea', {
    props: {
        value: {
            type: [String, Number],
            default: ""
        }
    },
    template: `
     <div>
       <span>留言内容:</span>
       <textarea placeholder="请输入留言内容" :value="value"  @input="submitMessage" ref="message"></textarea>
     </div>
    `,
    methods: {
        submitMessage: function (event) {
            this.$emit('input', event.target.value)
        },
        focus:function(){
            this.$refs.message.focus()//到这里才能访问到ref所在的元素
            //这里用alert(this.$refs.message)显示的是HTML文本区域元素
        }
    },
    
})