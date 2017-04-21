
'use strict'

var id = 1;
var PERFIX = 'BINDER_STORE_';

function isArray(source) {
    return ({}).toString.call(source) === '[object Array]';
}
function isFunction(source) {
    return ({}).toString.call(source) === '[object Function]';
}
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
        if (isArray(stores)) {
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
        if (isFunction(this.listener)) {
            this.listener();
        }
    }
}

function createClass(ReactComponent) {
    function BinderComponent(props, context) {
        ReactComponent.call(this, props, context);
        this._storePublisher = new StorePublisher(this);
        this._storePublisher.setStores(props.bind);
        var self = this;
        this._storePublisher.setListener(function(){
            if(self.props.propsUpdater){
                assign(self._nextProps,self.props.propsUpdater());
            }
            self.forceUpdate();
        });
        this._isMounted = false;
        this._nextProps = assign({}, props);
        if (props.propsUpdater) {
            assign(this._nextProps, props.propsUpdater())
        }
        this.componentWillMount = function () {
            this.props = this._nextProps;
            BinderComponent.prototype.componentWillMount && BinderComponent.prototype.componentWillMount.call(this);
        }
        this.componentWillReceiveProps = function (nextProps) {
            this._storePublisher.setStores(nextProps.bind);
            this._nextProps = assign({}, nextProps);
            if (nextProps.propsUpdater) {
                assign(this._nextProps, nextProps.propsUpdater);
            }
            BinderComponent.prototype.componentWillReceiveProps && BinderComponent.prototype.componentWillReceiveProps.call(this, this._nextProps);
        }

        this.shouldComponentUpdate = function (nextProps, nextState) {
            var shouldUpdate = true;
            if (BinderComponent.prototype.shouldComponentUpdate) {
                var result = BinderComponent.prototype.shouldComponentUpdate.call(this);
                if (result === false) {
                    shouldUpdate = false;
                }
            }
            return shouldUpdate;
        }
        
        this.componentWillUpdate = function (nextProps, nextState) {
            BinderComponent.prototype.componentWillUpdate && BinderComponent.prototype.componentWillUpdate.call(this, this._nextProps, nextState);
        }
        this.componentDidMount = function () {
            this._isMounted = true;
            BinderComponent.prototype.componentDidMount && BinderComponent.prototype.componentDidMount.call(this);
        }
        this.componentWillUnmount = function () {
            this._isMounted = false;
            this._storePublisher.release();
            BinderComponent.prototype.componentWillUnmount && BinderComponent.prototype.componentWillUnmount.call(this);
        }
        this.render = function () {
            this.props = this._nextProps;
            return BinderComponent.prototype.render.call(this);
        }

    }
    BinderComponent.prototype = new ReactComponent({});
    BinderComponent.prototype.constructor = BinderComponent;
    return BinderComponent;

}
export default {
    createClass
}
