## Server

The server is isolated from the client, it is simply passed an interface that it can use to create a client 'renderer'. This renderer is then used within the routes to render client HTML.

The server doesn't know what Webpack, React, JSX or CSS is. It's just aware of the client apps it is able to render and does so accordingly. This separation means the server part of the app stays very simple.
