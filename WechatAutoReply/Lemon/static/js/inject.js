console.log("监听所有input输入框")
// 获取所有输入框节点
let inputs = document.querySelectorAll("input");
// 遍历所有input节点
[].forEach.call(inputs, (input) => {
    input.addEventListener("input", (e) => {
        // 打印输入的值
        console.log(e.target.value)
        // console.log(e.data)
    })
});