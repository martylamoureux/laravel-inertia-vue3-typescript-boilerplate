const Ziggy = {"url":"http:\/\/laravel-inertia-vue3-typescript-boilerplate.test","port":null,"defaults":{},"routes":{"blog.index":{"uri":"blog","methods":["GET","HEAD"]},"blog.create":{"uri":"blog\/create","methods":["GET","HEAD"]},"blog.store":{"uri":"blog\/create","methods":["POST"]},"blog.show":{"uri":"blog\/{post}","methods":["GET","HEAD"],"bindings":{"post":"id"}},"blog.edit":{"uri":"blog\/{post}\/edit","methods":["GET","HEAD"],"bindings":{"post":"id"}},"blog.update":{"uri":"blog\/{post}\/edit","methods":["POST"],"bindings":{"post":"id"}},"index":{"uri":"{name?}","methods":["GET","HEAD"]}}};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    for (let name in window.Ziggy.routes) {
        Ziggy.routes[name] = window.Ziggy.routes[name];
    }
}

export { Ziggy };
