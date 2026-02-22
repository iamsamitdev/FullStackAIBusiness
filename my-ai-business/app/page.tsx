export default function Home() {
  // ด้านล่างนี้เป็นการคืนค่า JSX สำหรับหน้าแรก
  return (
    <div className="flex justify-center items-center h-screen">
      {/* ด้านล่างนี้เป็นการแสดงข้อความ */}
      <h1 className="text-9xl text-green-500 animate-bounce">Hello Next.js</h1>
    </div>
  );
}
