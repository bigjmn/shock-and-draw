import Canvas from '../../components/Canvas/Canvas.js'
import RecCanvas from '../../components/RecCanvas/RecCanvas.js'

const CanvasRoom = ({isDrawing, word}) => {
  return (
    <div style={{width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column'}}>
      {isDrawing ? <Canvas word={word}/> : <RecCanvas word={word}/>}
    </div>
  )
}
export default CanvasRoom
