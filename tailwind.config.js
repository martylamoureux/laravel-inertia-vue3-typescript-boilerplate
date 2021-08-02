module.exports = {
    mode: "jit",
    purge: [
        './resources/**/*.blade.php',
        './resources/**/*.{js,ts,vue}',
        './app/Domain/**/*.{js,ts,vue}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
