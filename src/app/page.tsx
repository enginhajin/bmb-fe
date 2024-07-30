import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex size-full h-screen items-center justify-center">
      <div>
        <Image
          src="/img/logo/logo-bmb-primary.png"
          width={80}
          height={130}
          alt="bmb"
        />
        <h3 className="mt-4 text-center font-semibold">bmb ing...</h3>
      </div>
    </div>
  )
}
