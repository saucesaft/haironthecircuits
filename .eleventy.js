// debugging
const inspect = require("util").inspect;

// date formatting
const { DateTime } = require("luxon");

// transofrming tikz code to svg
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const tmp = require('tmp');
var fs = require('fs');
const { spawnSync } = require('child_process');

// obsidian image url's
const markdownIt = require('markdown-it');
const markdownItOptions = {
    html: true,
    linkify: true
};


module.exports = function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget('src/css/tailwind.css');
  eleventyConfig.addPassthroughCopy('src/work/cv.pdf');
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy({'src/**/img/*': "img" })

  // custom markdown-it instance
  const md = markdownIt(markdownItOptions)
    .use(require('markdown-it-attrs'));

  // inline code syntax highlighting
  md.renderer.rules.code_inline = (tokens, idx, { langPrefix = '' }) => {
    const token = tokens[idx];
    return `<code class="${langPrefix}">${token.content}</code>`;
  };

  eleventyConfig.addFilter("debug", (content) => `<pre>${inspect(content)}</pre>`);
  
  eleventyConfig.addFilter("types", (content) => `${typeof(content)}`);

  eleventyConfig.addFilter("readablePostDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
        zone: "America/Monterrey",
    }).setLocale('en').toLocaleString(DateTime.DATE_FULL).toLowerCase();
  });

  // filter to adapt obsidian's image url's into eleventy compatible ones
  eleventyConfig.addFilter("wikimage", string => {
    string = string.replaceAll(/!\[\[(?!.+?:)([^\]\[]+)\]\]/gm, function(s) {
      const parts = s.slice(3,-2).split("|");

      return md.renderInline(`![${parts[1]}](/img/${parts[0].trim()})`)
    })
    return string
  })

  // eleventy custom transform to render tikz code section as svgs using
  // locally installed latex installation and dvisvgm
  eleventyConfig.addTransform("tikzRenderer", function(content, outputPath) {

    if (!(outputPath && outputPath.endsWith(".html"))) {
      return content;
    }

    // create a virtual dom we can modify
    const dom = new JSDOM( content );

    // find all elemenets we need to find (tikz)
    let elements = dom.window.document.querySelectorAll('code.language-tikz');
    // let replacers = dom.window.document.querySelectorAll('pre code.language-tikz');

    // if there are no tikz processing needed to be done on this file, we return
    if (elements.length == 0) {
      return content;
    }

    for (let i = 0; i < elements.length; i++) {

      let tikz = elements[i].textContent;
      tikz = "\\documentclass[tikz]{standalone}" + tikz;

      // create a temporary folder
      // and delete it and its contents when done
      const tmpFolder = tmp.dirSync({
        unsafeCleanup: true,
      });

      // the latex file inside of the temp folder
      let latexFile = tmpFolder.name + '/source.tex';

      // create the file and write it the contents
      fs.writeFileSync(latexFile, tikz, 'utf-8');

      // run the latex cli on the filex we create, to get the dvi file
      const latexCmd = spawnSync('latex', ['-output-directory='+tmpFolder.name, latexFile]);

      // check errors
      if (latexCmd.error != undefined || String(latexCmd.stderr) != "") {
        console.log('error', latexCmd.error);
        console.log('stderr ', String(latexCmd.stderr));

        tmpFolder.removeCallback();

        return content
      }

      // the dvi file inside of the temp folder
      let dviFile = tmpFolder.name + '/source.dvi';

      // run dvisgm to convert the dvi file to an svg
      const dviCmd = spawnSync('dvisvgm', ['--stdout', dviFile]);

      // check errors
      if (dviCmd.error != undefined) {
        console.log('error', dviCmd.error);
        console.log('stderr ', String(dviCmd.stderr));
        
        tmpFolder.removeCallback();

        return content
      }

      // get the actual svg from the cmd
      const svg = new jsdom.JSDOM(String(dviCmd.stdout));

      // replace the contents of pre with the svg

      // svg.window.document.body.children[0].style.width = "80%";
      // svg.window.document.body.children[0].style.height = "80%";

      let replacer = elements[i].parentElement;

      let svgElement = svg.window.document.body.children[0];
    
      let svgStr = svgElement.outerHTML;

      svgStr = svgStr.replaceAll(/("#000"|"black")/g, `"currentColor"`)
		     .replaceAll(/("#fff"|"white")/g, `"currentColor"`);
    
      let newSVG = new jsdom.JSDOM(svgStr).window.document.body.children[0];

      newSVG.classList.add('fill-current');
      // newSVG.classList.add('stroke-red');

      replacer.replaceChild(newSVG, elements[i]);

      // remove the class so that it doesn't get weirdly syntax highlighted
      replacer.classList.remove('language-tikz');

      // remove the temporary folder
      tmpFolder.removeCallback();
    }

    // return the dom we modified as an string
    return dom.serialize();

  });

  eleventyConfig.setLibrary('md', md);

  return {
    passthroughFileCopy: true,
    dir: {
      data: '_data',
      input: 'src',
      output: 'public'
    }
  }
}
