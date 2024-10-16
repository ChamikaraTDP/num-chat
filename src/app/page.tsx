import Link from "next/link";
import PageSelector from "../components/PageSelector";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
        <div className="flex items-center  mb-10">
            <h1 className="text-xl font-bold">Page Selector</h1>

            <Link className="hover:text-blue-500 ml-5" href="/num-chat">
              Go to Chat
            </Link>
        </div>

        <PageSelector />
    </main>
  );
}
