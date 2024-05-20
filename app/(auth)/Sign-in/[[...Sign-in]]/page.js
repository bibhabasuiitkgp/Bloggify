"use client"

import { SignIn } from '@clerk/clerk-react';
import React from 'react';

function Page() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <SignIn />
        </div>
    );
}

export default Page;
