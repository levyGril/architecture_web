import Rize from 'rize';
import app from '../../src/serverI/app';

app.listen(8082,()=>{
    console.log(`koa is starting, port :8082`);
});

// 为了能让我们看到这个过程发生了什么，我们可以传递标志 headless: false 给 Rize。
const rize = new Rize({ headless: false });

rize
    .goto('https://github.com/')
    .typedef('input.header-search-input','node')
    .press('Enter')
    .waitForNavigation()
    .assertSee('Node.js')
    .saveScreenshot('searching-node.png')
    .end() //别忘了调用 `end` 方法来退出浏览器！