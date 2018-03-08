# LaTeX2Vue

## installation

1. Install the library!

```sh
npm install latex2vue
```

2. Require `latex2vue`. If you are using nuxt, you should add a plugin in ``~plugins/latex2js.js`:

```js
import Vue from 'vue';
import VueLaTeX2JS from 'latex2vue';
Vue.use(VueLaTeX2JS);
```

3. Add CSS and plugin in your {\tt nuxt.config.js}:

```js
css: [
  'latex2js/lib/latex2js.css',
],
...
plugins: [
  { src: '~plugins/latex2js.js', ssr: false },
],
```

4. Now you have a `latex` component! Just set the `content` property and have a go!

```html
<latex :content="someVariable" />
```
