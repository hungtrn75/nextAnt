import { LogicBlock } from './index'

export default () => {
  return (
    <LogicBlock.Consumer>
      {result => {
        return <div>search</div>
      }}
    </LogicBlock.Consumer>
  )
}
