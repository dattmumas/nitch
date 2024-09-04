import { Authentication } from "@/components/auth_shad"
import { MainNav } from "@/components/main_nav"

export default function AuthPage() {
    return (
        <div>
            <MainNav />
            <Authentication />
        </div>
    )
}