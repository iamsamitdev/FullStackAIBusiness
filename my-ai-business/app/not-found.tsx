import Image from "next/image"
import notFoundImg from "../public/404-not-found.jpg"

export default function Notfound() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Image 
                src={notFoundImg}
                width={400} 
                style={{height: 'auto'}}
                alt="404 Not Found Image"
            />
            <h1 className="text-4xl text-red-500">
                ไม่พบหน้าที่คุณค้นหา
            </h1>
        </div>
    )
}