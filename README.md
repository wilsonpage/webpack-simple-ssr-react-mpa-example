The example must fulfil the following requirements:

- [x] It must dynamically compile a bundle per page
- [x] It must create a 'commons' chunk with shared dependencies (eg. `react`)
- [ ] It must extract CSS into a separate `.css` file.
- [ ] Each bundle must be able to indicate critical CSS modules that should be inlined
- [x] Our server needs to be able to know the hashed filenames so they can be rendered/loaded into the document
- [ ] Page components can provide `<head>` content
- [x] Each page component has a dedicated node bundle for SSR
