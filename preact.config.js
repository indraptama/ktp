export default function (config, env, helpers) {
    const BASE_URL = env.production ? '/ktp/' : ''
    config.output.publicPath = BASE_URL
}
