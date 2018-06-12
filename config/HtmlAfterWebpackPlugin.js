/**
 * Created by levy on 2018/6/7.
 */
const pluginName = 'HtmlAfterWebpackPlugin';

const assetsHelp = (data)=>{
    let css = [], js = [];
    const dir = {
        js: item=>`<script src="${item}"></script>`,
        css:item=>`<link rel="stylesheet" href="${item}">`
    };

    for(let jsItem of data.js){
        js.push(dir.js(jsItem))
    }
    for(let cssItem of data.css){
        css.push(dir.css(cssItem))
    }
    return {
        css,
        js
    }
};

class HtmlAfterWebpackPlugin{
    apply(compiler){
        compiler.hooks.compilation.tap(pluginName, compilation=>{
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(pluginName, htmlPluginData=>{
                console.log(htmlPluginData);
                let _html = htmlPluginData.html;
                const result = assetsHelp(htmlPluginData.assets);

                _html = _html.replace("<!--injectcss-->", result.css.join(""));
                _html = _html.replace("<!--injectjs-->", result.js.join(""));

                htmlPluginData.html = _html;

            })
        })
    }
}

module.exports = HtmlAfterWebpackPlugin;