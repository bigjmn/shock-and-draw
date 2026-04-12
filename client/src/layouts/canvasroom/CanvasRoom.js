import Canvas from '../../components/Canvas/Canvas.js'
import RecCanvas from '../../components/RecCanvas/RecCanvas.js'

const CanvasRoom = ({isDrawing, word, savedStrokes}) => {
  return (
    <div style={{width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column'}}>
      {isDrawing ? <Canvas word={word} savedStrokes={savedStrokes}/> : <RecCanvas word={word} savedStrokes={savedStrokes}/>}
    </div>
  )
}
export default CanvasRoom
