import { ReactNode } from "react";
import { Shield } from "lucide-react";
import {Link} from "react-router-dom";


interface WebAuthLayoutProps {
    title: string;
    subtitle?: string;
    nepaliSubtitle?: string;
    children: ReactNode;
    footer?: ReactNode;
}

export function AuthLayout({ title, subtitle, nepaliSubtitle, children, footer }: WebAuthLayoutProps) {
    return (
        <div className="min-h-dvh flex bg-background">
            {/* Left: brand panel */}
            <aside className="hidden lg:flex lg:w-[45%] xl:w-[40%] flex-col justify-between p-12 bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground relative overflow-hidden">
                <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/5" />
                <div className="absolute -left-12 -bottom-20 w-80 h-80 rounded-full bg-white/5" />

                <Link to="/web" className="flex items-center gap-3 relative">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-lg font-bold tracking-tight">SurakSheet</p>
                        <p className="text-xs opacity-80">सुरकSheet</p>
                    </div>
                </Link>

                <div className="relative">
                    <h2 className="text-3xl xl:text-4xl font-bold leading-tight max-w-md">
                        Your documents, secure & always with you.
                    </h2>
                    <p className="text-sm opacity-80 mt-3 max-w-md">
                        तपाईंका कागजातहरू सधैं सुरक्षित, सधैं उपलब्ध। End-to-end encrypted vault for citizenship, license, passport and more.
                    </p>

                    <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
                        {[
                            { v: "256", l: "AES bit" },
                            { v: "10K+", l: "Users" },
                            { v: "99.9%", l: "Uptime" },
                        ].map((s) => (
                            <div key={s.l} className="rounded-2xl bg-white/10 backdrop-blur px-4 py-3">
                                <p className="text-xl font-bold">{s.v}</p>
                                <p className="text-[10px] opacity-80">{s.l}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-xs opacity-70 relative">© SurakSheet · Made for Nepal 🇳🇵</p>
            </aside>

            {/* Right: form panel */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 overflow-y-auto">
                <div className="w-full max-w-md">
                    <div className="lg:hidden flex items-center gap-2.5 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                            <Shield className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <p className="text-base font-bold tracking-tight text-foreground">SurakSheet</p>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{title}</h1>
                        {subtitle && <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>}
                        {nepaliSubtitle && <p className="text-xs text-muted-foreground mt-1">{nepaliSubtitle}</p>}
                    </div>

                    {children}

                    {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
                </div>
            </main>
        </div>
    );
}
