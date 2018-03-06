// 统一入口，可以在这里执行公共的代码

const page = document.documentElement.dataset.page
import(`./page/${page}.js`)
