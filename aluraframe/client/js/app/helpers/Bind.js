class Bind {

    constructor(model, view, ...props) {
        return ProxyFactory.create(
            model,
            props,
            model => view.update(model)
        );
    }
}