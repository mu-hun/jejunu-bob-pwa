import React from 'react'

import SkeletonOrigin from '@material-ui/lab/Skeleton'
import { Wrapper } from './MUI'

interface SkeletonProps {
  height?: string
  marginBottom?: string
  flex: string
}

const Skeleton = (props: SkeletonProps) => (
  <SkeletonOrigin
    variant="rect"
    width="100%"
    animation="wave"
    height={props.height}
    style={{ marginBottom: props.marginBottom, flex: props.flex }}
  />
)

export default function Skeletons() {
  return (
    <Wrapper>
      <Skeleton height="64px" marginBottom="8.4px" flex="0 0 auto" />
      <Skeleton height="64px" marginBottom="8.4px" flex="0 0 auto" />
      <Skeleton marginBottom="8.4px" flex="1 0 auto" />
      <Skeleton height="64px" flex="0 0 auto" />
    </Wrapper>
  )
}
