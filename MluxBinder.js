
'use strict'
import TypeDetector from 'js-type-detector';

var id = 1;
const PERFIX = 'BINDER_STORE_';

function getId() {
    id++;
    return PERFIX + id;
}
function assign(dst, src) {
    for (var o in src) {
        dst[o] = src[o];
    }
    return dst;
}
function StorePublisher() {
    this.stores = {}
    this.listener;
    this._receviers = {

    };
}

StorePublisher.prototype = {
    constructor: StorePublisher,
    setStores: function (stores) {
        if (!stores) {
            return;
        }
        this.release();
        if (TypeDetector.isArray(stores)) {
            stores.forEach((store) => {
                this._receviers[store.getStoreName()] = store.addListener('change', () => {
                    this.publish();
                })
            })
        }
    },
    setListener: function (listener) {
        this.listener = listener;
    },
    release: function () {
        for (var key in this._receviers) {
            this._receviers[key].remove();
        }
    },
    publish: function () {
        if (TypeDetector.isFunction(this.listener)) {
            this.listener();
        }
    }
}


function fackContextCreator(realContext) {
    function FakeContext() {
        this.props = assign({}, realContext.props);
    };
    FakeContext.prototype = realContext;
    return new FakeContext();
}

function createClass(ReactComponent) {
    function BinderComponent(props, context) {
        ReactComponent.call(this, props, context);
        this._storePublisher = new StorePublisher(this);
        this._storePublisher.setStores(props.bind);
        this._storePublisher.setListener(() => {
            this.forceUpdate()
        });
        this._isMounted = false;
        this._fakeContext = fackContextCreator(this);
        this._setPropsToFakeContext = function (props) {
            if (props.propsUpdater) {
                assign(this._fakeContext.props, props);
                assign(this._fakeContext.props, props.propsUpdater());
            }
        }
        this.shouldComponentUpdate = function (nextProps, nextState) {
            return true;
        }
        this.componentWillReceiveProps =function (nextProps) {
            this._storePublisher.setStores(nextProps.bind);
            BinderComponent.prototype.componentWillReceiveProps && BinderComponent.prototype.componentWillReceiveProps.call(this._fakeContext);
        }
        this.componentWillUpdate=function(nextProps, nextState) {
            this._setPropsToFakeContext(nextProps);
            BinderComponent.prototype.componentWillUpdate && BinderComponent.prototype.componentWillUpdate.call(this._fakeContext, nextProps, nextState);
        }

        this.componentDidMount=function() {
            this._isMounted = true;
            BinderComponent.prototype.componentDidMount && BinderComponent.prototype.componentDidMount.call(this._fakeContext);
        }
        this.componentWillUnmount=function() {
            this._isMounted = false;
            this._storePublisher.release();
            BinderComponent.prototype.componentWillUnmount && BinderComponent.prototype.componentWillUnmount.call(this._fakeContext);
        }
        this.render = function() {
            return BinderComponent.prototype.render.call(this._fakeContext);
        }

    }
    BinderComponent.prototype = new ReactComponent({});
    BinderComponent.prototype.constructor = BinderComponent;
    return BinderComponent;
   
}
export default {
    createClass
}
