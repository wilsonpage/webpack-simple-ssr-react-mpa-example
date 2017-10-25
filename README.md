### Webpack Simple Server-Side (SSR) Rendered React Multi-Page App (MPA) Example

> A minimal example of an app that renders React components on the server and 'inflates' (becomes interactive) on the client.

#### Motivation

There are many examples of single page applications (SPA), but for many projects a SPA is overkill, leading to unnecessary work and complexity. We still want rich experiences, but don't care so much about client-side routing.

This project is by no means finished. I hope for others to contribute so that it can improve over time and become an example to others entering what has become a very complex development environment.

#### Requirements

- [x] It must dynamically compile a bundle per page
- [x] It must create a 'commons' chunk with shared dependencies (eg. `(p)react`)
- [x] It must extract CSS into a separate `.css` per page file.
- [x] Each bundle must be able to indicate critical CSS modules that should be inlined
- [ ] Remove critical CSS from each page's CSS bundle
- [x] Our server needs to be able to know the hashed filenames so they can be rendered/loaded into the document
- [x] Page components can provide `<head>` content
- [x] Each page component has a dedicated node bundle for SSR
- [ ] Add a site-global app manifest using [webpack-app-manifest-loader](https://github.com/markdalgleish/web-app-manifest-loader)
- [ ] Include example of dynamic (lazy) imported modules

#### Webpack Dev server

[Webpack-Dev-Server](https://github.com/webpack/webpack-dev-server) has been purposefully omitted to keep the development environment as close to production as possible.
