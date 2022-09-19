import React from 'react';
import './ErrorPage.css';

export const ErrorPage = () => {
    return (
        <section className='error-page-container'>
            <div className='error-message-container'>
                <h1 className='error-number'>Error</h1>
                <p className='error-instructions'>Oops, something went wrong. Please go back or refresh the page.</p>
            </div>
        </section>
    )
}