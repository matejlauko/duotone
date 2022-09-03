import {
  Slider as SliderPrimitive,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react'

export const Slider = () => {
  return (
    <SliderPrimitive aria-label="slider-ex-1" defaultValue={30}>
      <SliderTrack bg="red.200">
        <SliderFilledTrack bg="tomato" />
      </SliderTrack>
      <SliderThumb />
    </SliderPrimitive>
  )
}

export default Slider
