import Head from 'next/head';
import './styles.css';
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header>
        <div className="header__content">
          <h1><span className='span'>Bloggify: </span>Your platform to express,<br /> inspire, and connect. Share your stories,<br/> amplify your voice, and join a global community...</h1>
          <SignedOut>
            <div className='buttons'>
              <Link href="/Sign-up">
                <button class="btn-5">Signup</button>
              </Link>
              <Link href="/Sign-in">
                <button style={{ marginLeft: "10px", marginTop: "10px" }} class="btn-5">Signin</button>
              </Link>
            </div>
          </SignedOut>

          <SignedIn>
            <Link href="/home">
              <button class="btn-5">Blogs</button>
            </Link>
          </SignedIn>
        </div>
      </header >
    </div >
  );
}
