import { EditOutlined } from "@ant-design/icons";
import StoryEditor from "./components/StoryEditor";

export default function Home() {
  return (
    <div className="flex min-h-screen items-start justify-center px-5 py-10 font-sans sm:py-14">
      <main className="w-full max-w-[740px]">
        <header className="mb-5 flex items-center gap-3 px-1">
          <div>
            <h1 className="text-[15px] font-semibold leading-tight tracking-tight text-zinc-800">
              Pocket
            </h1>
            <p className="text-[12px] leading-snug text-zinc-400">
              Sentences over 20 words will be highlighted &middot; 5,000 char
              limit
            </p>
          </div>
        </header>
        <StoryEditor />
      </main>
    </div>
  );
}
