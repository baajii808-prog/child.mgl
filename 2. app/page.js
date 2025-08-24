import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Хүүхэд хамгааллын зөвлөх AI сайт</h1>
      <p className="mt-2 text-gray-600">
        Энэ сайт нь нийгмийн ажилтанд хүүхэд хамгааллын чиглэлээр зөвлөгөө өгнө.
      </p>

      <div className="mt-6 space-x-4">
        <Link href="/chatbot" className="bg-blue-500 text-white px-4 py-2 rounded">Чатбот</Link>
        <Link href="/knowledge" className="bg-green-500 text-white px-4 py-2 rounded">Мэдлэгийн сан</Link>
      </div>
    </div>
  );
}
