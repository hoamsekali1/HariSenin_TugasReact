import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { totalCart } from "../../store"

const History = () => {
    const navigate = useNavigate()
    const [listTransaction, setListTransaction] = useState<any>([])
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
        const trans = localStorage.getItem("transaction")
        if(trans !== null) {
            const parseData = JSON.parse(trans)
            setListTransaction(parseData)
        }

        const store = localStorage.getItem("cart")
        if(store !== null) {
            let parseData = JSON.parse(store)
            countCart(parseData)
        }

    }, [])

    return (
        <div className="flex p-4 w-full flex-col">
            <div className="flex">
                <p className="font-semibold text-lg">Riwayat transaksi</p>
            </div>
            <div className="flex w-full mt-3 flex-col-reverse">
                {
                    listTransaction.length > 0 ?
                        listTransaction.map((e:any, i:number) => {
                            return (
                                <div className={`flex w-full items-center ${i !== (listTransaction.length-1) ? "border-b border-b-gray-100" : ""} py-2`} key={i}>
                                    <div className="flex flex-col md:flex-row w-full">
                                        <div className="flex w-full">
                                            <span className="font-medium text-xs">{e.name}</span>
                                        </div>
                                        <div className="flex w-full md:justify-center">
                                            <span className="text-xs font-semibold">Rp {e.total.toLocaleString("id-ID")}</span>
                                        </div>
                                    </div>
                                    <div className="flex w-full justify-end">
                                        <button className="bg-red-600 h-[30px] px-5 text-xs rounded-full text-white" onClick={() => navigate(`/history/${e.id}`)}>
                                            Detail
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    :
                        <div className="flex justify-center flex-col my-5">
                            <div className="flex justify-center">
                                <span className="font-semibold text-2xl">Yah..</span>
                            </div>
                            <div className="flex justify-center">
                                <span className="text-xs">Data Transaksi Belum Ada.</span>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default History