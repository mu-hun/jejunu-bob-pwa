import React from 'react'
import styled from 'styled-components'

import { ReactComponent as WeekendIcon } from '../SVG/npVacation.svg'
import { ReactComponent as ClockIcon } from '../SVG/tenOclock.svg'
import { ReactComponent as NetworkIcon } from '../SVG/networkDisable.svg'

export const Div = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Label = styled.label`
  font-size: 2em;
`

export const Weekend = () => (
  <Div>
    <WeekendIcon width="15em" />
    <Label>주말</Label>
  </Div>
)

export const Waiting = () => (
  <Div>
    <ClockIcon width="15em" />
    <Label>아직 새로운 식단을 보여줄 준비가 안되어 있어요!</Label>
  </Div>
)

export const NoInternet = () => (
  <Div>
    <NetworkIcon width="15em" />
    <Label>인터넷 연결이 필요합니다.</Label>
  </Div>
)
