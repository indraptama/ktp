export default function (config, env, helpers) {
    const BASE_URL = env.production ? '/my-gh-pages-url' : ''
    config.output.publicPath = BASE_URL
}
