import Head from 'next/head';
import './styles.css';
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header>
        <nav className="header__navegation">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Help</a></li>
          </ul>
        </nav>
        <div className="header__content">
          <h1>Books are the mirrors of the soul,<br /> reflecting worlds beyond <br /> imaginationand whispers of <br /> timeless wisdom.</h1>
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
            <Link href="/dashboard">
              <button class="btn-5">Dashboard</button>
            </Link>
          </SignedIn>
        </div>
      </header >
    </div >
  );
}
