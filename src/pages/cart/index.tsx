import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import Components from "../../components"
import { useRecoilState } from "recoil"
import { totalCart } from "../../store"

const Cart = () => {
    const navigate                    = useNavigate()
    const [listCart, setListCart]     = useState<any>([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [, setTotalCart]            = useRecoilState(totalCart)

    const addTransaction = () => {
        const storageTransaction = localStorage.getItem("transaction")
        const cart               = localStorage.getItem("cart")

        if(storageTransaction !== null) {
            if(cart !== null) {
                let parseData = JSON.parse(storageTransaction)
                let trans:any = [
                    {
                        id    : new Date().getTime(),
                        name  : `Transaksi-${new Date().getTime()}`,
                        total : totalPrice,
                        product : JSON.parse(cart as any)
                    }
                ]

                localStorage.setItem("transaction", JSON.stringify([...parseData, ...trans]))
            }

        } else {
            if(cart !== null) {
                let trans:any = [
                    {
                        id    : new Date().getTime(),
                        name  : `Transaksi-${new Date().getTime()}`,
                        total : totalPrice,
                        product : JSON.parse(cart as any)
                    }
                ]
    
                localStorage.setItem("transaction", JSON.stringify(trans))
            }
        }

        localStorage.removeItem("cart")
        setListCart([])
        setTotalPrice(0)

        Swal.fire({
            icon : "success",
            title : "Berhasil !",
            text : "Berhasil membuat transaksi !",
            showCancelButton : false,
            confirmButtonColor : "#dc2626"
        }).then((result:any) => {
            if(result.isConfirmed) {
                navigate("/")
            }
        })
    }

    const plusCart = (data:any) => {
        const storage = localStorage.getItem("cart")
        if(storage === null) {
            let objectQty = {
                qty : 1
            }

            setListCart([{...data, ...objectQty}])
            countPrice([{...data, ...objectQty}])
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
                setListCart(parseData)
                countPrice(parseData)
                localStorage.setItem("cart", JSON.stringify(parseData))

            } else {
                let objectQty = {
                    qty : 1
                }

                let convertData = [{...data, ...objectQty}]
                let combine = [...convertData, ...parseData]

                setListCart(combine)
                countPrice(combine)
                localStorage.setItem("cart", JSON.stringify(combine))
            }
        }
    }

    const minusCart = (data:any) => {
        const storage = localStorage.getItem("cart")
        if(storage !== null) {

            const parseData = JSON.parse(storage)
            if(parseData.length > 0) {
                for(let i=0; i<parseData.length; i++) {
                    if(parseData[i].id === data.id) {
                        if(parseData[i].qty > 1) {
                            parseData[i].qty -= 1

                        } else {
                            parseData.splice(i, 1)
                        }
                        break;
                    }
                }
            }

            setListCart(parseData)
            countPrice(parseData)
            localStorage.setItem("cart", JSON.stringify(parseData))
        }
    }

    const countPrice = (data:any) => {

        let price = 0
        let totalProduct = 0

        if(data.length > 0) {
            for(let i=0; i<data.length; i++) {
                price += data[i].qty*(data[i].discountPrice > 0 ? data[i].discountPrice : data[i].price)
                totalProduct += data[i].qty
            }
        }

        setTotalPrice(price)
        setTotalCart(totalProduct)
    }

    useEffect(() => {
        const store = localStorage.getItem("cart")
        if(store !== null) {
            let parseData = JSON.parse(store)
            countPrice(parseData)
            setListCart(parseData)
        }
    }, [])

    return (
        <div className="flex p-4 items-start flex-col md:flex-row">
            <div className="flex flex-col w-full md:w-8/12">
                {
                    listCart.length > 0 ?
                        listCart.map((e:any, i:number) => {
                            return (
                                <Components.listCart
                                    e={e}
                                    i={i}
                                    Datalength={listCart.length-1}
                                    plusCart={plusCart}
                                    minusCart={minusCart}
                                    key={i}
                                />
                            )
                        })
                    :
                        <div className="flex justify-center flex-col my-5">
                            <div className="flex justify-center">
                                <span className="font-semibold text-2xl">Yah..</span>
                            </div>
                            <div className="flex justify-center">
                                <span className="text-xs">Data Keranjang Belanja Belum Ada.</span>
                            </div>
                        </div>
                }
            </div>

            <div className="flex w-full md:w-4/12 flex-col md:ml-4 ml-0 p-3 bg-white border border-gray-300 shadow-sm rounded-md sticky top-[80px]">
                <div className="flex">
                    <span className="font-medium text-md">Ringkasan Belanja</span>
                </div>
                <div className="flex w-full my-3 items-center">
                    <div className="flex w-full">
                        <span className="text-gray-600 text-xs">Total</span>
                    </div>
                    <div className="flex w-full justify-end">
                        <span className="text-red-700 font-semibold">Rp {totalPrice.toLocaleString("id-ID")}</span>
                    </div>
                </div>
                <div className="flex">
                    <button className="bg-red-600 rounded-lg w-full px-5 h-[40px] items-center justify-center" onClick={() => addTransaction()}>
                        <span className="text-xs text-white font-medium">
                            Beli
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart