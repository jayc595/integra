import React from 'react'


interface CanvasLayoutProps {
    children: React.ReactNode;
}

const CanvasLayout = ({
    children,
}: CanvasLayoutProps) => {
  return (
    <div>{children}</div>
  )
}

export default CanvasLayout