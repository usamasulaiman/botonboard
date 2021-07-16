import React from 'react'

export default function HighlightedText({ children }) {
  return (
    <strong style={{color: 'tomato', textTransform: 'capitalize'}}>{children}</strong>
  )
}
