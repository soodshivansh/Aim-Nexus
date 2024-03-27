import NavigationBar from "@/components/NavigationBar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-28 p-8 bg-[#101010] text-white">
      <div>
        <NavigationBar />
      </div>
      <div className="flex flex-col items-center space-y-8">
        <h1 className="max-w-3xl mx-auto text-6xl font-semibold text-center space-y-8" style={{lineHeight: "80px"}}>Your Destination for Inspiring Visual Creativity</h1>
        <p className="text-xl">Discover, Share, Collaborate, and Elevate Your Creative Journey</p>
        <Link href="/login"><button className="rounded-full px-20 py-4 bg-[#1A67DC]">Get Started</button></Link>
      </div>

      <div>
        <img src="/assets/image.png" className="w-full h-full object-cover" alt="heroimage" />
      </div>

      <footer className="flex justify-between py-10">
      <span>Created with Nextjs</span>
      <div className='flex space-x-4 items-center max-h-10'>
          <img className='w-10 filter brightness-0 invert' src='/assets/logo.svg' alt='logo' />
          <span className='font-semibold'>Dribble</span>
      </div>
      </footer>
    </main>
  );
}
