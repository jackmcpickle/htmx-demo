import {join} from 'node:path';
import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyViews from '@fastify/view';
import fastifyForm from '@fastify/formbody';
import { getIndex, getContactList, ContactList } from './views/index';

const app = fastify({ logger: true });

const name = 'HTMX Demo';

let list: ContactList[] = [
    { name: 'John Doe', email: 'John@email.com' },
    { name: 'Jane Doe', email: 'jane@email.com' }
];

app.register(fastifyViews, {
    engine: {
        handlebars: require('handlebars'),
    },
    options: {
        filename: join(__dirname, 'views'),
    },
    defaultContext: {
        name: name,
        dev: process.env.NODE_ENV === 'development',
    },
});
app.register(fastifyForm);

app.register(fastifyStatic, {
    root: join(__dirname, 'public'),
    prefix: '/', // optional: default '/'
});

app.get('/', async (request, reply) => {
    reply.type('text/html').code(200);
    return getIndex({ name, list });
});

app.post('/contacts', async (request, reply) => {
    console.log(request.body);
    list.push(request.body);
    reply.type('text/html').code(200);
    return getIndex({ name, list });
});


// Starting the server
const start = async () => {
    try {
        await app.listen({ port: 3000 });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
