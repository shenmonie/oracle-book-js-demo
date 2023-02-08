import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import { useState } from 'react';

export default function Home() {

    return (
        <>
            <div>
                Mint an avatar to address below:
            </div>
            <form action="api/avatar/mint" method="post">
                <label>address
                    <input type="text" name="address" dirname="ltr" defaultValue="0xf91D9DBf3D015fDba5EB612b69F994DfE46C765b" />
                </label>
                <input type="submit" />
            </form>

            <div>
                Get detail of an avatar:
            </div>
            <form action="api/avatar/get" method="get">
                <label>token
                    <input type="text" name="token" dirname="ltr" defaultValue="101" />
                </label>
                <input type="submit" />
            </form>
        </>
    )
}
