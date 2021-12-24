import {useState, useEffect} from 'react'
import classes from './PlayerTags.module.css'

const PlayerTags = ({teamTags, oppTags, teamColor, oppColor}) => {

  return (
    <div className={classes.playerTagWrapper}>
      <div className={classes.tagListWrapper}>
        <h3>My Team</h3>
        {teamTags.map((tag, i) => (
          <div key={i} className={classes.tagStyle} style={{backgroundColor:teamColor}}>
            {tag}
          </div>
        ))}
      </div>
      <div className={classes.tagListWrapper}>
        <h3>Opponents</h3>
        {oppTags.map((tag, i) => (
          <div key={i} className={classes.tagStyle} style={{backgroundColor:oppColor}}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlayerTags
