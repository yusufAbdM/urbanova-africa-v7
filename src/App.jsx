import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Layout from './components/Layout';
const Home = lazy(() => import('./pages/Home'));
const Energy = lazy(() => import('./pages/Energy'));
const Traffic = lazy(() => import('./pages/Traffic'));
const Environment = lazy(() => import('./pages/Environment'));
const About = lazy(() => import('./pages/About'));
const Sources = lazy(() => import('./pages/Sources'));
const Impact = lazy(() => import('./pages/Impact'));
function ScrollToTop(){const {pathname}=useLocation();useEffect(()=>{window.scrollTo({top:0,behavior:'auto'});},[pathname]);return null}
export default function App(){return <><ScrollToTop/><Suspense fallback={<div className="container route-loading" role="status">Loading Urbanova Africa…</div>}><Routes><Route element={<Layout/>}><Route path="/" element={<Home/>}/><Route path="/energy" element={<Energy/>}/><Route path="/traffic" element={<Traffic/>}/><Route path="/environment" element={<Environment/>}/><Route path="/about" element={<About/>}/><Route path="/sources" element={<Sources/>}/><Route path="/impact" element={<Impact/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes></Suspense></>}
