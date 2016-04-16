import React, { Component, PropTypes, Children } from 'react'
import ReactDOM from 'react-dom'
import elementResizeDetectorMaker from 'element-resize-detector'
import invariant from 'invariant'

export default class ContainerDimensions extends Component {

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
    }

    constructor(props, context) {
        super(props, context)
        this.state = {
            width: 0,
            height: 0
        }
        this.onResize = this.onResize.bind(this)
        this.findParentNode = this.findParentNode.bind(this)
    }

    componentDidMount() {
        const parentNode = this.findParentNode()
        invariant(parentNode, 'ContainerDimensions can not be mounted as a root node')
        this.elementResizeDetector = elementResizeDetectorMaker({ strategy: 'scroll' })
        this.elementResizeDetector.listenTo(parentNode, this.onResize)
        this.onResize()
    }

    componentWillUnmount() {
        this.elementResizeDetector.removeListener(
            ReactDOM.findDOMNode(this).parentNode, this.onResize
        )
    }

    onResize() {
        const container = this.findParentNode()
        const clientRect = container.getBoundingClientRect()
        this.setState({
            width: clientRect.width,
            height: clientRect.height
        })
    }

    findParentNode() {
        return ReactDOM.findDOMNode(this).parentNode
    }

    render() {
        invariant(this.props.children, 'Expected children to be one of function or React.Element')

        if (typeof this.props.children === 'function') {
            const renderedChildren = this.props.children(this.state)
            return renderedChildren && Children.only(renderedChildren)
        }
        return Children.only(React.cloneElement(this.props.children, this.state))
    }
}
