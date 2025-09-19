import React from 'react';
import { AllowedItemName } from './types';

export const ALLOWED_ITEMS: AllowedItemName[] = ['Rice', 'Milk', 'Eggs', 'Oil', 'Bread'];

export const ITEM_ICONS: { [key in AllowedItemName]: React.ReactElement } = {
    Rice: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 6a2 2 0 114 0 2 2 0 01-4 0zM8 8a2 2 0 114 0 2 2 0 01-4 0zM5 12a2 2 0 114 0 2 2 0 01-4 0zM8 14a2 2 0 114 0 2 2 0 01-4 0zM11 6a2 2 0 114 0 2 2 0 01-4 0zM11 12a2 2 0 114 0 2 2 0 01-4 0z" />
            <path fillRule="evenodd" d="M19.707 6.293a1 1 0 00-1.414-1.414L15 8.172V7a1 1 0 00-2 0v3.828l-1.707-1.707a1 1 0 00-1.414 1.414L12.172 13H4a1 1 0 00-1 1v2a1 1 0 001 1h12a1 1 0 001-1v-2a1 1 0 00-.293-.707l2.293-2.293z" clipRule="evenodd" />
        </svg>
    ),
    Milk: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7 2a1 1 0 00-1 1v1H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H9V3a1 1 0 00-1-1H7zM5 8h10v8H5V8zm4-4V3a1 1 0 10-2 0v1h2z" clipRule="evenodd" />
        </svg>
    ),
    Eggs: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3.5c-2.76 0-5 2.24-5 5S7.24 13.5 10 13.5s5-2.24 5-5-2.24-5-5-5zM5.5 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM14.5 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
        </svg>
    ),
    Oil: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 5a3 3 0 013-3h4a3 3 0 013 3v1h-1a2 2 0 00-2-2H8a2 2 0 00-2 2H5V5z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M4 7a2 2 0 012-2h8a2 2 0 012 2v10a1 1 0 01-1 1H5a1 1 0 01-1-1V7zm3 3a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
    ),
    Bread: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M19.228 8.193a.75.75 0 00-.738-.523H1.51a.75.75 0 00-.738.523l-1.25 6.25A.75.75 0 00.26 15.5h19.48a.75.75 0 00.738-1.057l-1.25-6.25z" />
            <path d="M17.5 3A3.5 3.5 0 0014 6.5V7h-1.5a.5.5 0 000 1h-1a.5.5 0 000-1H10a.5.5 0 000 1H8.5a.5.5 0 000-1H7.5a.5.5 0 000 1h-1a.5.5 0 000-1H5a.5.5 0 000 1H3.5V6.5A3.5 3.5 0 000 3" />
        </svg>
    ),
};

export const ICONS = {
    dashboard: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    ),
    camera: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    chart: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    ),
    database: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7a8 8 0 018-4s8 1.79 8 4m-8 14v-4" />
        </svg>
    ),
    shoppingCart: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    ),
    upload: (
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
    ),
    magic: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    plus: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
    ),
    minus: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
        </svg>
    ),
    placeholder: (
        <svg className="w-12 h-12 mx-auto text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    celebrate: (
        <svg className="w-16 h-16 mx-auto text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    dataAnalysis: (
         <svg className="w-16 h-16 mx-auto text-indigo-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-12a2.25 2.25 0 01-2.25-2.25V3M3.75 21v-6.125A2.25 2.25 0 016 12.375h12a2.25 2.25 0 012.25 2.25V21M3.75 21h-1.5m1.5 0h16.5m0 0h1.5m-16.5 0a2.25 2.25 0 002.25-2.25h12a2.25 2.25 0 002.25 2.25" />
        </svg>
    )
};