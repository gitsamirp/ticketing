import axios from "axios";

const buildClient = ({ req }) => {
    if (typeof window === 'undefined') {
        // on the server

        return axios.create({
            baseURL: 'http://ingress-nginx.ingress-nginx.svc.cluster.local',
            headers: req.headers,
        });
    }

    // browser
    return axios.create({
        baseURL: '/',
    })
}

export default buildClient;