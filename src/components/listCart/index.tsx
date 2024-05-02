import { FC } from "react"

interface listCartInterface {
    e:any,
    plusCart? : (e:any) => void,
    minusCart? : (e:any) => void,
    i : number,
    Datalength : number,
    showAction? : boolean
}

const listCart:FC<listCartInterface> = ({ e, plusCart, minusCart, i, Datalength, showAction=true}) => {
    return (
        <div className={`flex ${i !== (Datalength) ? "border-b border-b-gray-300" : ""} py-2 my-2 items-center`}>
            <div className="flex w-3/12 justify-center">
                <img src={e.image} alt="gam" className="h-[100px]"/>
            </div>
            <div className="flex w-6/12 flex-col px-2">
                <div className="flex">
                    <span className="font-medium text-md">{e.name}</span>
                </div>
                <div className="flex my-1">
                    <span className="text-xs">{e.desc}</span>
                </div>
                <div className="flex flex-col">
                    <p className="font-medium text-md">Rp. {e.discountPrice > 0 ? e.discountPrice.toLocaleString("id-ID") : e.price.toLocaleString("id-ID")}</p>

                    {
                        e.discountPrice > 0 &&
                        <p className="font-medium text-xs text-gray-400 line-through">Rp. {e.price.toLocaleString("id-ID")}</p>
                    }
                </div>
            </div>
            <div className="flex w-3/12 items-center">
                {
                    showAction &&
                    <div className="flex w-4/12">
                        <button onClick={() => plusCart && plusCart(e)} className="bg-red-600 rounded-md h-[30px] w-[30px] text-white items-center justify-center">
                            +
                        </button>
                    </div>
                }

                <div className="flex justify-center w-4/12">
                    <span className={`font-medium text-red-600 ${showAction ? "text-xs" : "text-lg"}`}>{e.qty}</span>
                </div>

                {
                    showAction &&
                    <div className="flex w-4/12 justify-end">
                        <button onClick={() => minusCart && minusCart(e)} className="bg-red-600 rounded-md h-[30px] w-[30px] text-white items-center justify-center">
                            -
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default listCart