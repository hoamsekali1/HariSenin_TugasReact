import { useEffect, useState } from "react"
import Assets from "../../assets"
import { useRecoilState } from "recoil"
import { totalCart } from "../../store"

const listCategory = [
    {
        label : "Semua",
        value : "all"
    },
    {
        label : "Handphone",
        value : "hp"
    },
    {
        label : "Notebook",
        value : "noteBook"
    },
    {
        label : "Video Game",
        value : "videoGame"
    },
]

const listProduct = [
    {
        id : 1,
        image : Assets.HP1,
        name  : "Smartphone",
        desc  : "Temukan teknologi komunikasi terkini di ponsel pintar kami.",
        price : 13599000,
        discountPrice : 10997000,
        isFreeOngkir : true,
        category : "hp"
    },
    {
        id : 2,
        image : Assets.HP2,
        name  : "Smartphone",
        desc  : "HP tercanggih di kelasnya",
        price : 18599000,
        discountPrice : 14850000,
        isFreeOngkir : true,
        category : "hp"
    },
    {
        id : 3,
        image : Assets.HP3,
        name  : "Smartphone",
        desc  : "Temukan teknologi komunikasi terkini di ponsel pintar kami.",
        price : 11190000,
        discountPrice : 8597000,
        isFreeOngkir : true,
        category : "hp"
    },
    {
        id : 4,
        image : Assets.NB1,
        name  : "Notebook",
        desc  : "Tingkatkan produktivitas Anda dengan notebook kami.",
        price : 21599000,
        discountPrice : 18550000,
        isFreeOngkir : true,
        category : "noteBook"
    },
    {
        id : 5,
        image : Assets.NB2,
        name  : "Notebook",
        desc  : "Tingkatkan produktivitas Anda dengan notebook kami.",
        price : 14250000,
        discountPrice : 16299000,
        isFreeOngkir : true,
        category : "noteBook"
    },
    {
        id : 6,
        image : Assets.NB3,
        name  : "Notebook",
        desc  : "Tingkatkan produktivitas Anda dengan notebook kami.",
        price : 13250000,
        discountPrice : 11200000,
        isFreeOngkir : true,
        category : "noteBook"
    },
    {
        id : 7,
        image : Assets.VD1,
        name  : "Videogame",
        desc  : "Masuklah ke dalam dunia game dengan konsol kami.",
        price : 6299000,
        discountPrice : 4400000,
        isFreeOngkir : true,
        category : "videoGame"
    },
    {
        id : 8,
        image : Assets.VD2,
        name  : "Videogame",
        desc  : "Masuklah ke dalam dunia game dengan konsol kami.",
        price : 9299000,
        discountPrice : 7500000,
        isFreeOngkir : true,
        category : "videoGame"
    }
]

const Home = () => {
    const [activeCategory, setActiveCategory] = useState("all")
    const [dataProduct, setDataProduct]       = useState(listProduct)
    const [, setTotalCart]                    = useRecoilState(totalCart)

    const changeProductCategory = (category:string) => {
        setActiveCategory(category)

        if(category === "all") {
            setDataProduct(listProduct as any)

        } else {
            let dataFilter = []

            for(let i=0; i<listProduct.length; i++) {
                if(category === listProduct[i].category) {
                    dataFilter.push(listProduct[i])
                }
            }

            setDataProduct(dataFilter as any)
        }
    }

    const addCart = (data:any) => {
        const storage = localStorage.getItem("cart")
        if(storage === null) {
            let objectQty = {
                qty : 1
            }

            countCart([{...data, ...objectQty}])
            localStorage.setItem("cart", JSON.stringify([{...data, ...objectQty}]))

        } else {

            let notFoundData= false
            const parseData = JSON.parse(storage)
            if(parseData.length > 0) {
                for(let i=0; i<parseData.length; i++) {
                    if(parseData[i].id === data.id) {
                        parseData[i].qty += 1

                        notFoundData = true
                        break;
                    }
                }
            }

            if(notFoundData) {
                countCart(parseData)
                localStorage.setItem("cart", JSON.stringify(parseData))

            } else {
                let objectQty = {
                    qty : 1
                }

                let convertData = [{...data, ...objectQty}]
                let combine = [...convertData, ...parseData]
                countCart(combine)
                localStorage.setItem("cart", JSON.stringify(combine))
            }
        }
    }

    const countCart = (data:any) => {

        let totalProduct = 0
        if(data.length > 0) {
            for(let i=0; i<data.length; i++) {
                totalProduct += data[i].qty
            }
        }

        setTotalCart(totalProduct)
    }

    useEffect(() => {
        
        const store = localStorage.getItem("cart")
        if(store !== null) {
            let parseData = JSON.parse(store)
            countCart(parseData)
        }

    }, [])
    

    return (
        <div className="flex w-full flex-col p-4">
            <div className="flex my-2">
                {
                    listCategory.map((e, i) => {
                        return (
                            <button 
                                key={i} 
                                className={`flex bg-white rounded-full h-[30px] px-5 border border-red-500 items-center mr-2 ${activeCategory === e.value ? "bg-red-300/50" : ""}`}
                                onClick={() => changeProductCategory(e.value)}
                            >
                                <span className="text-red-600 font-medium text-xs">{e.label}</span>
                            </button>
                        )
                    })
                }
            </div>
            <div className="flex w-full flex-wrap">
                {
                    dataProduct.map((e, i) => {
                        // e.category === activeCategory 
                        return (
                            <div className="flex w-6/12 md:w-4/12 p-2" key={i}>
                                <div className="flex w-full border border-gray-300 rounded-md p-3 flex-col">
                                    <div className="flex py-2 justify-center">
                                        <img src={e.image} alt="produk" className="h-[120px]"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex">
                                            <p className="text-lg font-medium">{e.name}</p>
                                        </div>
                                        <div className="flex my-1">
                                            <p className="text-xs">{e.desc}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="font-medium text-md">Rp. {e.discountPrice > 0 ? e.discountPrice.toLocaleString("id-ID") : e.price.toLocaleString("id-ID")}</p>

                                            {
                                                e.discountPrice > 0 &&
                                                <p className="font-medium text-xs text-gray-400 line-through">Rp. {e.price.toLocaleString("id-ID")}</p>
                                            }
                                        </div>
                                        <div className="flex py-2 justify-center flex-col md:flex-row">
                                            {
                                                e.isFreeOngkir &&
                                                <div className="flex px-4 bg-red-300/50 h-[30px] rounded-full items-center mx-1 justify-center">
                                                    <span className="text-xs text-red-600">Gratis Ongkir</span>
                                                </div>
                                            }

                                            <button className="flex px-4 mt-2 md:mt-0 bg-red-600/80 h-[30px] rounded-full items-center mx-1 justify-center" onClick={() => addCart(e)}>
                                                <span className="text-xs text-white">+ keranjang</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home