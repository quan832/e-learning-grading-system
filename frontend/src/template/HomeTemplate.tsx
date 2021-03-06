import LeftMenu from "@/components/LeftMenu/LeftMenu"
import Navbar from "@/components/Navbar/Navbar"
import React from "react"
import { Route } from "react-router"
import { LayoutStyled } from "./HomeTemplate.styled"

export default function HomeTemplate(props) {
  // es6
  let { Component, ...restRoute } = props

  return (
    <Route
      {...restRoute}
      render={propsRoute => {
        return (
          <LayoutStyled className="site-layout">
            {/* LeftMenu */}
            <LeftMenu />
            <LayoutStyled className="site-layout">
              <Navbar />
              <Component {...propsRoute} />
            </LayoutStyled>
          </LayoutStyled>
        )
      }}
    />
  )
}
