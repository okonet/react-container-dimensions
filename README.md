# react-container-dimensions
Wrapper component that detects parent (container) element resize and passes new dimensions down the 
tree. Based on [element-resize-detector]
(https://github.com/wnr/element-resize-detector)

`npm install --save react-container-dimensions`

It is especially useful when you create components with dimensions that change over 
time and you want to explicitely pass the container dimensions to the children. For example, SVG 
visualization needs to be updated in order to fit into container.

## How is it different from ...

*It does not create a new element in the DOM but relies on the `parentNode` which must be present.* 
This means it doesn't require its own CSS to do the job and leaves it up to you. So, basically, 
it acts as a middleware to pass _your_ styled component dimensions to your children components.

## Usage

1. Wrap your existing components. Children component will recieve `width` and `height` as props.

```jsx
<ContainerDimensions>
    <MyComponent/>
</ContainerDimensions>    
```

2. Use a function to pass width or height explicitely or do some calculation. Function callback will be called with an object `{ width: number, height: number }` as an argument.

```jsx
<ContainerDimensions>
    { ({ height }) => <MyComponent height={height}/> }
</ContainerDimensions>    
```

## Other similar projects:

* https://github.com/maslianok/react-resize-detector
* https://github.com/Xananax/react-size
* https://github.com/joeybaker/react-element-query

and a few others...
