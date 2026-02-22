export default async function User({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // อ่านค่าพารามิเตอร์ id จาก URL
  const { id } = await params;
  const thaiId = decodeURIComponent(id)
  // หากต้องการเป็นตัวเลขต้องแปลง id ที่รับมา
  // const numericId = Number(id);

  // อ่าน query string parameter ชื่อ page
  const { page } = await searchParams
  const { cat } = await searchParams
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-4xl text-purple-500 animate-bounce">
        User: {thaiId} - Page: {page} - Category: {cat}
     </h1>
    </div>
  )
}
