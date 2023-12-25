import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
Window.Pusher=Pusher
const echo = new Echo({
    broadcaster: 'pusher',
    key: '2e6c900963af19ec80cf',
    cluster: 'eu',
    encrypted: true,
});

export default echo;
