'use client'

import { useState, createContext } from 'react';
import { Hero, Navbar, Products } from './components';
import { CartProvider } from './context/CartContext';

export default function Home() {

  return (
    <>
      <Navbar />
      <Hero />
      <Products />
    </>
  )
}
