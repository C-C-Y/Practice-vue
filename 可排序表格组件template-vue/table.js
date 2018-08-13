Vue.component('v-table', {
    props: {
        columns: {
            type: Array,
            default: function () {
                return []
            }
        },
        data: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data: function () {
        return {
            currentColumns: [],
            currentData: []
        }
    },
    template: `
      <table>
        <thead>
          <tr>
            <th v-for="(th,index) in currentColumns">{{th.title}}
            <a v-show="th.sortable" :class="showAsc(index)" @click="handleSortByAsc(index)">↑</a>
            <a v-show="th.sortable" :class="showDesc(index)" @click="handleSortByDesc(index)">↓</a>
            </th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="td in currentData" >
            <td>{{td.name}}</td>
            <td>{{td.age}}</td>
            <td>{{td.birthday}}</td>
            <td>{{td.address}}</td>
          </tr>
        </tbody>
      </table>
    
    `,
    methods: {
        makeColumns: function () {
            this.currentColumns = this.columns.map(function (col, index) {
                //遍历表头数据库,将父级数据拷贝一份给组件数据,并且每个数据对象都额外加了两个属性
                col._sortType = "normal"; //表示排列类型
                col._index = index; //最原始的索引
                return col
            })
        },
        makeData: function () { //赋值一份数据给组件
            this.currentData = this.data.map(function (row, index) {
                row._index = index;
                return row;
            })
        },
        handleSortByAsc: function (index) {
            var key = this.currentColumns[index].key; //name,age...
            this.currentColumns.forEach(function (col) {
                col._sortType = "normal"; //将所有的表头排序类型都变成normal,如果不这样做会导致上个升序点击会保留点击后的样式
            }); //还有只能保留一个排序,不能存在多个排列方式,否则添加新数据会导致只按照第一个排序进行排列
            this.currentColumns[index]._sortType = 'asc'; //此表头排序类型变成升序
            this.currentData.sort(function (a, b) {
                return a[key] > b[key] ? 1 : -1; //按照数据的key排序
            })

        },
        handleSortByDesc: function (index) {
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(function (col) {
                col._sortType = "normal";
            });
            this.currentColumns[index]._sortType = "desc";
            this.currentData.sort(function (a, b) {
                return a[key] < b[key] ? 1 : -1;
            })
        },
        showAsc: function (index) {
            if (this.currentColumns[index]._sortType === "asc") {
                return {
                    on: true
                }
            }
        },
        showDesc: function (index) {
            if (this.currentColumns[index]._sortType === "desc") {
                return {
                    on: true
                }
            }
        }
    },
    watch: {
        data: function () {
            this.makeData();
            var sortedTh = this.currentColumns.filter(function (col) {
                return col._sortType !== "normal"
            });
            if (sortedTh.length > 0) {
                if (sortedTh[0]._sortType === "asc") {
                    this.handleSortByAsc(sortedTh[0]._index) //这行的的意思就是按照已经排序的列排序,传进去的是要排序表头的原始索引
                } else { //这里的index是0,因为只会按照一个表头排序
                    this.handleSortByDesc(sortedTh[0]._index)
                }
            }
        }
    },
    mounted() {
        this.makeColumns();
        this.makeData();
    }
})