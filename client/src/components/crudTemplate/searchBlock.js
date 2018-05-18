import { LogicBlock } from './index'

export default () => {
  return (
    <LogicBlock.Consumer>
      {result => {
        console.log(result)
        return <div>search</div>
      }}
    </LogicBlock.Consumer>
  )
}
