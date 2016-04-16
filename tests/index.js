import React from 'react'
import { shallow, mount } from 'enzyme'
import { spy, stub } from 'sinon'
import { expect } from 'chai'
import ContainerDimensions from '../src/index'

const MyComponent = ({ width, height }) => <span>{width}, {height}</span>

describe('react-container-dimensions', () => {

    it('should throw without children', () => {
        expect(() => mount(<div><ContainerDimensions /></div>))
            .to.throw('Expected children to be one of function or React.Element')
    })

    it.skip('should throw without the parent element', () => {
        spy(ContainerDimensions.prototype, 'componentDidMount')
        mount(
            <ContainerDimensions>
                <span>test</span>
            </ContainerDimensions>
        )
        expect(ContainerDimensions.prototype.componentDidMount)
            .to.throw('ContainerDimensions can not be mounted as a root node')
        ContainerDimensions.prototype.componentDidMount.restore()
    })

    it('calls componentDidMount', () => {
        spy(ContainerDimensions.prototype, 'componentDidMount')
        spy(ContainerDimensions.prototype, 'componentWillUnmount')
        const wrapper = mount(
            <div>
                <ContainerDimensions>
                    <MyComponent />
                </ContainerDimensions>
            </div>
        )
        wrapper.unmount()
        expect(ContainerDimensions.prototype.componentDidMount.calledOnce).to.be.true
        expect(ContainerDimensions.prototype.componentWillUnmount.calledOnce).to.be.true
        ContainerDimensions.prototype.componentDidMount.restore()
        ContainerDimensions.prototype.componentWillUnmount.restore()
    })

    it('calls onResize on mount', () => {
        spy(ContainerDimensions.prototype, 'onResize')
        mount(
            <div>
                <ContainerDimensions>
                    <MyComponent />
                </ContainerDimensions>
            </div>
        )
        expect(ContainerDimensions.prototype.onResize.calledOnce).to.be.true
    })

    it('should pass width and height as props to children', () => {
        const wrapper = mount(
            <div style={{ width: 100, height: 200 }}>
                <ContainerDimensions>
                    <MyComponent />
                </ContainerDimensions>
            </div>
        )
        expect(wrapper.find(MyComponent)).to.have.length(1)
        expect(wrapper.find(MyComponent)).to.have.prop('width', 0)
        expect(wrapper.find(MyComponent)).to.have.prop('height', 0)
    })

    it('should pass width and height as props to children', () => {
        const wrapper = mount(
            <div style={{ width: 100, height: 200 }}>
                <ContainerDimensions>
                    { ({ width, height }) => <MyComponent width={width + 10}
                                                          height={height + 10}/> }
                </ContainerDimensions>
            </div>
        )
        expect(wrapper.find(MyComponent)).to.have.length(1)
        expect(wrapper.find(MyComponent)).to.have.prop('width', 10)
        expect(wrapper.find(MyComponent)).to.have.prop('height', 10)
    })

    it('should work with SVG elements', () => {
        const wrapper = mount(
            <g>
                <ContainerDimensions>
                    <rect/>
                </ContainerDimensions>
            </g>
        )
        expect(wrapper.find('rect')).to.have.length(1)
        expect(wrapper.find('rect')).to.have.prop('width', 0)
        expect(wrapper.find('rect')).to.have.prop('height', 0)
    })

    it('should pass width and height as props to children', () => {
        const wrapper = mount(
            <g style={{ width: 100, height: 200 }}>
                <ContainerDimensions>
                    { ({ width, height }) => <rect width={width} height={height}/> }
                </ContainerDimensions>
            </g>
        )
        expect(wrapper.find('rect')).to.have.length(1)
        expect(wrapper.find('rect')).to.have.prop('width', 0)
        expect(wrapper.find('rect')).to.have.prop('height', 0)
    })

    it('should not create an element', () => {
        const wrapper = shallow(
            <h1>
                <ContainerDimensions>
                    <span>Test</span>
                </ContainerDimensions>
            </h1>
        )
        expect(wrapper.html()).to.eql('<h1><span width="0" height="0">Test</span></h1>')
    })
})
