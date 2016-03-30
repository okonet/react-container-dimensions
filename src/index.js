import React, { Component, PropTypes, Children } from 'react'
import ReactDOM from 'react-dom'
import elementResizeDetectorMaker from 'element-resize-detector'

export default class ContainerDimensions extends Component {

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
    }

    state = {
        width: 0,
        height: 0
    }

    componentDidMount() {
        this.elementResizeDetector = elementResizeDetectorMaker({
            strategy: 'scroll'
        })
        this.onResize()
        this.elementResizeDetector.listenTo(ReactDOM.findDOMNode(this).parentNode, this.onResize)
    }

    componentWillReceiveProps() {
        this.onResize()
    }

    componentWillUnmount() {
        this.elementResizeDetector.removeListener(
            ReactDOM.findDOMNode(this).parentNode, this.onResize
        )
    }

    onResize = () => {
        const container = ReactDOM.findDOMNode(this).parentNode
        this.setState({
            width: container.offsetWidth,
            height: container.offsetHeight
        })
    }

    render() {
        if (typeof this.props.children === 'function') {
            const renderedChildren = this.props.children(this.state)
            return renderedChildren && Children.only(renderedChildren)
        }
        return Children.only(React.cloneElement(this.props.children, this.state))
    }
}
