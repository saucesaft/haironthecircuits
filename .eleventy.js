const { execSync } = require("child_process");
const inspect = require("util").inspect;

module.exports = function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget('./src/css/tailwind.css');
  eleventyConfig.addPassthroughCopy('./src/img');
  eleventyConfig.addPassthroughCopy('./src/fonts');

  eleventyConfig.addFilter("debug", (content) => `<pre>${inspect(content)}</pre>`);

  return {
    passthroughFileCopy: true,
    dir: {
      data: '_data',
      input: 'src',
      output: 'public'
    }
  }
}
