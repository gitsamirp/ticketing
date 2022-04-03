import 'bootstrap/dist/css/bootstrap.css';

export default ({ Component, pageProps }) => {
    return <Component { ...pageProps } /> // define our own custom app component, allows import of global css in nextjs
}
