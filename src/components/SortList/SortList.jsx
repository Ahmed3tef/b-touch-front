import React from 'react'
import { sortList } from '../../util/sortList'
import Selector from '../Inputs/Selector'

const SortList = (props) => {
  return (
    <Selector data={sortList} id={props.id} setId={props.setId} placeholder='Sort By' width='25rem' />
  )
}

export default SortList