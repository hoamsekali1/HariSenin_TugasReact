import { FC, ReactNode } from "react"
import { NavLink } from "react-router-dom"
import { useRecoilState } from "recoil"
import { totalCart } from "../store"

interface layoutInterface {
    children : ReactNode
}

const Layout:FC<layoutInterface> = ({ children }) => {
    const [cartTotal,] = useRecoilState(totalCart)

    return (
        <div className="flex w-full items-center h-full min-h-screen bg-gray-100 flex-col">
            <div className="flex w-full mx-5 bg-red-700 flex-col items-center sticky top-0">
                <div className="flex w-full h-[60px] items-center max-w-[1000px] px-4">
                    <div className="flex w-full">
                        <span className="font-medium text-white">Ecommerce</span>
                    </div>
                    <div className="flex w-full justify-end text-white">
                        <div className="flex mx-2">
                            <NavLink to="/" className={({ isActive }) =>
                                isActive ? "border-b-2 border-b-2-white text-xs py-1" : "text-xs py-1"
                            }>
                                Home
                            </NavLink>
                        </div>
                        <div className="flex mx-2">
                            <NavLink to="/cart" className={({ isActive }) =>
                                isActive ? "border-b-2 border-b-2-white text-xs py-1" : "text-xs py-1"
                            }>
                                Cart {cartTotal > 0 ? "("+cartTotal+")" : ""}
                            </NavLink>
                        </div>
                        <div className="flex mx-2">
                            <NavLink to="/history" className={({ isActive }) =>
                                isActive ? "border-b-2 border-b-2-white text-xs py-1" : "text-xs py-1"
                            }>
                                Riwayat
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full max-w-[1000px] h-full min-h-screen mx-5 bg-white flex-col">
                {children}
            </div>
            <div className="flex w-full mx-5 bg-red-700 flex-col items-center h-[50px] justify-center">
                <span className="text-white text-xs">Copyright &copy; 2024</span>
            </div>
        </div>
    )
}

export default Layout