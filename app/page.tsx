export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F2EB] text-[#1F1F1F]">
      <section className="flex min-h-screen flex-col items-center justify-center px-8 text-center">

        <div className="mb-8 h-24 w-24 rounded-full border-2 border-[#B08D57] flex items-center justify-center">
          <span className="text-4xl font-serif text-[#B08D57]">
            LV
          </span>
        </div>

        <h1 className="text-6xl font-serif">
          Piano Atlas
        </h1>

        <h2 className="text-3xl text-[#8C7355] mt-2">
          for my soul
        </h2>

        <p className="mt-10 max-w-xl text-lg text-gray-600">
          Explore composers. Understand masterpieces.
          Build your own musical journey.
        </p>

        <button
          className="mt-12 rounded-full bg-[#B08D57] px-8 py-4 text-white transition hover:scale-105"
        >
          Open Atlas
        </button>

      </section>
    </main>
  );
}