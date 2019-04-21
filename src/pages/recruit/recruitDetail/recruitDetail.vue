<template>
  <div>
    <wxParse :content="article" :loading="isRecruitLoading"/>
  </div>
</template>

<script>
  import wxParse from 'mpvue-wxparse'
  import marked from 'marked'
  export default {
    components: {
      wxParse
    },
    data () {
      return {
        isRecruitLoading: true,
        markdown_test: '## 第 1 课 —— 数组与内存控制\n' +
          '\n' +
          '### 数组初始化\n' +
          '\n' +
          '数组初始化之后，该数组的长度是不可变的（可通过数组的 length 属性访问数组的长度）。Java 中的数组必须经过初始化（为数组对象的元素分配内存空间，并为每个数组元素指定初始值）才可使用。\n' +
          '\n' +
          '数组初始化的形式：\n' +
          '\n' +
          '+ 静态初始化：初始化时由程序员显示的指定每个数组的初始值，系统决定数组长度。\n' +
          '+ 动态初始化：初始化时程序员只指定数组的长度，系统为数组元素分配初始值。\n' +
          '\n' +
          '<!-- more -->\n' +
          '### 使用数组\n' +
          '\n' +
          '数组元素就是变量：例如 int[] 数组元素相当于 int 类型的变量\n' +
          '\n' +
          '当通过索引来使用数组元素时（访问数组元素的值、为数组元素赋值），将该数组元素当成普通变量使用即可。\n' +
          '\n' +
          '\n' +
          '\n' +
          '## 第 2 课 —— 对象与内存的控制\n' +
          '\n' +
          'Java 内存管理分为：内存分配和内存回收。\n' +
          '\n' +
          '> + 内存分配：创建 Java 对象时 JVM 为该对象在堆内存中所分配的内存空间。\n' +
          '> + 内存回收：当 Java 对象失去引用，变成垃圾，JVM 的垃圾回收机制自动清理该对象，并回收内存\n' +
          '\n' +
          '### 实例变量 和 类变量\n' +
          '\n' +
          '#### 局部变量\n' +
          '\n' +
          '特点：作用时间短，存储在方法的栈内存中\n' +
          '\n' +
          '种类：\n' +
          '\n' +
          '+ 形参：方法签名中定义的局部变量，由方法调用者负责为其赋值，随方法结束而消亡\n' +
          '+ 方法内的局部变量：方法内定义的局部变量，必须在方法内对其进行显示初始化，从初始化后开始生效，随方法结束而消亡\n' +
          '+ 代码块内的局部变量：在代码块中定义的局部变量，必须在代码块中进行显示初始化，从初始化后开始生效，随代码块结束而消亡\n' +
          '\n' +
          '#### 成员变量\n' +
          '\n' +
          '类体内定义的变量，如果该成员变量没有使用 static 修饰，那该成员变量又被称为非静态变量或实例变量，如果使用 static 修饰，则该成员变量又可被称为静态变量或类变量。\n' +
          '\n' +
          '#### 实例变量和类变量的属性\n' +
          '\n' +
          '使用 static 修饰的成员变量是类变量，属于该类本身，没有使用 static 修饰的成员变量是实例变量，属于该类的实例，在同一个类中，每一个类只对应一个 Class 对象，但每个类可以创建多个对象。\n' +
          '\n' +
          '由于同一个 JVM 内的每个类只对应一个 CLass 对象，因此同一个 JVM 内的一个类的类变量只需要一块内存空间；但对于实例变量而言，该类每创建一次实例，就需要为该实例变量分配一块内存空间。也就是说，程序中创建了几个实例，实例变量就需要几块内存空间。\n' +
          '\n' +
          '这里我想到一道面试题目：',
        article: ''
      }
    },
    mounted () {
      this.article = marked(this.markdown_test)
      this.isRecruitLoading = false
    },
    methods: {
      getRecruitContent () {
        const this_ = this
        const requestUrl = '/article/Java-16-lession'
        const params = {
        }
        this_.$http.get(requestUrl, params).then(function (res) {
          this_.article = res.data.data
        })
      }
    }
  }
</script>

<style>
  @import url("~mpvue-wxparse/src/wxParse.css");
</style>
