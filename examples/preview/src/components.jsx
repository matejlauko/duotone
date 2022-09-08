import React from 'react'
import cx from 'classnames'

export const Button = ({ size, color, ...restProps }) => {
  return (
    <button
      className={cx('button', {
        [size]: !!size,
        [color]: !!color,
      })}
      {...restProps}
    />
  )
}

export const Text = ({ color, size, ...restProps }) => (
  <p
    className={cx('text', {
      [color]: !!color,
      [size]: !!size,
    })}
    {...restProps}
  />
)

export const Link = ({ color, size, ...restProps }) => (
  <a
    className={cx(['text', 'link'], {
      [color]: !!color,
      [size]: !!size,
    })}
    {...restProps}
  />
)

export const TextInput = ({ size, ...restProps }) => (
  <input
    type="text"
    className={cx('textinput', {
      [size]: !!size,
    })}
    {...restProps}
  />
)
