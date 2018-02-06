> 知乎上推荐的一个vue小练习：[通讯录 mail_list](https://github.com/windlany/mail_list)

> #### Day 1 2018.1.22 (🍅x4)

- 读了下 [vue-cli项目结构详解](http://blog.csdn.net/tanzhenyan/article/details/78871610)，学习 vue-cli 生成的项目结构。

> #### Day 2 2018.1.23 (🍅x4)

#### 1. 从加入app.vue组件开始

- 在vue组件中，在style标签上添加scoped属性，以表示它的样式作用于当下的模块，实现了样式私有化。
- router引入组件应用了**懒加载**
- 疑问：为什么图片放在 ./static中，css文件放在 ./src/assets/css 中？
    > 答：[assets 和 static 的区别](https://segmentfault.com/q/1010000009842688)  
    PS：按上文中的说法，感觉本demo组织静态资源的方式也不太科学。
- 疑问：./components/app.vue 组件中，html, body 样式不生效？
    > 答：观察发现，原demo中 app.css 里写的html, body样式也没生效，只是他在./index.html中添加了嵌入样式。
- **疑问：那么vue项目中 base.css 究竟应该写在哪里，在哪引入呢？**  
    > 答：看到另一个案例，把初始化样式写在最顶层的App.vue内的<style></style>中了，感觉比较合理。

> #### Day 3 2018.1.27 (🍅x4)

#### 2. 添加注册功能

- 本demo中应用的icon都来自font-awesome.min.css，也是在./index.html引入。
- `<span v-if="req" v-show="result">注册成功</span>` 这里v-if，v-show混合使用总觉得不太合理。
- [vuex中为什么把把异步操作封装在action，把同步操作放在mutations？](https://www.zhihu.com/question/48759748/answer/112823337?from=profile_answer_card)
- sessionStorage.register = 1 给sessionStorage绑定一个register变量用于判断是否注册成功。
- 查找用户是否重复：通过遍历localstorage，感觉可以改用indexDB优化.
- **localstorage只能存字符串**，所以存JSON对象前要JSON.stringify转换，取出时要JSON.parse解析。
- Vue.use() 用于调用插件，vue-router、vuex 都是用该方法调用。
- [Javascript Array forEach()中无法return和break，代替方法some()与every()](http://blog.csdn.net/lihefei_coder/article/details/76736296)
- [git add ./-u/-A区别](https://www.cnblogs.com/skura23/p/5859243.html)

> #### Day 4 2018.1.28 (🍅x4)

#### 3. 添加登录功能

- **疑问：登录后的路由跳转，本例使用`this.$router.replace()`，可是历史记录也增加了一个，依旧可以回退，那与`push()`方法的区别在哪？**  
    > 仔细观看chrome的历史记录，没看出2者区别

- 疑问：发现第一次登录不进去，跳转回concat首页，，像是刷新了一下，第二次才能进入。
    > 答：经排查发现源代码中使用的登录和注册按钮是`<button>`标签，在firefox，chrome等浏览器下会默认提交表单，导致页面刷新，无法手动跳转，应给其加上`type="button"`（或使用vue的事件修饰符`.prevent`）取消默认行为。

> #### Day 5 2018.1.31 (🍅x1)

- 目前的调试手段，可以在vue组件中需要调试的位置加上`debugger`，然后运行时会自动断点调试。[VueJS项目调试](http://www.orzzone.com/vuejs-project-debug.html)

> #### Day 6 2018.2.5 (🍅x5)

#### 4. 跳转至通讯录

- 默认情况下，模块内部的 action、mutation 和 getter 是注册在**全局命名空间**的，所以 mailList.vue 可以直接map contact模块的action。
- Storage推荐使用setItem，可以动态存储，而不是直接用`.`绑定，但这个demo中各种混用。
- `beforeCreate() {   this.$store.dispatch('userInit'); }` 这里由于是在组件实例化以前，所以直接使用dispatch，没用mapActions。

#### 5. 添加notes

- note中每个联系人抽象出子组件：noteItem，内部方法名有大写的（如SAVE，RETURN），不知为啥这样。
- 对联系人的操作是从子组件层层向上传至mailList处理的，为何不直接在子组件中mapAction？
- vue-router的meta元数据，官方文档要求遍历 $route.matched，但是断点查看到**to.matched和to.meta中都保存了meta数据**，只是to.matched是个数组，按路由分别保存meta，to.meta则是对象，目测保存所有路由中的meta数据。本例直接用了to.meta（例中用于验证用户是否已登录）

> #### Day 7 2018.2.5 (🍅x5)

#### 6. 联系人增删改功能

- 例中[USER_ADD]实现有误：`localStorage.items = JSON.stringify(JSON.parse(localStorage.items).push(user))`push方法返回数组长度，最后items里只存了数组长度，数据丢失
- 疑问：查了下`state.items.push(user)`，state的改变不是异步的，我在[USER_ADD]中直接把state.items存入localStorage，不知道是否合理。
- **疑问：mutations 中还有除了改变state以外的逻辑，应该放在这里还是action里？**
    答：根据这个回答（[vuex中，业务逻辑是写在actions还是mutation中？](https://segmentfault.com/q/1010000008246239)），mutations中是不该有其他业务逻辑的，action中也尽量少吧。
- 添加联系人的验证有点糙