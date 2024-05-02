import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Components from "../../../components"
import { useRecoilState } from "recoil"
import { totalCart } from "../../../store"

const HistoryDetail = () => {
    const { id } = useParams()
    const [listProduct, setListProduct] = useState<any>({})
    const [, setTotalCart] = useRecoilState(totalCart)


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
        const storeData = localStorage.getItem("transaction")
        if(storeData !== null) {
            const parseData = JSON.parse(storeData)
            if(parseData.length > 0) {
                for(let i=0; i<parseData.length; i++) {
                    if(parseData[i].id === parseInt(id as string)) {
                        setListProduct(parseData[i])
                        break;
                    }
                }
            }
        }

        const store = localStorage.getItem("cart")
        if(store !== null) {
            let parseData = JSON.parse(store)
            countCart(parseData)
        }        
    }, [])

    return (
        <div className="flex p-4 flex-col">
            <div className="flex">
                <p className="font-semibold text-lg">Detail transaksi</p>
            </div>

            {
                Object.keys(listProduct).length > 0 &&
                <div className="flex mt-3 flex-col">
                    <div className="flex flex-col">
                        <div className="flex">
                            <span className="text-md">{listProduct.name}</span>
                        </div>
                        <div className="flex font-semibold text-xl">
                            Rp {listProduct.total.toLocaleString("id-ID")}
                        </div>
                    </div>
                    <div className="flex mt-3 flex-col">
                        {
                            listProduct.product.length > 0 &&
                            listProduct.product.map((e:any, i:number) => {
                                return (
                                    <Components.listCart
                                        key={i}
                                        e={e}
                                        i={i}
                                        showAction={false}
                                        Datalength={listProduct.product.length-1}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default HistoryDetail