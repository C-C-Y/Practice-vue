Vue.directive('clickoutside', {
    bind: function (el, binding, vnode) {
        function documentHandler(e) {//e是事件对象
            if (el.contains(e.target)) {//这个判断指令绑定的元素是否包含点击的元素(区域)如果包含,函数直接退出
                return false
            }
            if (binding.expression) {//这个判断指令是否绑定表达式,如果绑定则直接执行
                binding.value()//binding.value是指令绑定的值,这次的指令绑定的是一个函数即handleClose,后面加括号表示直接执行
            }
        };
       /* function close(e){
           if(app.$root.show&&e.keyCode==27){
               binding.value();
           }
        };
        el._vueclose_=close;
        */
        el._vueClickOutside_ = documentHandler;//在自定义指令中不能再使用this.xxx的形式在上下文中声明一个变量,用另一个变量引用
        document.addEventListener("click", documentHandler);//向document添加时间处理程序,当发生点击事件后
//事件会向上冒泡最后到达documen的事件处理程序统一处理,过滤是el内的元素
        //document.addEventListener('keyup',close);
    },
       
    unbind:function (el,binding){
        document.removeEventListener("click",el._vueClickOutside_);//解绑
        delete el._vueClickOutside_;
        //document.removeEventListener("keyup",el._vueclose_);
        //delete el._vueclose_;
       
    },
    update:function(el,binding){
        
        
    }
})