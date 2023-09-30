import CustomImage from "./CustomImage.js"

export default function Hero(){
    const images=[
        "/img/gallery/img_1.jpg",
        "/img/gallery/img_2.jpg",
        "/img/gallery/img_3.jpg",
        "/img/gallery/img_4.jpg",
        "/img/gallery/img_5.jpg",
        "/img/gallery/img_6.jpg",
        "/img/gallery/img_7.jpg",
        "/img/gallery/img_8.jpg",
        "/img/gallery/img_9.jpg"
    ]

    return(
        <div className="section hero">
            <div className="col typography">
                <h1 className="title">What are we about</h1>
                <p className="info">GourmetFit is youre one-stop destination to practice healthy easting habits and maintaining perfect exercising habits.</p>
                <button className="btn">explore now</button>
            </div>
            <div className="col gallery">
                {images.map((src,index)=>(
                    <CustomImage key={index} imgSrc={src} pt={"90%"}/>
                ))}
                
            </div>
        </div>
    )
}