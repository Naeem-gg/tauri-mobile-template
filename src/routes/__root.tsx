import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className="bg-red-400 text-2xl text-white text-center">Hello "__root"!</div>
      <Outlet />
    </React.Fragment>
  )
}
