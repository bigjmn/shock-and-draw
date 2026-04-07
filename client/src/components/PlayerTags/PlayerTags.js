import classes from './PlayerTags.module.css'

const PlayerTags = ({teamTags, oppTags, teamColor, oppColor}) => {
  return (
    <div className={classes.playerTagWrapper}>
      <div className={classes.tagListWrapper}>
        <p className={classes.teamHeading}>MY TEAM</p>
        {teamTags.map((tag, i) => (
          <div key={i} className={classes.tagStyle} style={{backgroundColor: teamColor}}>
            {tag}
          </div>
        ))}
      </div>
      <div className={classes.tagListWrapper}>
        <p className={classes.teamHeading}>OPPONENTS</p>
        {oppTags.map((tag, i) => (
          <div key={i} className={classes.tagStyle} style={{backgroundColor: oppColor}}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlayerTags
