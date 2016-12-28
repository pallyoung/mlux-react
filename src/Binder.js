'use strict'
//@flow
import mlux, { equlas, isArray, isFunction } from 'mlux';

import React, { Component, PropTypes } from 'react';
var id = 1;
const PERFIX = 'BINDER_STORE_';

function getId(): string {
    id++;
    return PERFIX + id;
}

export default class Binder extends Component {
    constructor(...props: any[]) {
        super(...props);
        this.stores = this._getStoreFromProps(this.props);
        this.listener = () => {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.mounted && this.forceUpdate(), 10);
        };
        this.mounted = false;
        this.timeout;
        this.listenerTokens = {};
    }
    stores: Object;
    listener: Function;
    mounted: boolean;
    timeout: number;
    listenerTokens: Object;
    _getStoreFromProps(props: Object): Object {
        var stores = {};
        if (isArray(props.bind)) {
            props.bind.forEach(function (s) {
                stores[getId()] = s;
            });
        } else {
            stores[getId()] = props.bind;
        }
        return stores;

    }
    _bind(): void {
        var stores = this.stores;
        this.listenerTokens = {};
        for (let s in stores) {
            this.listenerTokens[s] = stores[s].addListener('change', this.listener);
        }
    }
    _unbind(): void {
        var stores = this.stores;
        for (let s in stores) {
            stores[s].removeListener(this.listenerTokens[s]);
        }
        this.listenerTokens = {}
    }

    componentWillReceiveProps(nextProps: Object): void {

    }
    componentDidMount(): void {
        this.mounted = true
        this._bind();
    }
    componentWillUnmount(): void {
        this.mounted = false;
        this._unbind();
    }
    render(){
        return this.props.render()
    }
    static propTypes = {
        bind: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        render: PropTypes.func
    }
    static render = render
    static createClass = createClass
}

function render(ReactComponent:Class<React.Component<*,*,*>>, bind: Array<Object>, getProps?: Function): React.Element<*> {
    return <Binder 
            bind={bind} 
            render={() => {
                var props;
                if (getProps&&isFunction(getProps)) {
                    props = getProps() || {}
                }
                return <ReactComponent {...props } />}} />
}
function cloneElement(element: React.Element<*>, bind: Array<Object>, getProps?: Function): React.Element<*> {
    return <Binder 
            bind={bind} 
            render={() => {
                var props;
                if (getProps&&isFunction(getProps)) {
                    props = getProps() || {}
                }
                return React.cloneElement(element,props)}} />
}

function createClass(ReactComponent:Class<React.Component<*,*,*>>):Class<*> {
    return React.createClass({
        propTypes : {
            bind: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
            getProps: PropTypes.func
        },
        getDefaultProps : function () {
            return {
                bind: []
            }
        },
        render : function () {
            var bind = this.props.bind;
            var getProps = this.props.getProps;
            return <Binder
                bind={bind}
                render={() => {
                    var props;
                    if (getProps && isFunction(getProps)) {
                        props = getProps () || {}
                    }
                    return <ReactComponent {...props} />
                } } />
        }
    })
}

