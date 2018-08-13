var app = new Vue({
    el: "#ap",
    data: {
        list: [{
                id: 1,
                name: "computer",
                count: 1,
                price: 2000,
            },
            {
                id: 2,
                name: "T-shirt",
                price: 50,
                count: 1,
            },
            {
                id: 3,
                name: "ball",
                price: 300,
                count: 1,
            }
        ],
        checked: [],

    },
    computed: {
        totalPrice: function () {
            var total = 0;
            for (i = 0; i < this.list.length; i++) {
                if (this.checked.indexOf(this.list[i].name) != -1) {
                    total += this.list[i].price * this.list[i].count
                }
            };
            return total.toString().replace(/\B(?=(\d{3})+$)/g, ",")
        },
    },
    methods: {
        countReduce: function (index) {
            if (this.list[index].count == 1) {
                return
            };
            this.list[index].count--;
        },
        countAdd: function (index) {
            this.list[index].count += 1
        },
        removeItem: function (index) {
            if (this.checked.includes(this.list[index].name)) {
                this.checked.splice(this.checked.indexOf(this.list[index].name), 1)
            };
            this.list.splice(index, 1);
        },
        allChoose: function () {
            var check = this.checked;
            if (this.checked.length == this.list.length) {
                this.checked = [];
            } else {
                for (i = 0; i < this.list.length; i++) {
                    check.push(this.list[i].name)
                }
                this.checked = [...new Set(check)]
            };
        },
        thisValue: function (index) {
            return this.list[index].name
        },
    }
})