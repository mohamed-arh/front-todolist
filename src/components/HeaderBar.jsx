import { Layout, Button } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import {useQuery} from "@tanstack/react-query";
import {getUserById} from "@/services/usersApi.js";
import Link from "next/link";

const { Header } = Layout;

export default function HeaderBar() {
    const router = useRouter();
    const {data: user} = useQuery({
        queryKey: ["user"],
        queryFn: () => getUserById(),
    });

    const handleLogout = () => {
        localStorage.removeItem('token'); // Supprime le token
        router.push('/login'); // Redirige vers la page de connexion
    };

    return (
        <div className=" flex justify-between items-center m-2">
            <div className="flex ">
                <img src="/title2.png" alt="Logo" className=" h-12 " />

            </div>
            <div className="flex">
                <Link href="/profile" className="flex items-center">
                    <img src="/ico3.png" alt="User Icon" className="mr-2 h-8 w-8" />
                    <span className="text-xl font-semibold mr-4">
                {user?.data?.first_name} {user?.data?.last_name}
                     </span>
                </Link>
                <Button
                    icon={<LogoutOutlined />}
                    type="text"
                    onClick={handleLogout}
                    shape="circle"
                    className=" bg-gray-200 hover:bg-gray-300"
                />
        </div>
        </div>
    );
}