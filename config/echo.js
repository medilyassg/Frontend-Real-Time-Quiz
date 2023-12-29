import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
Window.Pusher=Pusher
const echo = new Echo({
    broadcaster: import.meta.env.VITE_BROADCASTER,
    key: import.meta.env.VITE_KEY,
    cluster: import.meta.env.VITE_CLUSTER,
    encrypted: true,
});

export default echo;
