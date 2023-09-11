import React from 'react'

const SectionSplitter = (props) => {
  const classes = props.classes ? 'section-splitter ' + props.classes : 'section-splitter';
  return (
    <span className={classes}></span>
  )
}

export default SectionSplitter