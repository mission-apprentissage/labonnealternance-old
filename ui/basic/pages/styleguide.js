import React from 'react'
import Navigation from '../components/navigation'
import { useSelector } from 'react-redux'

const Styleguide = () => {
  const routerState = useSelector(state => state.router)
  return (
  <div class="c-styleguide">
    <Navigation />
    <h1>Styleguide</h1>
    
    <div class="container mt-5">
      <h1 class="text-center">Styleguide</h1>

      <p class="lead text-center">Here are all the assets of your app</p>

      <h2 class="fw-bold mt-4 pt-4">Colors</h2>
      <hr/>
      <div class="lead bg-primary text-white">&nbsp;primary color</div>
      <div class="lead bg-success text-white">&nbsp;success color</div>
      <div class="lead bg-danger text-white">&nbsp;danger color</div>
      <div class="lead bg-info text-white">&nbsp;info color</div>
      <div class="lead bg-warning text-white">&nbsp;warning color</div>
      <div class="lead bg-dark text-white">&nbsp;dark color</div>
      <div class="lead bg-light text-black">&nbsp;light color</div>

      <h2 class="fw-bold mt-4 pt-4">Displays</h2>
      <hr/>
      <div class="display-1">This is display 1</div>
      <div class="display-2">This is display 2</div>
      <div class="display-3">This is display 3</div>
      <div class="display-4">This is display 4</div>
    </div>



  </div>
)}

export default Styleguide
